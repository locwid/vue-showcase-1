import type { Account } from '@/types/Accounts'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  const saveAccount = (account: Account) => {
    const index = accounts.value.findIndex(item => item.id === account.id)
    if (index !== -1) {
      accounts.value[index] = account
    }
    else {
      accounts.value.push(account)
    }
  }

  const deleteAccount = (id: string) => {
    const index = accounts.value.findIndex(item => item.id === id)
    if (index !== -1) {
      accounts.value.splice(index, 1)
    }
  }

  return {
    accounts,
    saveAccount,
    deleteAccount,
  }
}, { persist: true })
