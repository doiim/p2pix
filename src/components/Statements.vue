<template>
  <h1 class="text-md md:text-xs">Web3 Trustless Payments</h1>
  <hr class="max-w-xl m-auto mt-1 mb-2">
  <h2 class="text-base px-5">Fiat/Cripto descentralized swap service.</h2>    
  <div class="orderlist-container">
    <!-- TABLE HERE -->
    
    <HeroButton @click="loadApp">See Orders</HeroButton>
  </div>
  </template>

<script>
import {inject} from 'vue'
import AccountWidget from './AccountWidget.vue'

import { useAccountStore } from '../stores/account'
import localhostAddresses from '../../deploys/localhost.json';

export default {

  setup() {
      const store = useAccountStore()
      const getWalletSigner = inject('getWalletSigner')
      return { store, getWalletSigner }
  },
  data() {
    return {
      
    }
  },
  components: {AccountWidget},
  watch: {
    // Whenever account changes, this function will run
    async 'store.account'(account) {
      if (account) {
        
      }
    }
  },
  methods: {

  }
}
</script>

