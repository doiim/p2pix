<template>
  <h1 class="text-6xl leading-none font-extrabold tracking-tight normal-case">Compre tokens fazendo <br/> <span class="text-green drop-shadow-sm"> apenas um pix </Span></h1>
  <h2 class="text-base leading-7 px-5 text-light">Uma solução p2p para negociar tokens.</h2>    
  <div class="orderlist-container">
    <!-- TABLE HERE -->
    
   <div class="flex-table">
    <ul class="w-48 flex-start pt-5">
        <OrderbookItem
        v-for="orderbook in orderbooks"
        :key="orderbook.id"
        :order="orderbook"/>
    </ul>
   </div>

    <!-- <HeroButton class="button-green" @click="createOrder">Create Order</HeroButton> -->
  </div>
  </template>

<script>
import { useAccountStore } from '../stores/account'
import localhostAddresses from '../../deploys/localhost.json';
import OrderbookItem from './OrderbookItem.vue'

export default {
  setup() {
  },
  data() {
    return {
      orderbooks: [{
            seller: "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
            price: 0.40,
            token: "ETH",
            tokenAmount: 0.02,
            type: "Oferta",
            expiryDate: "2d:24h:45m"
        },{
            seller: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
            price: 0.12,
            token: "IOT",
            tokenAmount: 0.014,
            type: "Oferta",
            expiryDate: "3d:11h:23m"
        }]
    }
  },
  components: { OrderbookItem },
  watch: {
    // Whenever account changes, this function will run
    async 'store.account'(account) {
      if (account) {
        
      }
    }
  },
  methods: {
    createOrder(){
      alert("creating order, joking")
    }
  }
}
</script>

