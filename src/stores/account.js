import { ethers } from 'ethers'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', {
  state: () => {
    return {
      account: '',
      network: 0,
      error: '',
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async setAccount(a, n) {
      this.account = a
      this.network = n
    },
    unsetAccount() {
      this.account = ''
      this.network = 0
      this.error = ''
    },
  },
})
