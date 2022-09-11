// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Offer {
    uint public expiryDate;
    address payable public owner;
    address payable public buyer;
    uint public value;
    uint public id;
    uint256 private signer = 0x02c7fc180adb0c3e8f92b3b95163615e62753a42948e4951617b22e235dfbbf831c7ee910179d64316688d65d346b4f10cf2617bae6ea1aa870b679e1e96e05f;

    event Withdrawal(uint amount, uint when);

    constructor(uint _value) payable {
      // seller pays ETH to the contract and requests a value in R$

        value = _value;

        expiryDate = block.timestamp + 3600;

        owner = payable(msg.sender);
    }


    function VerifyMessage(bytes32 _hashedMessage, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
        bytes memory prefix = "\x19" + id + "\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMessage));
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        return signer;
    }

    function cancel() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        //console.log("Unlock time is %o and block hash is %o", expiryDate, block.hash);

        require(block.timestamp >= expiryDate && msg.sender == owner, "You can't cancel yet");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
    function claim(uint256 signature) public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        //console.log("Unlock time is %o and block hash is %o", expiryDate, block.hash);

        require(block.timestamp < expiryDate && msg.sender == buyer, "You aren't the buyer");

        require(  )

        emit Withdrawal(address(this).balance, block.timestamp);

        buyer.transfer(address(this).balance);
    }

    function accept() public {
      buyer = msg.sender;
      id = block.hash;
    }
}
