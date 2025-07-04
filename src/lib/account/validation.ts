import z from 'zod'
import { parseTags } from './tags'

const baseSchema = z.object({
  id: z.string().uuid(),
  tags: z.string().min(1).max(50).refine((val) => {
    const tags = val.split(';').map(item => item.trim()).filter(Boolean)
    return tags.length > 0
  }).transform(val => parseTags(val)),
  login: z.string().min(1).max(100),
})

const schema = z.discriminatedUnion('type', [
  baseSchema.extend({
    type: z.literal('LOCAL'),
    password: z.string().min(1).max(100),
  }),
  baseSchema.extend({
    type: z.literal('LDAP'),
    password: z.null(),
  }),
])

export function validateAccount(data: unknown) {
  return schema.safeParse(data)
}
