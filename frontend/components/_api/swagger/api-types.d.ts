export interface Client {
  name: string
  id?: number
}

export interface LogCount {
  id?
  logLevel
  code
  message
  details
  createdAt
  clientName: string
  count: number
}
