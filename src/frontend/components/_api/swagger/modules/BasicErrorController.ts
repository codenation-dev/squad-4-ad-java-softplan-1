import * as ApiCommon from "../api-common"
// @ts-ignore
import * as Types from "../api-types"

export type errorHtmlUsingGET_Type = {}
export type errorHtmlUsingGET_Response = Types.ModelAndView
/**
 * GET /error
 *
 **/
export const errorHtmlUsingGET = ApiCommon.requestMaker<
  errorHtmlUsingGET_Type,
  errorHtmlUsingGET_Response
>({
  id: "errorHtmlUsingGET",
  path: "/error",
  verb: "GET",
  parameters: []
})

export type errorHtmlUsingHEAD_Type = {}
export type errorHtmlUsingHEAD_Response = Types.ModelAndView
/**
 * HEAD /error
 *
 **/
export const errorHtmlUsingHEAD = ApiCommon.requestMaker<
  errorHtmlUsingHEAD_Type,
  errorHtmlUsingHEAD_Response
>({
  id: "errorHtmlUsingHEAD",
  path: "/error",
  verb: "HEAD",
  parameters: []
})

export type errorHtmlUsingPOST_Type = {}
export type errorHtmlUsingPOST_Response = Types.ModelAndView
/**
 * POST /error
 *
 **/
export const errorHtmlUsingPOST = ApiCommon.requestMaker<
  errorHtmlUsingPOST_Type,
  errorHtmlUsingPOST_Response
>({
  id: "errorHtmlUsingPOST",
  path: "/error",
  verb: "POST",
  parameters: []
})

export type errorHtmlUsingPUT_Type = {}
export type errorHtmlUsingPUT_Response = Types.ModelAndView
/**
 * PUT /error
 *
 **/
export const errorHtmlUsingPUT = ApiCommon.requestMaker<
  errorHtmlUsingPUT_Type,
  errorHtmlUsingPUT_Response
>({
  id: "errorHtmlUsingPUT",
  path: "/error",
  verb: "PUT",
  parameters: []
})

export type errorHtmlUsingDELETE_Type = {}
export type errorHtmlUsingDELETE_Response = Types.ModelAndView
/**
 * DELETE /error
 *
 **/
export const errorHtmlUsingDELETE = ApiCommon.requestMaker<
  errorHtmlUsingDELETE_Type,
  errorHtmlUsingDELETE_Response
>({
  id: "errorHtmlUsingDELETE",
  path: "/error",
  verb: "DELETE",
  parameters: []
})

export type errorHtmlUsingOPTIONS_Type = {}
export type errorHtmlUsingOPTIONS_Response = Types.ModelAndView
/**
 * OPTIONS /error
 *
 **/
export const errorHtmlUsingOPTIONS = ApiCommon.requestMaker<
  errorHtmlUsingOPTIONS_Type,
  errorHtmlUsingOPTIONS_Response
>({
  id: "errorHtmlUsingOPTIONS",
  path: "/error",
  verb: "OPTIONS",
  parameters: []
})

export type errorHtmlUsingPATCH_Type = {}
export type errorHtmlUsingPATCH_Response = Types.ModelAndView
/**
 * PATCH /error
 *
 **/
export const errorHtmlUsingPATCH = ApiCommon.requestMaker<
  errorHtmlUsingPATCH_Type,
  errorHtmlUsingPATCH_Response
>({
  id: "errorHtmlUsingPATCH",
  path: "/error",
  verb: "PATCH",
  parameters: []
})
