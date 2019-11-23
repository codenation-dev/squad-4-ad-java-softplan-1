import * as ApiCommon from "../api-common"
// @ts-ignore
import * as Types from "../api-types"

export type getAccessTokenUsingGET_Type = {
  name?: string
  parameters: any
}
export type getAccessTokenUsingGET_Response = Types.OAuth2AccessToken
/**
 * GET /oauth/token
 *
 **/
export const getAccessTokenUsingGET = ApiCommon.requestMaker<
  getAccessTokenUsingGET_Type,
  getAccessTokenUsingGET_Response
>({
  id: "getAccessTokenUsingGET",
  path: "/oauth/token",
  verb: "GET",
  parameters: [
    { name: "name", required: false, in: "query" },
    { name: "parameters", required: true, in: "query" }
  ]
})

export type postAccessTokenUsingPOST_Type = {
  name?: string
  parameters: any
}
export type postAccessTokenUsingPOST_Response = Types.OAuth2AccessToken
/**
 * POST /oauth/token
 *
 **/
export const postAccessTokenUsingPOST = ApiCommon.requestMaker<
  postAccessTokenUsingPOST_Type,
  postAccessTokenUsingPOST_Response
>({
  id: "postAccessTokenUsingPOST",
  path: "/oauth/token",
  verb: "POST",
  parameters: [
    { name: "name", required: false, in: "query" },
    { name: "parameters", required: true, in: "query" }
  ]
})
