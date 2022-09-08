import { ethers } from 'ethers'

export default {
  install: (app, option) => {
    let provider, signer, account

    const connect = async () => {
      try {
        if (typeof window.ethereum == 'undefined') {
          return { error: 'Metamask not found!' }
        }

        // Add/Switch to testnet
        const networkData = [
          {
            chainId: '0x7a69',
            chainName: 'Local Testnet',
            rpcUrls: ['http://127.0.0.1:8545/'],
            nativeCurrency: {
              name: 'Ethereum',
              symbol: 'ETH',
              decimals: 18,
            },
          },
        ]

        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: networkData,
        })

        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x7a69' }],
        })
        // A Web3Provider wraps a standard Web3 provider, which is
        // what MetaMask injects as window.ethereum into each page
        provider = new ethers.providers.Web3Provider(window.ethereum)
        // MetaMask requires requesting permission to connect users accounts
        const accounts = await provider.send('eth_requestAccounts', [])
        // The MetaMask plugin also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        signer = provider.getSigner()
        account = accounts[0]
        return {
          provider,
          signer,
          account,
        }
      } catch (err) {
        return { error: 'Error connecting wallet!' }
      }
    }

    const disconnect = async () => {
      provider = undefined
      signer = undefined
      account = undefined
      return
    }

    const getWalletProvider = () => provider
    const getWalletSigner = () => signer
    const getWalletAccount = () => account

    app.provide('connectWallet', connect)
    app.provide('disconnectWallet', disconnect)
    app.provide('getWalletProvider', getWalletProvider)
    app.provide('getWalletSigner', getWalletSigner)
    app.provide('getWalletAccount', getWalletAccount)
  },
}
