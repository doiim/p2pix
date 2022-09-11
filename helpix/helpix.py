from flask import Flask
from gerencianet import Gerencianet
from web3.auto import w3
from eth_account.messages import encode_defunct
import credentials

app = Flask(__name__)

gn = Gerencianet(credentials.credentials)

@app.route('/api/create/<transaction_id>/<valor>')
def crate_pix(transaction_id=0,valor=0):
  params = {
      "txid": transaction_id
  }
  body = {
      'calendario': {
          'expiracao': 3600
      },
      'valor': {
          'original': valor
      },
    "chave": credentials.chave,
    "solicitacaoPagador": "Cobrança p2pix."
  }
  response = gn.pix_create_charge(params=params,body=body)
  return response

@app.route('/api/checkpaid/<transaction_id>')
def check_paid(transaction_id=0):
    response = gn.pix_detail_charge(params={"txid": transaction_id})
    if ( response["status"] == "CONCLUIDA"):

        from eth_abi.packed import encode_packed
        from Crypto.Hash import keccak

        k = keccak.new(digest_bits=256)
        k.update(encode_packed(['string'],[transaction_id]))
        print('HASHED MESSAGE: ', k.hexdigest())

        message = encode_defunct(text=k.hexdigest())
        ret = (w3.eth.account.sign_message(message, private_key=credentials.private_key)).signature.hex()
        print (ret)
        return ret
    else:
        return ("Ainda nao pago.")

@app.route('/api/qr/<transaction_id>')
def qr_code(transaction_id=0):
    detail = gn.pix_detail_charge(params={"txid": transaction_id})
    loc = detail["loc"]["id"]
    response =  gn.pix_generate_QRCode(params={"id": loc})
    return response['imagemQrcode']

if __name__ == '__main__':
    app.run()
