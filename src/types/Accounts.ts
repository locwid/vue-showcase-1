export type AccountType = 'LOCAL' | 'LDAP'

export interface Account {
  id: string
  tags: string
  type: AccountType
  login: string
  password: string | null
}
