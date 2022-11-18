![readme header]]
![p2pix_home busca ativada](https://user-images.githubusercontent.com/71399144/202616285-e9b2715f-90af-4c54-abea-5a22275057c1.png)


## A trustless p2p solution for exchanging FIAT to ERC20 tokens.

### In short.

The roadmap ideally would be accomplished through improvements to the PIX API, the smart contract receive and releases its funds based on a transaction proof that is generated every time a PIX payment's transaction receipt is validated.


For example, in case you want to sell **100 USDC** for the price of 500 BRL, you create an order that **locks it into the contract**. once the user buying the USDC accepts the order it  **saves the buyer address** into the contract and generates a transaction qrCode with the specified value (500 BRL) to the PIX key detailed on the smart contract. Then it allows the necessary transaction to be confirmed and finally send the **Id proof** to the smart contract which in return **releases the fund to the specified buyer address**.


## How it works?
![p2pix arquitetura   pitch Bacen   24_out](https://user-images.githubusercontent.com/71399144/202616981-9f4293ce-bead-4d29-87a2-6cc315feab98.jpg)
![p2pix_explorer](https://user-images.githubusercontent.com/71399144/202617017-3d04fa8e-f241-4a53-a2af-1b1b04a48424.png)


## Why this solution?

LocalBitcoins used to be, and currently still is in certain places such as in Venezuela, one of the main crypto providers where a substantial amount of volume flows through the parallel economy and revitalizes gross output during downturns.


If there is a lack of crypto infrastructure in a country or it is constrained by government will, capital flow naturally is driven to informal p2p and OTC methods. These transactions are inherently less efficient as there is a lot of friction involved in exchanging cash in person, besides the risk involved in having the custody of physical assets there’s also a logistical overhead in operating the currencies which are been traded. Even if the activity is carried out online you still need a third party to escrow the transaction and be available to be called upon in the case of a dispute. So finality is inherently uncertain, especially time wise.


This solution is built with the intention of being ported to other payments systems such as what is intended to be achieved with FEDnow, as well with other legacy systems which have the minimum infrastructure necessary to generate the proofs on a receipt. Potentially if CBDC are open to be used by the general public it becomes another venue where settlement of swaps can be done on a trustless manner, where the only centralization point is the currency issuer itself, therefore an inherent risk which can not be mitigated 


The protocol requires the token seller to accept some public key as being responsible for signing valid transactions. Ideally, central banks should be providing the payer with a signed message attesting to the successful fiat transfer. This may come true in Brazil with new PIX APIs or in the design of CBDCs.


Currently what’s achievable with the current central bank infrastructure is to use Cartesi Rollups to effortlessly read and validate a signed JSON message inside the dApp. This format, which is not normally suited for smart contracts, can be handled efficiently by the Cartesi Virtual Machine. Accepting such formats is useful as trusted fiat authorities (central banks, financial institutions) may not provide confirmations in a format naturally suited for smart contracts.



### MVP data
––––––––––––––––

Solidity smart contract:

https://mumbai.polygonscan.com/address/0x08Cd9879D69693E5162B3A3eD24DdAb9118d0f0D

Cartesi smart contracts:

https://mumbai.polygonscan.com/address/0x08cd9879d69693e5162b3a3ed24ddab9118d0f0d

https://goerli.etherscan.io/address/0xdd08d2ada2208815238ebe97d41ff219ea129d39

https://www.figma.com/file/oIaOVWGTvicMysidMKxQgb/p2pix?node-id=23%3A2
