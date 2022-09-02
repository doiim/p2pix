require("@nomiclabs/hardhat-waffle");
//const fs = require('fs');

// const apiGoerli = fs.readFileSync(".api.goerli").toString().trim();

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      blockGasLimit: 30000000,
    },
    // goerli: {
    //   url: apiGoerli,
    //   accounts: {
    //     mnemonic: seedGoerli,
    //     count: 1
    //   }
    // }
  }
};
