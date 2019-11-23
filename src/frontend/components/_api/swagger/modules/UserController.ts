import * as ApiCommon from "../api-common"
// @ts-ignore
import * as Types from "../api-types"

export type listUsingGET_Type = {}
export type listUsingGET_Response = Types.User[]
/**
 * GET /users
 *
 **/
export const listUsingGET = ApiCommon.requestMaker<listUsingGET_Type, listUsingGET_Response>({
  id: "listUsingGET",
  path: "/users",
  verb: "GET",
  parameters: []
})