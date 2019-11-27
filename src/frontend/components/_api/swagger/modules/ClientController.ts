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
export type listClientsUsingGET_Response = Types.ClientShortDTO[]
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

export type createClientUsingPOST_Type = {
  client: Types.ClientCreateDTO
}
export type createClientUsingPOST_Response = Types.Client
/**
 * POST /clients
 *
 **/
export const createClientUsingPOST = ApiCommon.requestMaker<
  createClientUsingPOST_Type,
  createClientUsingPOST_Response
>({
  id: "createClientUsingPOST",
  path: "/clients",
  verb: "POST",
  parameters: [{ name: "client", required: true, in: "body" }]
})

export type resetTokenUsingPOST_Type = {
  authenticated?: boolean
  "authorities[0].authority"?: string
  clientId: number
  credentials?: {}
  details?: {}
  principal?: {}
}
export type resetTokenUsingPOST_Response = Types.ResetTokenDTO
/**
 * POST /clients/reset-token
 *
 **/
export const resetTokenUsingPOST = ApiCommon.requestMaker<
  resetTokenUsingPOST_Type,
  resetTokenUsingPOST_Response
>({
  id: "resetTokenUsingPOST",
  path: "/clients/reset-token",
  verb: "POST",
  parameters: [
    { name: "authenticated", required: false, in: "query" },
    { name: "authorities[0].authority", required: false, in: "query" },
    { name: "clientId", required: true, in: "query" },
    { name: "credentials", required: false, in: "query" },
    { name: "details", required: false, in: "query" },
    { name: "principal", required: false, in: "query" }
  ]
})
