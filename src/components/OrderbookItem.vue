<template>    
    <li class="flex justify-between items-center space-x-2 py-2 px-4 bg-white whitespace-nowrap rounded mb-3 mx-5 drop-shadow-md">
        <div class="flex-0">
          <div class="flex flex-row justify-start items-center space-x-2 bg-gray-100 whitespace-nowrap ">
            <svg height="40" width="40">
              <circle cx="20" cy="20" r="18" stroke="gray" stroke-width="2" fill="teal" />
            </svg>
            <div class="seller">
              {{ sellerAddress }}
            </div>
          </div>         
        </div>
        <div class="price">
          <span class="bid text-light">
            {{ order.type }}:  {{ order.tokenAmount }}  {{ order.token }} 
          </span>
          <span class="ask">
            ➔  R$ {{ formatedPrice }}
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
          <button v-if="!qrCodeDisplay" class="button-green" @click="buyOrder" :disabled="waiting || store.account == ''"> Comprar </button>
          <img v-if="qrCodeDisplay" :src="qrCodeValue" :size="qrCodeSize" />
        </div>
      </li>
</template>


<script>
// import  from ''
import {inject} from 'vue'
import { ethers } from "ethers";
import { useAccountStore } from '../stores/account'
import localhostAddresses from '../../deploys/localhost.json';
import offerArtifact from '../../artifacts/contracts/offer.sol/Offer.json';
import axios from 'axios';
import QrcodeVue from 'qrcode.vue'

export default {
  setup() {
      const store = useAccountStore()
      const getWalletSigner = inject('getWalletSigner')
      return { store, getWalletSigner }
  },
  data(){
      return {
        offerId : null,
        waiting : false,
        PIXTixd : null,
        qrCodeValue: '',
        qrCodeSize: 100,
        qrCodeDisplay: false
      }
  },
  components: {
    QrcodeVue,
  },
  computed:{
    sellerAddress(){
      return this.formatAddress(this.order.seller)
    },
    formatedPrice(){
      return this.formatPrice(this.order.price)
    }
  },
  methods:{
    generateTixd(length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      console.log(result)
      return result;
    },
    formatAddress(address){
      return '#' + address.substring(0,4) + '...' + address.substring(address.length-4,address.length) 
    },
    formatPrice(price){
      return price.toFixed(2)
    },
    formatDateTime(dateTime){
      return // Todo
    },
    qrCodeDecoder(url){
      ///v2/loc/:id/qrcode
      console.log(url)
      axios.get('https://p2pix.noho.st/api/qr/' + this.PIXTixd,{
      // # i don't know if we should use headers here
      }).then(({data}) =>{
        console.log(data)
        this.qrCodeValue = data
        this.qrCodeDisplay = true
        this.waiting = false
      })
    },
    async buyOrder(){
      console.log('test')
      const offerContract = await this.acceptContract(/*store.account*/)
      
      console.log('test2')
      // some tests
      // const buyerAddress = this.getWalletSigner().provider.provider.selectedAddress
      console.log(offerContract)

      //return
      axios.get('https://p2pix.noho.st/api/create/' + this.PIXTixd + '/' + this.formatedPrice, {

      // # will we use request headers?

      // x: 1}, {
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // }
      }).then(({data})=> {
        console.log(data);
        this.qrCodeDecoder(data.location); 
      });
    },
    async acceptContract() {

      // TODO
      // we need to allocate *PIXTixd in the smartContract so we can add a watcher on
      // the current Contract object that way, we can make tokens claimable if pix transaction is confirmed.
      this.PIXTixd = this.generateTixd(35)

      // The Contract object
      const offerContract = new ethers.Contract(
          localhostAddresses.offer,
          offerArtifact.abi,
          this.getWalletSigner()
      );

      const transaction = await offerContract.accept()
      this.waiting = true
      await transaction.wait()
      this.toastMessage()
      // console.log(await this.store.provider.send('eth_chainId', []))
      return offerContract
    },
    async toastMessage() {
      alert('you will be able to claim your tokens as soon as the payment is validated by your bank institution')
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
