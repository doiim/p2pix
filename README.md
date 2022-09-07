# Web3 Project Boilerplate - doiim

![Web3 Boilerplate Image](https://user-images.githubusercontent.com/13040410/188042648-ac24c32c-1842-4b9b-9715-1713f448625e.png)

A boilerplate for Web3 project to be used on Hackatons and start projects from scratch. It uses Vue3, Tailwind and Hardhat.

The boilerplate is a simple interface with a connection widget that connects Metamask and a button to increment a vriable on a smart-contract.

## Installation

To install and compile smart contracts:
```
npm install
npx hardhat compile
```
Then run a local node in a separated terminal
```
npx hardhat node
```
And at last, deploy contract to local node and run the server
```
npx hardhat run --network localhost scripts/1-deploy-counter.js
npm run dev
```

## Running the first test

For this implementation we made a simple integration with Metamask. So, before click Connect Wallet it is important to have it configured with at least one key provided by the hardhat node. Use the [Import Wallet](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-account) feature of Metamask to load one of the following private-keys:

<span style="color:red"> 🔴 BE AWARE THAT THESE KEYS ARE PUBLIC. DO NOT USE THEM FOR PERSONAL PURPOSES OR ON PUBLIC NETWORKS. YOU COULD LOSE ALL YOUR FUNDS.</span>
```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

Once finished importing one of the accounts above you can connect them to the app. You will be prompted to switch to Localhost network (In case you aren't already). Just accept it.

In case you drop the node and start it again, it should be required to [reset the nonce of your account](https://metamask.zendesk.com/hc/en-us/articles/360015488891-How-to-reset-an-account). Do this in case you see the wrong nonce error on your browser console.  

## References

[doiim website](www.doiim.com)

[Vite Docs](https://vitejs.dev/guide/)

[Hardhat Docs](https://hardhat.org/docs)

[Tailwind Docs](https://v2.tailwindcss.com/docs)

[Pinia Docs](https://pinia.vuejs.org/getting-started.html)