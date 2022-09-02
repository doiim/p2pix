import { ethers } from "ethers";
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', {
  state: () => {
    return { 
      account: '',
      network: 0,
      error: ''
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async connectAccount() {
      if (typeof window.ethereum == 'undefined') {
        this.error = "Metamask not found!"
        return
      }

      // Add/Switch to testnet
      const networkData = [
        {
          chainId: "0x7a69",
          chainName: "Local Testnet",
          rpcUrls: ["http://127.0.0.1:8545/"],
          nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
          },
        },
      ];

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: networkData,
      });
      
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params:[{chainId: '0x7a69'}]});
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // MetaMask requires requesting permission to connect users accounts
      const accounts = await provider.send("eth_requestAccounts", []);
      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      this.signer = provider.getSigner()
      this.account = accounts[0]
      return
    },
    disconnectAccount() {
      this.account=''
      this.network=0
      signer= undefined
      provider= undefined
      error= ''
    },
  },
})