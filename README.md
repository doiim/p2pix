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
## References

[doiim website](www.doiim.com)

[Vite Docs](https://vitejs.dev/guide/)

[Hardhat Docs](https://hardhat.org/docs)

[Tailwind Docs](https://v2.tailwindcss.com/docs)

[Pinia Docs](https://pinia.vuejs.org/getting-started.html)