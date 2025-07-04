<script lang="ts" setup>
import type { Account, RawAccount } from '@/lib/account/types'
import { onMounted, ref } from 'vue'
import { stringifyTags } from '@/lib/account/tags'
import { useAccountsStore } from '@/stores/useAccountsStore'
import { clone } from '@/utils/clone'
import { createId } from '@/utils/createId'
import { deleteBy } from '@/utils/deleteBy'
import AccountForm from './AccountForm.vue'

type AccountStatus = 'DRAFT' | 'SAVED'

interface AccountFormData {
  status: AccountStatus
  data: RawAccount
}

const store = useAccountsStore()
const state = ref<AccountFormData[]>([])

onMounted(() => {
  initState()
})

function initState() {
  state.value = clone(store.accounts).map(item => ({
    status: 'SAVED',
    data: {
      ...item,
      tags: stringifyTags(item.tags),
    },
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
function markAsSaved(id: string) {
  const data = state.value.find(item => item.data.id === id)
  if (data) {
    data.status = 'SAVED'
  }
}

function handleDelete(id: string, status: AccountStatus) {
  deleteBy(state.value, item => item.data.id === id)
  if (status === 'SAVED') {
    store.deleteAccount(id)
  }
}

function handleSave(account: Account) {
  markAsSaved(account.id)
  store.saveAccount(account)
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
    <div class="accounts-registry__titles">
      <div>Метки</div>
      <div>Тип записи</div>
      <div>Логин</div>
      <div>Пароль</div>
    </div>
    <TransitionGroup
      name="list"
      tag="div"
      class="accounts-registry__body"
    >
      <AccountForm
        v-for="account in state"
        :key="account.data.id"
        v-model="account.data"
        @delete="handleDelete(account.data.id, account.status)"
        @save="handleSave"
      />
    </TransitionGroup>
    <div
      v-if="!state.length"
      class="accounts-registry__empty"
    >
      Нет данных
    </div>
  </div>
</template>

<style lang="less" scoped>
.accounts-registry {
  padding: 1rem;
  width: 968px;

  &__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;

    h1 {
      margin: 0;
    }
  }

  &__body {
    position: relative;

    & > *:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }

  &__empty {
    padding: 1rem;
    text-align: center;
  }

  &__titles {
    margin-top: 2rem;
    margin-bottom: 1rem;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: 1fr .8fr 1fr 1fr 40px;
    align-items: baseline;
    color: var(--p-neutral-500);
  }
}
</style>
