import * as ApiCommon from "../api-common"
// @ts-ignore
import * as Types from "../api-types"

export type listClientsUsingGET_Type = {
  authenticated?: boolean
  "authorities[0].authority"?: string
  credentials?: {}
  details?: {}
  principal?: {}
}
export type listClientsUsingGET_Response = Types.Client[]
/**
 * GET /clients
 *
 **/
export const listClientsUsingGET = ApiCommon.requestMaker<
  listClientsUsingGET_Type,
  listClientsUsingGET_Response
>({
  id: "listClientsUsingGET",
  path: "/clients",
  verb: "GET",
  parameters: [
    { name: "authenticated", required: false, in: "query" },
    { name: "authorities[0].authority", required: false, in: "query" },
    { name: "credentials", required: false, in: "query" },
    { name: "details", required: false, in: "query" },
    { name: "principal", required: false, in: "query" }
  ]
})
