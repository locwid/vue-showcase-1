import type { AccountType } from './types'

export const accountTypeDefaultsMap = {
  LOCAL: '',
  LDAP: null,
} satisfies Record<AccountType, unknown>

export const accountTypeOptions: { label: string, value: AccountType }[] = [
  {
    label: 'Локальная',
    value: 'LOCAL',
  },
  {
    label: 'LDAP',
    value: 'LDAP',
  },
]
