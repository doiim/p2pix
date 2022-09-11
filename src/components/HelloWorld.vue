<template>

  <div class="landpage-header">
    <HeroButton @click="loadOrders">See Orders</HeroButton>
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

