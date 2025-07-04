import type { Account } from '@/lib/account/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { deleteBy } from '@/utils/deleteBy'

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
    deleteBy(accounts.value, item => item.id === id)
  }

  return {
    accounts,
    saveAccount,
    deleteAccount,
  }
}, { persist: true })
