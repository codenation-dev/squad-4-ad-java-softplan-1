export interface ClientCreateDTO {
  name?: string
}

export interface ClientDetailDTO {
  apiToken?: string
  id?: number
  name?: string
}

export interface ClientShortDTO {
  id?: number
  name?: string
}

export interface LogCreateDTO {
  code?: string
  details?: string
  logLevel?: "ERROR" | "WARN" | "INFO" | "DEBUG" | "TRACE"
  message?: string
}

export interface LogListDTO {
  client?: ClientShortDTO
  code?: string
  createdAt?: string
  details?: string
  id?: number
  logLevel?: string
  message?: string
}

export interface LogListGroupedDTO {
  client?: ClientShortDTO
  code?: string
  count?: number
  day?: number
  logLevel?: "ERROR" | "WARN" | "INFO" | "DEBUG" | "TRACE"
  message?: string
  month?: number
  year?: number
}

export interface Pageable {
  offset?: number
  pageNumber?: number
  pageSize?: number
  paged?: boolean
  sort?: Sort
  unpaged?: boolean
}

export interface Page_LogListDTO_ {
  content?: LogListDTO[]
  empty?: boolean
  first?: boolean
  last?: boolean
  number?: number
  numberOfElements?: number
  pageable?: Pageable
  size?: number
  sort?: Sort
  totalElements?: number
  totalPages?: number
}

export interface ResetTokenDTO {
  apiToken?: string
}

export interface Sort {
  empty?: boolean
  sorted?: boolean
  unsorted?: boolean
}

export interface SubmitLogDTO {
  apiToken?: string
  log?: LogCreateDTO
}

export interface UserCreateInsecureDTO {
  displayName?: string
  email?: string
  password?: string
  username?: string
}

export interface UserDetailDTO {
  clients?: ClientDetailDTO[]
  displayName?: string
  email?: string
  id?: number
  username?: string
}

export interface UserPatchDTO {
  clients?: number[]
  displayName?: string
  password?: string
}
