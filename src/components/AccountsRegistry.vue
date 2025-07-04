<script lang="ts" setup>
import type { Account } from '@/types/Accounts'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { onMounted, ref } from 'vue'
import { useAccountsStore } from '@/stores/useAccountsStore'
import { clone } from '@/utils/clone'
import { createId } from '@/utils/createId'
import AccountForm from './AccountForm.vue'

type AccountFormStatus = 'DRAFT' | 'EXISTS'

interface AccountFormData {
  status: AccountFormStatus
  data: Account
}

const store = useAccountsStore()
const { accounts } = storeToRefs(store)
const state = ref<AccountFormData[]>([])

onMounted(() => {
  initState()
})

function initState() {
  state.value = clone(accounts.value).map(item => ({
    status: 'EXISTS',
    data: item,
  }))
}

function addEmpty() {
  state.value.push({
    status: 'DRAFT',
    data: {
      id: createId(),
      type: 'LOCAL',
      tags: '',
      login: '',
      password: '',
    },
  })
}

function handleDelete(id: string, status: AccountFormStatus) {
  const index = state.value.findIndex(item => item.data.id === id)
  if (index !== -1) {
    state.value.splice(index, 1)
  }
  if (status === 'EXISTS') {
    store.deleteAccount(id)
  }
}
</script>

<template>
  <div class="accounts-registry">
    <div class="accounts-registry__header">
      <h1>Учетные записи</h1>
      <Button
        icon="pi pi-plus"
        variant="outlined"
        severity="secondary"
        aria-label="Добавить учетную запись"
        @click="addEmpty"
      />
    </div>
    <Message
      icon="pi pi-info-circle"
      severity="info"
    >
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель «;»
    </Message>
    <div class="accounts-registry__body">
      <div class="accounts-registry__titles">
        <div>Метки</div>
        <div>Тип записи</div>
        <div>Логин</div>
        <div>Пароль</div>
      </div>
      <AccountForm
        v-for="account in state"
        :key="account.data.id"
        v-model="account.data"
        @delete="handleDelete(account.data.id, account.status)"
        @save="store.saveAccount"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.accounts-registry {
  padding: 1rem;
  max-width: 968px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__header {
    display: flex;
    align-items: center;
    gap: 1rem;

    h1 {
      margin: 0;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__titles {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: 1fr .8fr 1fr 1fr 40px;
    align-items: baseline;
    color: var(--p-neutral-500)
  }
}
</style>
