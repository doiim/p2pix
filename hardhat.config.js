require("@nomiclabs/hardhat-waffle");
//const fs = require('fs');

// const apiGoerli = fs.readFileSync(".api.goerli").toString().trim();

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      blockGasLimit: 30000000,
    },
    mumbai:{
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: {
        mnemonic: 'Thick Tarantulas Treated Everlasting Urchins Violently Unless Ants Unhooked Pretentious Unitards Creatively',
        count: 1
      }
    }
    // goerli: {
    //   url: apiGoerli,
    //   accounts: {
    //     mnemonic: seedGoerli,
    //     count: 1
    //   }
    // }
  }
};
