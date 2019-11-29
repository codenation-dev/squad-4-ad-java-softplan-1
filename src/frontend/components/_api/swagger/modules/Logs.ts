import * as ApiCommon from "../api-common"
// @ts-ignore
import * as Types from "../api-types"

export type listLogsUsingGET_Type = {
  authenticated?: boolean
  "authorities[0].authority"?: string
  clientId?: number
  code?: string
  createdAt_gt?: string
  createdAt_lt?: string
  credentials?: {}
  day?: number
  details?: {}
  logLevel?: string
  message?: string
  month?: number
  offset?: number
  paged?: boolean
  pageNumber?: number
  pageSize?: number
  principal?: {}
  "sort.sorted"?: boolean
  "sort.unsorted"?: boolean
  unpaged?: boolean
  year?: number
}
export type listLogsUsingGET_Response = Types.Page_LogListDTO_
/**
 * GET /logs
 *
 **/
export const listLogsUsingGET = ApiCommon.requestMaker<
  listLogsUsingGET_Type,
  listLogsUsingGET_Response
>({
  id: "listLogsUsingGET",
  path: "/logs",
  verb: "GET",
  parameters: [
    { name: "authenticated", required: false, in: "query" },
    { name: "authorities[0].authority", required: false, in: "query" },
    { name: "clientId", required: false, in: "query" },
    { name: "code", required: false, in: "query" },
    { name: "createdAt_gt", required: false, in: "query" },
    { name: "createdAt_lt", required: false, in: "query" },
    { name: "credentials", required: false, in: "query" },
    { name: "day", required: false, in: "query" },
    { name: "details", required: false, in: "query" },
    { name: "logLevel", required: false, in: "query" },
    { name: "message", required: false, in: "query" },
    { name: "month", required: false, in: "query" },
    { name: "offset", required: false, in: "query" },
    { name: "paged", required: false, in: "query" },
    { name: "pageNumber", required: false, in: "query" },
    { name: "pageSize", required: false, in: "query" },
    { name: "principal", required: false, in: "query" },
    { name: "sort.sorted", required: false, in: "query" },
    { name: "sort.unsorted", required: false, in: "query" },
    { name: "unpaged", required: false, in: "query" },
    { name: "year", required: false, in: "query" }
  ]
})

export type listLogsGroupedUsingGET_Type = {
  authenticated?: boolean
  "authorities[0].authority"?: string
  clientId?: number
  code?: string
  createdAt_gt?: string
  createdAt_lt?: string
  credentials?: {}
  details?: {}
  logLevel?: string
  message?: string
  offset?: number
  paged?: boolean
  pageNumber?: number
  pageSize?: number
  principal?: {}
  "sort.sorted"?: boolean
  "sort.unsorted"?: boolean
  unpaged?: boolean
}
export type listLogsGroupedUsingGET_Response = Types.LogListGroupedDTO[]
/**
 * GET /logs/grouped
 *
 * Agrupa por código, mensagem e dia.
 **/
export const listLogsGroupedUsingGET = ApiCommon.requestMaker<
  listLogsGroupedUsingGET_Type,
  listLogsGroupedUsingGET_Response
>({
  id: "listLogsGroupedUsingGET",
  path: "/logs/grouped",
  verb: "GET",
  parameters: [
    { name: "authenticated", required: false, in: "query" },
    { name: "authorities[0].authority", required: false, in: "query" },
    { name: "clientId", required: false, in: "query" },
    { name: "code", required: false, in: "query" },
    { name: "createdAt_gt", required: false, in: "query" },
    { name: "createdAt_lt", required: false, in: "query" },
    { name: "credentials", required: false, in: "query" },
    { name: "details", required: false, in: "query" },
    { name: "logLevel", required: false, in: "query" },
    { name: "message", required: false, in: "query" },
    { name: "offset", required: false, in: "query" },
    { name: "paged", required: false, in: "query" },
    { name: "pageNumber", required: false, in: "query" },
    { name: "pageSize", required: false, in: "query" },
    { name: "principal", required: false, in: "query" },
    { name: "sort.sorted", required: false, in: "query" },
    { name: "sort.unsorted", required: false, in: "query" },
    { name: "unpaged", required: false, in: "query" }
  ]
})

export type getLogUsingGET_Type = {
  id: number
}
export type getLogUsingGET_Response = Types.LogListDTO
/**
 * GET /logs/{id}
 *
 **/
export const getLogUsingGET = ApiCommon.requestMaker<getLogUsingGET_Type, getLogUsingGET_Response>({
  id: "getLogUsingGET",
  path: "/logs/{id}",
  verb: "GET",
  parameters: [{ name: "id", required: true, in: "path" }]
})
