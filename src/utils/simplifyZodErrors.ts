import type { SafeParseError } from 'zod'

export function simplifyZodErrors<TError>(result: SafeParseError<TError>) {
  return result.error.errors.reduce((acc, error) => {
    acc[error.path[0]] = true
    return acc
  }, {} as Record<string, boolean>)
}
