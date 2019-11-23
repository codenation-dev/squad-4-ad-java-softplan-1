import * as ApiCommon from "../api-common"
// @ts-ignore
import * as Types from "../api-types"

export type checkTokenUsingPOST_Type = {
  token: string
}
export type checkTokenUsingPOST_Response = {}
/**
 * POST /oauth/check_token
 *
 **/
export const checkTokenUsingPOST = ApiCommon.requestMaker<
  checkTokenUsingPOST_Type,
  checkTokenUsingPOST_Response
>({
  id: "checkTokenUsingPOST",
  path: "/oauth/check_token",
  verb: "POST",
  parameters: [{ name: "token", required: true, in: "query" }]
})
