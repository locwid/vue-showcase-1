<script lang="ts" setup>
import type { SelectChangeEvent } from 'primevue/select'
import type { Account, AccountType, RawAccount } from '@/lib/account/types'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import { computed, ref } from 'vue'
import { accountTypeDefaultsMap, accountTypeOptions } from '@/lib/account/constants'
import { validateAccount } from '@/lib/account/validation'

const emit = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'save', data: Account): void
}>()

const account = defineModel<RawAccount>({ required: true })
const errors = ref<Record<string, boolean>>({})

const hasError = computed(() => (name: string) => errors.value[name] || false)

function onTypeChange(e: SelectChangeEvent) {
  account.value.password = accountTypeDefaultsMap[e.value as AccountType]
  validate()
}

function validate() {
  const result = validateAccount(account.value)
  if (result.success) {
    errors.value = {}
    emit('save', result.data)
  }
  else {
    errors.value = result.error.errors.reduce((acc, error) => {
      acc[error.path[0]] = true
      return acc
    }, {} as Record<string, boolean>)
  }
}
</script>

<template>
  <form
    class="account-form"
    autocomplete="off"
  >
    <Textarea
      v-model="account.tags"
      name="tags"
      rows="1"
      auto-resize
      :invalid="hasError('tags')"
      @blur="validate"
    />
    <Select
      v-model="account.type"
      name="type"
      :options="accountTypeOptions"
      option-label="label"
      option-value="value"
      :invalid="hasError('type')"
      @change="onTypeChange"
    />
    <InputText
      v-model="account.login"
      name="login"
      :invalid="hasError('login')"
      :style="{
        gridColumn: account.type === 'LOCAL' ? '3' : '3 / span 2',
      }"
      @blur="validate"
    />
    <Password
      v-if="account.type === 'LOCAL'"
      v-model="account.password"
      name="password"
      :invalid="hasError('password')"
      :feedback="false"
      @blur="validate"
    />
    <Button
      icon="pi pi-trash"
      variant="text"
      severity="danger"
      type="button"
      @click="emit('delete', account.id)"
    />
  </form>
</template>

<style scoped lang="less">
.account-form {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr .8fr 1fr 1fr 40px;
  align-items: baseline;
}
</style>
