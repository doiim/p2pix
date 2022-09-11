# Example code of python smart contract running on Cartesi Rollups for peer-to-peer exchange of tokens for fiat currency.
# A trusted public key is needed to attest the success of the fiat transfer.

# This demonstrations uses hardcoded values for the token receiver (fiat payer), trusted pubkey, token address and amount.
# A future release will let potential sellers of tokens create separate offers in which the abova parameters can very.
# It should be straightforward to allow different formats and cryptography algorithms for the valid signed proofs of fiat transfers.

from os import environ
import traceback
import logging
import requests
import json

import base64
import ecdsa

from eth_abi import decode_abi, encode_abi

logging.basicConfig(level="INFO")
logger = logging.getLogger(__name__)

rollup_server = environ["ROLLUP_HTTP_SERVER_URL"]
logger.info(f"HTTP rollup_server url is {rollup_server}")

# Default header for ERC-20 transfers coming from the Portal, which corresponds
# to the Keccak256-encoded string "ERC20_Transfer", as defined at
# https://github.com/cartesi/rollups/blob/main/onchain/rollups/contracts/facets/ERC20PortalFacet.sol.
ERC20_TRANSFER_HEADER =  b'Y\xda*\x98N\x16Z\xe4H|\x99\xe5\xd1\xdc\xa7\xe0L\x8a\x990\x1b\xe6\xbc\t)2\xcb]\x7f\x03Cx'
# Function selector to be called during the execution of a voucher that transfers funds,
# which corresponds to the first 4 bytes of the Keccak256-encoded result of "transfer(address,uint256)"
TRANSFER_FUNCTION_SELECTOR = b'\xa9\x05\x9c\xbb'

PUBKEY_PEM = '-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE55/U4WPfQjltCrco5ndvJb6iZdkCvmM/\nAcIcn1i9j6EGN6Y5FLqo/TnNei5YoUxlxVgxBSF8aSS1tPJ/HRL18g==\n-----END PUBLIC KEY-----'
VERIFYING_KEY = ecdsa.VerifyingKey.from_pem(PUBKEY_PEM)

DEPOSITOR = "0xef364e390fF3f326e3153d0B9c4B944dB42155e5"
TOKEN_ADDRESS = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788"
AMOUNT = 100*10**18

def hex2str(hex):
    """
    Decodes a hex string into a regular string
    """
    return bytes.fromhex(hex[2:]).decode("utf-8")

def str2hex(str):
    """
    Encodes a string as a hex string
    """
    return "0x" + str.encode("utf-8").hex()

def reject_input(msg, payload):
    logger.error(msg)
    response = requests.post(rollup_server + "/report", json={"payload": payload})
    logger.info(f"Received report status {response.status_code} body {response.content}")
    return "reject"

def handle_json(data):
    # Transformar data de bytes pra string
    logger.info(data['payload'])
    payload = hex2str(data['payload'])

    logger.info(payload)
    json_raw = hex2str(payload)

    logger.info(json_raw)
    json_data = json.loads(json_raw)

    message = json_data['message']
    signature = json_data['signature']

    message_json = json.loads(message)
    amount = message_json['amount']

    logger.info("message:" + message)
    logger.info("signature:" + signature)
    logger.info("amount:" + str(amount))

    result = VERIFYING_KEY.verify(base64.b64decode(signature), message.encode())

    if (result):
        if (amount == AMOUNT):
            # Encode a transfer function call that returns the amount back to the depositor
            transfer_payload = TRANSFER_FUNCTION_SELECTOR + encode_abi(['address','uint256'], [DEPOSITOR, amount])
            
            # Post voucher executing the transfer on the ERC-20 contract: "I don't want your money"!
            voucher = {"address": TOKEN_ADDRESS, "payload": "0x" + transfer_payload.hex()}
            logger.info(f"Issuing voucher {voucher}")
            response = requests.post(rollup_server + "/voucher", json=voucher)
            logger.info(f"Received voucher status {response.status_code} body {response.content}")
            return "accept"
        else:
            return reject_input(f"Amount error", data["payload"])
    else:
        return reject_input(f"Signature error", data["payload"])

def handle_advance(data):
    logger.info(f"Received advance request data {data}")

    try:
        # Check wether an input was sent by the Portal,
        # which is where all deposits must come from
        if data["metadata"]["msg_sender"].lower() != "0xF119CC4Ed90379e5E0CC2e5Dd1c8F8750BAfC812".lower(): #rollup_address:
            return handle_json(data)

        # Attempt to decode input as an ABI-encoded ERC20 deposit
        binary = bytes.fromhex(data["payload"][2:])
        try:
            decoded = decode_abi(['bytes32', 'address', 'address', 'uint256', 'bytes'], binary)
        except Exception as e:
            msg = "Payload does not conform to ERC20 deposit ABI"
            logger.error(f"{msg}\n{traceback.format_exc()}")
            return reject_input(msg, data["payload"])

        # Check if the header matches the Keccak256-encoded string "ERC20_Transfer"
        input_header = decoded[0]
        if input_header != ERC20_TRANSFER_HEADER:
            return reject_input(f"Input header is not from an ERC20 transfer", data["payload"])

        # Post notice about the deposit
        depositor = decoded[1]
        erc20 = decoded[2]
        amount = decoded[3]
        notice_str = f"Deposit received from: {depositor}; ERC-20: {erc20}; Amount: {amount}"
        logger.info(f"Adding notice: {notice_str}")
        notice = {"payload": str2hex(notice_str)}
        response = requests.post(rollup_server + "/notice", json=notice)
        logger.info(f"Received notice status {response.status_code} body {response.content}")

        return "accept"

    except Exception as e:
        return reject_input(f"Error processing data {data}\n{traceback.format_exc()}")

def handle_inspect(data):
    logger.info(f"Received inspect request data {data}")
    logger.info("Adding report")
    response = requests.post(rollup_server + "/report", json={"payload": data["payload"]})
    logger.info(f"Received report status {response.status_code}")
    return "accept"

handlers = {
    "advance_state": handle_advance,
    "inspect_state": handle_inspect,
}

finish = {"status": "accept"}
rollup_address = None

while True:
    logger.info("Sending finish")
    response = requests.post(rollup_server + "/finish", json=finish)
    logger.info(f"Received finish status {response.status_code}")
    if response.status_code == 202:
        logger.info("No pending rollup request, trying again")
    else:
        rollup_request = response.json()
        data = rollup_request["data"]
        if "metadata" in data:
            metadata = data["metadata"]
            if metadata["epoch_index"] == 0 and metadata["input_index"] == 0:
                rollup_address = metadata["msg_sender"]
                logger.info(f"Captured rollup address: {rollup_address}")
                continue
        handler = handlers[rollup_request["request_type"]]
        finish["status"] = handler(rollup_request["data"])

