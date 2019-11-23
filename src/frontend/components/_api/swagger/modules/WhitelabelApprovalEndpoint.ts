import * as ApiCommon from "../api-common"
// @ts-ignore
import * as Types from "../api-types"

export type getAccessConfirmationUsingGET_Type = {
  model?: {}
}
export type getAccessConfirmationUsingGET_Response = Types.ModelAndView
/**
 * GET /oauth/confirm_access
 *
 **/
export const getAccessConfirmationUsingGET = ApiCommon.requestMaker<
  getAccessConfirmationUsingGET_Type,
  getAccessConfirmationUsingGET_Response
>({
  id: "getAccessConfirmationUsingGET",
  path: "/oauth/confirm_access",
  verb: "GET",
  parameters: [{ name: "model", required: false, in: "query" }]
})

export type getAccessConfirmationUsingHEAD_Type = {
  model?: {}
}
export type getAccessConfirmationUsingHEAD_Response = Types.ModelAndView
/**
 * HEAD /oauth/confirm_access
 *
 **/
export const getAccessConfirmationUsingHEAD = ApiCommon.requestMaker<
  getAccessConfirmationUsingHEAD_Type,
  getAccessConfirmationUsingHEAD_Response
>({
  id: "getAccessConfirmationUsingHEAD",
  path: "/oauth/confirm_access",
  verb: "HEAD",
  parameters: [{ name: "model", required: false, in: "query" }]
})

export type getAccessConfirmationUsingPOST_Type = {
  model?: {}
}
export type getAccessConfirmationUsingPOST_Response = Types.ModelAndView
/**
 * POST /oauth/confirm_access
 *
 **/
export const getAccessConfirmationUsingPOST = ApiCommon.requestMaker<
  getAccessConfirmationUsingPOST_Type,
  getAccessConfirmationUsingPOST_Response
>({
  id: "getAccessConfirmationUsingPOST",
  path: "/oauth/confirm_access",
  verb: "POST",
  parameters: [{ name: "model", required: false, in: "query" }]
})

export type getAccessConfirmationUsingPUT_Type = {
  model?: {}
}
export type getAccessConfirmationUsingPUT_Response = Types.ModelAndView
/**
 * PUT /oauth/confirm_access
 *
 **/
export const getAccessConfirmationUsingPUT = ApiCommon.requestMaker<
  getAccessConfirmationUsingPUT_Type,
  getAccessConfirmationUsingPUT_Response
>({
  id: "getAccessConfirmationUsingPUT",
  path: "/oauth/confirm_access",
  verb: "PUT",
  parameters: [{ name: "model", required: false, in: "query" }]
})

export type getAccessConfirmationUsingDELETE_Type = {
  model?: {}
}
export type getAccessConfirmationUsingDELETE_Response = Types.ModelAndView
/**
 * DELETE /oauth/confirm_access
 *
 **/
export const getAccessConfirmationUsingDELETE = ApiCommon.requestMaker<
  getAccessConfirmationUsingDELETE_Type,
  getAccessConfirmationUsingDELETE_Response
>({
  id: "getAccessConfirmationUsingDELETE",
  path: "/oauth/confirm_access",
  verb: "DELETE",
  parameters: [{ name: "model", required: false, in: "query" }]
})

export type getAccessConfirmationUsingOPTIONS_Type = {
  model?: {}
}
export type getAccessConfirmationUsingOPTIONS_Response = Types.ModelAndView
/**
 * OPTIONS /oauth/confirm_access
 *
 **/
export const getAccessConfirmationUsingOPTIONS = ApiCommon.requestMaker<
  getAccessConfirmationUsingOPTIONS_Type,
  getAccessConfirmationUsingOPTIONS_Response
>({
  id: "getAccessConfirmationUsingOPTIONS",
  path: "/oauth/confirm_access",
  verb: "OPTIONS",
  parameters: [{ name: "model", required: false, in: "query" }]
})

export type getAccessConfirmationUsingPATCH_Type = {
  model?: {}
}
export type getAccessConfirmationUsingPATCH_Response = Types.ModelAndView
/**
 * PATCH /oauth/confirm_access
 *
 **/
export const getAccessConfirmationUsingPATCH = ApiCommon.requestMaker<
  getAccessConfirmationUsingPATCH_Type,
  getAccessConfirmationUsingPATCH_Response
>({
  id: "getAccessConfirmationUsingPATCH",
  path: "/oauth/confirm_access",
  verb: "PATCH",
  parameters: [{ name: "model", required: false, in: "query" }]
})
