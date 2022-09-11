<template>

  <div class="landpage-header">
    <div class="px-5">presented by doiim & tickspread</div>
    <br/>
    <AccountWidget/>
  </div>
  <h1>Web3 Trustless Payments</h1>
  <hr class="max-w-xl m-auto mt-1 mb-2">
  <h2 class="text-base px-5">Fiat/Cripto descentralized swap service.</h2>    
  <div class="landpage-container">

    <!--
      <div class="grid md:grid-cols-1 gap-4 p-4">
        <HeroButton v-if="waiting">Wait...</HeroButton>
        <HeroButton v-if="!waiting && store.account == ''" disabled>Connect Wallet Before</HeroButton>
        <HeroButton v-if="!waiting && store.account != ''" @click="incrementCounter">count is {{counter}}</HeroButton>
      </div>
    -->
    
    <HeroButton @click="loadApp">See Orders</HeroButton>
  </div>
  </template>

<script>
import {inject} from 'vue'
import { ethers } from "ethers";

import HeroButton from './HeroButton.vue'
import AccountWidget from './AccountWidget.vue'

import { useAccountStore } from '../stores/account'
import localhostAddresses from '../../deploys/localhost.json';
import counterArtifact from '../../artifacts/contracts/counter.sol/Counter.json';

export default {

  setup() {
      const store = useAccountStore()
      const getWalletSigner = inject('getWalletSigner')
      return { store, getWalletSigner }
  },
  data() {
    return {
      counter: 0,
      waiting: false
    }
  },
  components: {HeroButton, AccountWidget},
  watch: {
    // Whenever account changes, this function will run
    async 'store.account'(account) {
      if (account) {
        this.refreshCounter()
      }
    }
  },
  methods: {
    loadApp(){

    },
    async refreshCounter() {
      // The Contract object
      const counterContract = new ethers.Contract(
          localhostAddresses.counter,
          counterArtifact.abi,
          this.getWalletSigner()
      );
      this.counter = await counterContract.getCount()
      // console.log(await this.store.provider.send('eth_chainId', []))
      return
    },
    async incrementCounter() {
      const counterContract = new ethers.Contract(
          localhostAddresses.counter,
          counterArtifact.abi,
          this.getWalletSigner()
      );
      const transaction = await counterContract.incrementCounter()
      this.waiting = true
      await transaction.wait()
      await this.refreshCounter()
      this.waiting = false
    }
  }
}
</script>

