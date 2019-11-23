import * as ApiCommon from "../api-common"
// @ts-ignore
import * as Types from "../api-types"

export type handleErrorUsingGET_Type = {}
export type handleErrorUsingGET_Response = Types.ModelAndView
/**
 * GET /oauth/error
 *
 **/
export const handleErrorUsingGET = ApiCommon.requestMaker<
  handleErrorUsingGET_Type,
  handleErrorUsingGET_Response
>({
  id: "handleErrorUsingGET",
  path: "/oauth/error",
  verb: "GET",
  parameters: []
})

export type handleErrorUsingHEAD_Type = {}
export type handleErrorUsingHEAD_Response = Types.ModelAndView
/**
 * HEAD /oauth/error
 *
 **/
export const handleErrorUsingHEAD = ApiCommon.requestMaker<
  handleErrorUsingHEAD_Type,
  handleErrorUsingHEAD_Response
>({
  id: "handleErrorUsingHEAD",
  path: "/oauth/error",
  verb: "HEAD",
  parameters: []
})

export type handleErrorUsingPOST_Type = {}
export type handleErrorUsingPOST_Response = Types.ModelAndView
/**
 * POST /oauth/error
 *
 **/
export const handleErrorUsingPOST = ApiCommon.requestMaker<
  handleErrorUsingPOST_Type,
  handleErrorUsingPOST_Response
>({
  id: "handleErrorUsingPOST",
  path: "/oauth/error",
  verb: "POST",
  parameters: []
})

export type handleErrorUsingPUT_Type = {}
export type handleErrorUsingPUT_Response = Types.ModelAndView
/**
 * PUT /oauth/error
 *
 **/
export const handleErrorUsingPUT = ApiCommon.requestMaker<
  handleErrorUsingPUT_Type,
  handleErrorUsingPUT_Response
>({
  id: "handleErrorUsingPUT",
  path: "/oauth/error",
  verb: "PUT",
  parameters: []
})

export type handleErrorUsingDELETE_Type = {}
export type handleErrorUsingDELETE_Response = Types.ModelAndView
/**
 * DELETE /oauth/error
 *
 **/
export const handleErrorUsingDELETE = ApiCommon.requestMaker<
  handleErrorUsingDELETE_Type,
  handleErrorUsingDELETE_Response
>({
  id: "handleErrorUsingDELETE",
  path: "/oauth/error",
  verb: "DELETE",
  parameters: []
})

export type handleErrorUsingOPTIONS_Type = {}
export type handleErrorUsingOPTIONS_Response = Types.ModelAndView
/**
 * OPTIONS /oauth/error
 *
 **/
export const handleErrorUsingOPTIONS = ApiCommon.requestMaker<
  handleErrorUsingOPTIONS_Type,
  handleErrorUsingOPTIONS_Response
>({
  id: "handleErrorUsingOPTIONS",
  path: "/oauth/error",
  verb: "OPTIONS",
  parameters: []
})

export type handleErrorUsingPATCH_Type = {}
export type handleErrorUsingPATCH_Response = Types.ModelAndView
/**
 * PATCH /oauth/error
 *
 **/
export const handleErrorUsingPATCH = ApiCommon.requestMaker<
  handleErrorUsingPATCH_Type,
  handleErrorUsingPATCH_Response
>({
  id: "handleErrorUsingPATCH",
  path: "/oauth/error",
  verb: "PATCH",
  parameters: []
})
