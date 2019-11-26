export function formatError(i: any) {
  console.error(i)
  if (i && i.error_description) return i.error_description
  if (i && i.trace) return String(i.trace).substr(0, 200)
  return String(i)
}
