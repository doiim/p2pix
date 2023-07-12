![home](https://user-images.githubusercontent.com/71399144/215202335-74dc2739-b312-43d3-a1a7-dfd835fb9f09.png)

## A trustless p2p solution for exchanging FIAT to ERC20 tokens.

![menus](https://user-images.githubusercontent.com/71399144/215202371-c3ebb710-6789-4d0b-8a46-4cdf54b2b4a0.png)

### In short.

The roadmap ideally would be accomplished through improvements to the PIX API, the smart contract receives and releases its funds based on a transaction proof that is generated every time a PIX payment's transaction receipt is validated.

![p2pix_explorer](https://user-images.githubusercontent.com/71399144/202617017-3d04fa8e-f241-4a53-a2af-1b1b04a48424.png)

For example, in case you want to sell **100 USDC** for the price of 500 BRL, you create an order that **locks it into the contract**. Once the user buying the USDC accepts the order it  **saves the buyer address** into the contract and generates a transaction QR Code with the specified value (500 BRL) to the PIX key detailed on the smart contract. Then it allows the necessary transaction to be confirmed and finally sends the **Id proof** to the smart contract which in return **releases the fund to the specified buyer address**.


## How does it work?
![p2pix arquitetura   pitch Bacen   24_out](https://user-images.githubusercontent.com/71399144/202616981-9f4293ce-bead-4d29-87a2-6cc315feab98.jpg)
Sell cryptocurrencies by placing them in an escrow via smart-contracts and define the amount in BRL that will be paid through Pix.
Pix is a “Brazilian instant payment juggernaut ” that we’re using to develop a disintermediation p2p alternative into swapping fiat money for cryptocurrencies.
Deal crypto by locking it into a smart-contract and set a price in BRL that will be paid through Pix.
"Person to person via Pix"
The name should be self-defining: p2pix.
Counterpart-risk-free peer network solution, really without intermediaries, that enables you to exchange fiat money for cryptocurrency.
Sell Brazilian stablecoins (assets linked to national fiduciary currency) by placing them in an escrow account with resources locked and automatically released via smart-contracts, define the amount in BRL (Real) that will be paid via Pix.
At its launch, the p2pix protocol will allow risk removal for users while creating a 'bridge' between fiat and crypto. In the future, it will be possible for a direct integration to be made between Real Digital and public blockchains.
Step-by-step…
1. Connect wallet (supported wallets: MetaMask or WalletConnect);
2. Type amount in Reais (BRL);
3. Request token (cryptocurrency) = BRZ or MBRL;
4. Identify the seller (from the list of people);
- scan QRcode (or add 'Pix key' manually);
- paste identification code (API Pix / bank receipt);
5. Receive in your wallet (important to know about self-custody).


## Why this solution?

![qrcode](https://user-images.githubusercontent.com/71399144/215202440-b08a7cee-b49f-4cee-a5a1-3f8b9755c2c7.png)

LocalBitcoins used to be, and currently still is in certain places such as in Venezuela, one of the main crypto providers where a substantial amount of volume flows through the parallel economy and revitalizes gross output during downturns.


If there is a lack of crypto infrastructure in a country or it is constrained by government will, capital flow naturally is driven to informal p2p and OTC methods. These transactions are inherently less efficient as there is a lot of friction involved in exchanging cash in person, besides the risk involved in having the custody of physical assets there’s also a logistical overhead in operating the currencies which have been traded. Even if the activity is carried out online you still need a third party to escrow the transaction and be available to be called upon in the case of a dispute. So finality is inherently uncertain, especially time-wise.

![gerenciar](https://user-images.githubusercontent.com/71399144/215202584-ab21e93d-8412-4d96-aa49-6a639144a3b9.png)

This solution is built with the intention of being ported to other payments systems such as what is intended to be achieved with FEDnow, as well with other legacy systems which have the minimum infrastructure necessary to generate the proofs on a receipt. Potentially if CBDC are open to be used by the general public it becomes another venue where settlement of swaps can be done in a trustless manner, where the only centralization point is the currency issuer itself, therefore an inherent risk that can not be mitigated 


The protocol requires the token seller to accept some public key as being responsible for signing valid transactions. Ideally, central banks should be providing the payer with a signed message attesting to the successful fiat transfer. This may come true in Brazil with new PIX APIs or in the design of CBDCs.

![mobile](https://user-images.githubusercontent.com/71399144/215202733-1d3dd02f-4636-4b4c-a0c5-bd335318fdbc.png)

Currently what’s achievable with the current central bank infrastructure is to use Cartesi Rollups to effortlessly read and validate a signed JSON message inside the dApp. This format, which is not normally suited for smart contracts, can be handled efficiently by the Cartesi Virtual Machine. Accepting such formats is useful as trusted fiat authorities (central banks, financial institutions) may not provide confirmations in a format naturally suited for smart contracts.

## Whitepaper [PT-BR]
https://docs.google.com/document/d/104hX6RFC9miXHWcHdygoxlNpXL3ct4X9DoX63ECyc8U/edit?usp=sharing



### MVP data
––––––––––––––––

Solidity smart contract:
https://mumbai.polygonscan.com/address/0x08Cd9879D69693E5162B3A3eD24DdAb9118d0f0D

Cartesi smart contracts:
- https://mumbai.polygonscan.com/address/0x08cd9879d69693e5162b3a3ed24ddab9118d0f0d
- https://goerli.etherscan.io/address/0xdd08d2ada2208815238ebe97d41ff219ea129d39
- https://www.figma.com/file/oIaOVWGTvicMysidMKxQgb/p2pix?node-id=23%3A2

Figma files:
- Buyer https://www.figma.com/file/Zft4e0u5HUiWGXJUCSEi7q/p2pix-doiim?node-id=1162-737&t=xKeEMPp6YgwA5vIh-0
- Seller https://www.figma.com/file/Zft4e0u5HUiWGXJUCSEi7q/p2pix-doiim?node-id=1237-687&t=xKeEMPp6YgwA5vIh-0
- Managing transactions https://www.figma.com/file/Zft4e0u5HUiWGXJUCSEi7q/p2pix-doiim?node-id=1413-687&t=xGbEnGVXdggsTb0L-0

FAQ:
https://docs.google.com/document/d/1dgjZ0aYuW_tIeOX26aV6ZR-OYniJl8txZy4SgeIKUu0/edit?usp=sharing

Sandbox:
https://p2pix-staging.vercel.app/

Pitches:
[PT-BR]
- Hackathon Ethereum São Paulo (September/2022) https://docs.google.com/presentation/d/18nOjzByU8nN0BntVbz5qqg5w1tN7pj1mMG_MySzWWpM/edit?usp=sharing
- Lift Learning for Brazilian Central Bank (November/2022) https://docs.google.com/presentation/d/1nf_9rvv2MsaB3kw3VlZm8cHbwujkVvfskHHlUsC-uI0/edit?usp=sharing
  - https://www.bcb.gov.br/en/pressdetail/2298/nota
  - https://www.bcb.gov.br/en/pressdetail/2262/nota
- Acceleration Next for Fenasbac 
  - Pitch (March/2023) https://docs.google.com/presentation/d/1x0GwuMdfKFC6siXjoOGgs5_QGva_7y5tWtm6GLVbVZM/edit?usp=sharing
  - Demo day (June/2023) https://docs.google.com/presentation/d/1j_Y2-0yTzMtV3P0lSYt6ux5YD0WdeH4PYtdMUCgvSFo/edit?usp=sharing
    - https://nextfintech.com.br/en/
 
[EN-US]
Rootstock: Bitcoin Scaling Hackathon (July/2023) https://docs.google.com/presentation/d/1ns-rXz0Vc_LltUZCZop_atN60TUjlBIt_W3KSSQcDDY/edit?usp=sharing
