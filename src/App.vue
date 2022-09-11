
<template>
  <div :class="'root ' + ($route.path == '/' ? 'hero-gradient':'')">
    <div :class="'header ' + ($route.path == '/' ? 'bg-transparent':'bg-white')">
      <router-link to="/">
        <img class="product-logo" :src="'/assets/product-logo' + ($route.path == '/' ? '-white':'')+'.png'"/>
      </router-link>
      <AccountWidget/>
    </div>
    <!-- <img alt="Header Image" src="./assets/header.png" class="my-4"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
import AccountWidget from './components/AccountWidget.vue'

import { useAccountStore } from './stores/account'
import {inject} from 'vue'

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
  components: {AccountWidget},
}

</script>

<style scoped>
.hero-gradient{
  background: linear-gradient(215deg, #f59e0b, #1dad9d);
  background-size: 400% 400%;
}
.hero-gradient {
  -webkit-animation: HeroGradient 3s ease infinite;
  -moz-animation: HeroGradient 3s ease infinite;
  animation: HeroGradient 3s ease infinite;
}

@-webkit-keyframes HeroGradient {0%{background-position:0% 100%}50%{background-position:10% 80%}100%{background-position:0% 100%}}
@-moz-keyframes HeroGradient {0%{background-position:0% 100%}50%{background-position:10% 80%}100%{background-position:0% 100%}}
@keyframes HeroGradient {0%{background-position:0% 100%}50%{background-position:10% 80%}100%{background-position:0% 100%}}

/* 
  .hero-gradient.off {
    -webkit-animation: HeroGradientOff 0.6s ease;
    -moz-animation: HeroGradientOff 0.6s ease;
    animation: HeroGradientOff 0.6s ease;
  }

  @-webkit-keyframes HeroGradientOff {0%{background-position:0% 100%}100%{background-position:100% 0%}}
  @-moz-keyframes HeroGradientOff {0%{background-position:0% 100%}100%{background-position:100% 0%}}
  @keyframes HeroGradientOff {0%{background-position:0% 100%}100%{background-position:100% 0%}}
*/

.header{
  padding-top: 24px;
  margin-bottom: 36px;
}
.product-logo{
  margin-left: 40px;
  margin-top: 10px;
}
</style>