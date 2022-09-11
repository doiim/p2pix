<template>
    <div class="px-5 text-light">presented by doiim & tickspread</div>
    <h1 class="text-6xl leading-none font-extrabold tracking-tight normal-case text-white">Web3 Trustless <br/> <span class="text-yellow drop-shadow-sm"> Payments </Span></h1>
    <h2 class="text-base leading-7 px-5 text-light">Decentralized fiat ➔ crypto swap service.</h2>   
    <div class="landpage-container">
      <HeroButton>
        <router-link to="/orderbook">See Orders</router-link>
      </HeroButton>
    </div>
</template>

<script>
import { ethers } from "ethers";

import HeroButton from './HeroButton.vue'
import AccountWidget from './AccountWidget.vue'
import localhostAddresses from '../../deploys/localhost.json';
import counterArtifact from '../../artifacts/contracts/counter.sol/Counter.json';

export default {
  setup() {
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
        
      }
    }
  },
  methods: {
  }
}
</script>

