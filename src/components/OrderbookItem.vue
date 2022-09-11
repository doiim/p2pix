<template>    
    <li class="flex justify-between items-center space-x-2 py-2 px-4 bg-white whitespace-nowrap rounded mb-3 mx-5 drop-shadow-md">
        <div class="flex-0">
          <div class="flex flex-row justify-start items-center space-x-2 bg-gray-100 whitespace-nowrap ">
            <svg height="40" width="40">
              <circle cx="20" cy="20" r="18" stroke="gray" stroke-width="2" fill="teal" />
            </svg>
            <div class="seller">
              {{ formatAddress(order.seller) }}
            </div>
          </div>         
        </div>
        <div class="price">
          <span class="bid text-light">
            {{ order.type }}:  {{ order.tokenAmount }}  {{ order.token }} 
          </span>
          <span class="ask">
            ➔  R$ {{ order.price }}
          </span>
        </div>
        <div class="expiration">
          <span class="text-light">Time remaining</span>
          <span class="clock text-green">
            🕘
          </span>
          <span class="ask-price">
            {{ order.expiryDate }}
          </span>
        </div>

        <div class="actions ml-auto">
          <button class="button-green" @click="testApi" :disabled="waiting && store.account == ''"> Comprar </button>
        
        </div>
      </li>
</template>


<script>
// import  from ''
import {inject} from 'vue'
import { ethers } from "ethers";
import { useAccountStore } from '../stores/account'
import axios from 'axios';

export default {
  setup() {
      const store = useAccountStore()
      const getWalletSigner = inject('getWalletSigner')
      return { store, getWalletSigner }
  },
  data(){
      return {
        offerId : null,
        waiting : false
      }
  },
  methods:{
    formatAddress(address){
      return '#' + address.substring(0,4) + '...' + address.substring(address.length-4,address.length) 
    },
    qrCodeDecoder(){

    },
    async testApi(){
      
      await this.confirmBuy(/*store.account*/)
        
      axios.get('https://p2pix.noho.st/api/create/' + offerId + '/5.00', {
      // x: 1}, {
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // }
      }).then(({data})=> {
        console.log(data);
        qrCodeDecoder(data); 
      });
    },
    async confirmBuy() {
      // The Contract object
      const offerContract = new ethers.Contract(
          localhostAddresses.offer,
          offerArtifact.abi,
          this.getWalletSigner()
      );
      const transaction = await offerContract.accept()
      this.waiting = true
      await transaction.wait()
      this.waiting = false
      this.enableClaim()
      // console.log(await this.store.provider.send('eth_chainId', []))
      return
    },
    async enableClaim() {
      
    },
    // async claimTokens() {
    //   const offerContract = new ethers.Contract(
    //       localhostAddresses.offer,
    //       offerArtifact.abi,
    //       this.getWalletSigner()
    //   );
    //   const transaction = await offerContract.incrementCounter()
    //   this.waiting = true
    //   await transaction.wait()
    //   await this.refreshCounter()
    //   this.waiting = false
    // }
  },
  props:{ order: { type: Object } },
}
</script>
