<template>
    <div class="absolute top-left w-screen h-screen p-3">
        <button v-if="store.account == ''" class="fixed top-right button-account m-2" @click="connectAccount">
            Connect Wallet
        </button>
        <button v-if="store.account != ''" class="fixed top-right button-account m-2">
            {{ store.account.substring(0,6) }}...{{ store.account.substring(store.account.length-4,store.account.length) }}
        </button>
    </div>
</template>

<script>
import { useAccountStore } from '../stores/account'

export default {
  setup() {
    const store = useAccountStore()
    return { store }
  },
  methods: {
    connectAccount: function (event) {
        this.store.connectAccount()
    }
  }
}
</script>

<style scoped>
.button-account {
    @apply bg-black text-white p-2 rounded-3xl fixed shadow;
}
.top-left {
    top: 0px;
    left: 0px;
}
.top-right {
    top: 0px;
    right: 0px;
}
</style>