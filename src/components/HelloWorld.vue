<template>
  <div class="landpage-header">
    <div class="px-5">presented by doiim & tickspread</div>
    <br/>
    <h1>Web3 Trustless Payments</h1>
    <AccountWidget/>
  </div>
  <div class="landpage-container">

    <p class="text-base px-5"></p>

    <hr class="m-5">

    <p class="text-base px-5">Connect your wallet to bid or ask orders.</p>

    <div class="grid md:grid-cols-1 gap-4 p-4">
      <CustomButton v-if="waiting">Wait...</CustomButton>
      <CustomButton v-if="!waiting && store.account == ''">Connect Wallet Before</CustomButton>
      <CustomButton v-if="!waiting && store.account != ''" @click="incrementCounter">count is {{counter}}</CustomButton>
    </div>
  </div>
  </template>

<script>
import {inject} from 'vue'
import { ethers } from "ethers";

import CustomButton from './CustomButton.vue'
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
  components: {CustomButton, AccountWidget},
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

<style scoped>
</style>
