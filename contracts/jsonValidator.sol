// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
 
contract RegisterJson {
  string private jsonString;

  constructor(string memory _jsonString){
    jsonString = _jsonString;
  }
   
  function getJson() public view returns (string memory) {
      return jsonString;
  }
 
  function setJson(string memory _jsonString) public {
      jsonString = _jsonString;
  }

  function compareJson(string memory _jsonString) public view returns (bool){
    return keccak256(abi.encodePacked((jsonString))) == keccak256(abi.encodePacked((_jsonString)));
  }
}