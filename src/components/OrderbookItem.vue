<template>    
    <li class="flex justify-between items-center space-x-2 py-2 px-4 bg-white whitespace-nowrap rounded mb-3 mx-5 drop-shadow-md">
        <div class="flex-0">
          <div class="flex flex-row justify-start items-center space-x-2 bg-gray-100 whitespace-nowrap ">
            <svg height="40" width="40">
              <circle cx="20" cy="20" r="18" stroke="gray" stroke-width="2" fill="teal" />
            </svg>
            <div class="seller">
              {{ order.seller }}
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
          <button class="button-green" @click="confirmationWindow" :disabled="store.account == ''"> Comprar </button>
        
        </div>
      </li>
</template>


<script>
// import  from ''
import {inject} from 'vue'
import { useAccountStore } from '../stores/account'

export default {
  setup() {
      const store = useAccountStore()
      const getWalletSigner = inject('getWalletSigner')
      return { store, getWalletSigner }
  },
  data(){
      return {

      }
  },
  props:{ order: { type: Object } },
}
</script>
