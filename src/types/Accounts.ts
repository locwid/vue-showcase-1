export type AccountType = 'LOCAL' | 'LDAP'

export interface Tag {
  text: string
}

export interface Account {
  id: string
  tags: Tag[]
  type: AccountType
  login: string
  password: string | null
}

export type RawAccount = Omit<Account, 'tags'> & {
  tags: string
}
