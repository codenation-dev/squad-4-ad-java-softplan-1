export interface Client {
  apiToken?: string
  createdAt?: string
  id?: number
  name?: string
  updatedAt?: string
  users?: User[]
}

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

export interface GrantedAuthority {
  authority?: string
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

export interface ModelAndView {
  empty?: boolean
  model?: {}
  modelMap?: {}
  reference?: boolean
  status?:
    | "100 CONTINUE"
    | "101 SWITCHING_PROTOCOLS"
    | "102 PROCESSING"
    | "103 CHECKPOINT"
    | "200 OK"
    | "201 CREATED"
    | "202 ACCEPTED"
    | "203 NON_AUTHORITATIVE_INFORMATION"
    | "204 NO_CONTENT"
    | "205 RESET_CONTENT"
    | "206 PARTIAL_CONTENT"
    | "207 MULTI_STATUS"
    | "208 ALREADY_REPORTED"
    | "226 IM_USED"
    | "300 MULTIPLE_CHOICES"
    | "301 MOVED_PERMANENTLY"
    | "302 FOUND"
    | "302 MOVED_TEMPORARILY"
    | "303 SEE_OTHER"
    | "304 NOT_MODIFIED"
    | "305 USE_PROXY"
    | "307 TEMPORARY_REDIRECT"
    | "308 PERMANENT_REDIRECT"
    | "400 BAD_REQUEST"
    | "401 UNAUTHORIZED"
    | "402 PAYMENT_REQUIRED"
    | "403 FORBIDDEN"
    | "404 NOT_FOUND"
    | "405 METHOD_NOT_ALLOWED"
    | "406 NOT_ACCEPTABLE"
    | "407 PROXY_AUTHENTICATION_REQUIRED"
    | "408 REQUEST_TIMEOUT"
    | "409 CONFLICT"
    | "410 GONE"
    | "411 LENGTH_REQUIRED"
    | "412 PRECONDITION_FAILED"
    | "413 PAYLOAD_TOO_LARGE"
    | "413 REQUEST_ENTITY_TOO_LARGE"
    | "414 URI_TOO_LONG"
    | "414 REQUEST_URI_TOO_LONG"
    | "415 UNSUPPORTED_MEDIA_TYPE"
    | "416 REQUESTED_RANGE_NOT_SATISFIABLE"
    | "417 EXPECTATION_FAILED"
    | "418 I_AM_A_TEAPOT"
    | "419 INSUFFICIENT_SPACE_ON_RESOURCE"
    | "420 METHOD_FAILURE"
    | "421 DESTINATION_LOCKED"
    | "422 UNPROCESSABLE_ENTITY"
    | "423 LOCKED"
    | "424 FAILED_DEPENDENCY"
    | "426 UPGRADE_REQUIRED"
    | "428 PRECONDITION_REQUIRED"
    | "429 TOO_MANY_REQUESTS"
    | "431 REQUEST_HEADER_FIELDS_TOO_LARGE"
    | "451 UNAVAILABLE_FOR_LEGAL_REASONS"
    | "500 INTERNAL_SERVER_ERROR"
    | "501 NOT_IMPLEMENTED"
    | "502 BAD_GATEWAY"
    | "503 SERVICE_UNAVAILABLE"
    | "504 GATEWAY_TIMEOUT"
    | "505 HTTP_VERSION_NOT_SUPPORTED"
    | "506 VARIANT_ALSO_NEGOTIATES"
    | "507 INSUFFICIENT_STORAGE"
    | "508 LOOP_DETECTED"
    | "509 BANDWIDTH_LIMIT_EXCEEDED"
    | "510 NOT_EXTENDED"
    | "511 NETWORK_AUTHENTICATION_REQUIRED"
  view?: View
  viewName?: string
}

export interface OAuth2AccessToken {
  additionalInformation?: {}
  expiration?: string
  expired?: boolean
  expiresIn?: number
  refreshToken?: OAuth2RefreshToken
  scope?: string[]
  tokenType?: string
  value?: string
}

export interface OAuth2RefreshToken {
  value?: string
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

export interface User {
  accountNonExpired?: boolean
  accountNonLocked?: boolean
  authorities?: GrantedAuthority[]
  clients?: Client[]
  createdAt?: string
  credentialsNonExpired?: boolean
  displayName?: string
  email?: string
  enabled?: boolean
  id?: number
  password?: string
  updatedAt?: string
  username?: string
}

export interface UserDetailDTO {
  clients?: ClientDetailDTO[]
  displayName?: string
  email?: string
  id?: number
  username?: string
}

export interface UserListDTO {
  displayName?: string
  id?: number
  username?: string
}

export interface UserPatchDTO {
  clients?: number[]
  displayName?: string
  password?: string
}

export interface View {
  contentType?: string
}
