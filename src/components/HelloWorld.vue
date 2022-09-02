<template>
  <div class="px-5">presented by doiim</div>
  <h1>Web3 Boilerplate</h1>
  <AccountWidget/>
  <p class="text-base px-5">
    A boilerplate for Web3 project to be used on Hackatons and start projects from scratch. It uses Vue3, Tailwind and Hardhat.
  </p>
  <hr class="m-5">
  <p class="text-base px-5">You can use the "Connect Wallet" on top to get access to the button for increment the counter on it. Be sure you are connected to your local node or Goerli blockchain.</p>
  <div class="grid md:grid-cols-1 gap-4 p-4">
    <CustomButton v-if="waiting">Wait...</CustomButton>
    <CustomButton v-if="!waiting && store.account == ''">Connect Wallet Before</CustomButton>
    <CustomButton v-if="!waiting && store.account != ''" @click="incrementCounter">count is {{counter}}</CustomButton>
  </div>
  <p class="text-base px-5">Additional references for the project and documentations just follow the links below:</p>
  <ul>
    <li><a href="https://github.com/doiim/web3-boilerplate">Github Repo</a></li>
    <li><a href="https://vitejs.dev/guide/">Vite Docs</a></li>
    <li><a href="https://hardhat.org/hardhat-runner/docs/getting-started#quick-start">Hardhat Quickstart</a></li>
  </ul>
</template>

<script>
import { ethers } from "ethers";

import CustomButton from './CustomButton.vue'
import AccountWidget from './AccountWidget.vue'

import { useAccountStore } from '../stores/account'
import localhostAddresses from '../../deploys/localhost.json';
import counterArtifact from '../../artifacts/contracts/counter.sol/Counter.json';

export default {
  setup() {
      const store = useAccountStore()
      return { store }
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
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const counterContract = new ethers.Contract(
          localhostAddresses.counter,
          counterArtifact.abi,
          signer
      );
      // console.log(this.store.signer)
      this.counter = await counterContract.getCount()
      console.log(await provider.getBlockNumber())
      // console.log(await this.store.provider.send('eth_chainId', []))
    },
    async incrementCounter() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const counterContract = new ethers.Contract(
          localhostAddresses.counter,
          counterArtifact.abi,
          signer
      );
      const transaction = await counterContract.incrementCounter()
      this.waiting = true
      await transaction.wait()
      this.waiting = false
      this.refreshCounter()
    }
  }
}
</script>

<style scoped>
</style>
