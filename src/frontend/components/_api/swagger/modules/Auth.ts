import * as ApiCommon from "../api-common"
// @ts-ignore
import * as Types from "../api-types"

export type getOauthToken_Type = {}
export type getOauthToken_Response = void
/**
 * POST /oauth/token
 *
 * Autenticar segundo o padrão OAuth2 usando o fluxo "Resource Owner Password Credentials".
 **/
export const getOauthToken = ApiCommon.requestMaker<getOauthToken_Type, getOauthToken_Response>({
  id: "getOauthToken",
  path: "/oauth/token",
  verb: "POST",
  parameters: []
})
