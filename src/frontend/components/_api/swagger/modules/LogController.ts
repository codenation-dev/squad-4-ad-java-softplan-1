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
