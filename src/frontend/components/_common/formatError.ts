export function formatError(i: any) {
  if (i && i.error_description) return i.error_description
  return String(i)
}
