import type { Tag } from '@/types/Accounts'

export function parseTags(tags: string): Tag[] {
  return tags.split(';').map(item => item.trim()).filter(Boolean).map(item => ({ text: item.trim() }))
}

export function stringifyTags(tags: Tag[]): string {
  return tags.map(item => item.text).join('; ')
}
