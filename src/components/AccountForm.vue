<script lang="ts" setup>
import type { SelectChangeEvent } from 'primevue/select'
import type { Account, AccountType, RawAccount } from '@/lib/account/types'
import { computed, ref } from 'vue'
import { accountTypeDefaultsMap, accountTypeOptions } from '@/lib/account/constants'
import { validateAccount } from '@/lib/account/validation'
import { simplifyZodErrors } from '@/utils/simplifyZodErrors'

const emit = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'save', data: Account): void
}>()

const account = defineModel<RawAccount>({ required: true })
const errors = ref<Record<string, boolean>>({})

const hasError = computed(() => (name: string) => errors.value[name] || false)
const isWithPassword = computed(() => account.value.type === 'LOCAL')

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
    errors.value = simplifyZodErrors(result)
  }
}
</script>

<template>
  <form
    class="account-form"
    autocomplete="off"
    @submit.prevent
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
        gridColumn: isWithPassword ? '3' : '3 / span 2',
      }"
      @blur="validate"
    />
    <Password
      v-if="isWithPassword"
      v-model="account.password"
      name="password"
      :invalid="hasError('password')"
      :feedback="false"
      :input-style="{ width: '100%' }"
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
  width: 100%;
  gap: 0.5rem;
  grid-template-columns: 1fr .8fr 1fr 1fr 40px;
  align-items: baseline;
}
</style>
