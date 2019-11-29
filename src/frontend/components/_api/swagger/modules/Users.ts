import * as ApiCommon from "../api-common"
// @ts-ignore
import * as Types from "../api-types"

export type createUserInsecureUsingPOST_Type = {
  input: Types.UserCreateInsecureDTO
}
export type createUserInsecureUsingPOST_Response = Types.UserDetailDTO
/**
 * POST /users/public
 *
 **/
export const createUserInsecureUsingPOST = ApiCommon.requestMaker<
  createUserInsecureUsingPOST_Type,
  createUserInsecureUsingPOST_Response
>({
  id: "createUserInsecureUsingPOST",
  path: "/users/public",
  verb: "POST",
  parameters: [{ name: "input", required: true, in: "body" }]
})

export type selfUsingGET_Type = {
  authenticated?: boolean
  "authorities[0].authority"?: string
  credentials?: {}
  details?: {}
  principal?: {}
}
export type selfUsingGET_Response = Types.UserDetailDTO
/**
 * GET /users/self
 *
 **/
export const selfUsingGET = ApiCommon.requestMaker<selfUsingGET_Type, selfUsingGET_Response>({
  id: "selfUsingGET",
  path: "/users/self",
  verb: "GET",
  parameters: [
    { name: "authenticated", required: false, in: "query" },
    { name: "authorities[0].authority", required: false, in: "query" },
    { name: "credentials", required: false, in: "query" },
    { name: "details", required: false, in: "query" },
    { name: "principal", required: false, in: "query" }
  ]
})

export type patchUserSelfUsingPATCH_Type = {
  authenticated?: boolean
  "authorities[0].authority"?: string
  body: Types.UserPatchDTO
  credentials?: {}
  details?: {}
  principal?: {}
}
export type patchUserSelfUsingPATCH_Response = void
/**
 * PATCH /users/self
 *
 **/
export const patchUserSelfUsingPATCH = ApiCommon.requestMaker<
  patchUserSelfUsingPATCH_Type,
  patchUserSelfUsingPATCH_Response
>({
  id: "patchUserSelfUsingPATCH",
  path: "/users/self",
  verb: "PATCH",
  parameters: [
    { name: "authenticated", required: false, in: "query" },
    { name: "authorities[0].authority", required: false, in: "query" },
    { name: "body", required: true, in: "body" },
    { name: "credentials", required: false, in: "query" },
    { name: "details", required: false, in: "query" },
    { name: "principal", required: false, in: "query" }
  ]
})
