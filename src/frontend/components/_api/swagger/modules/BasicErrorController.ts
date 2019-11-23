import * as ApiCommon from "../api-common"
// @ts-ignore
import * as Types from "../api-types"

export type errorUsingGET_Type = {}
export type errorUsingGET_Response = {}
/**
 * GET /error
 *
 **/
export const errorUsingGET = ApiCommon.requestMaker<errorUsingGET_Type, errorUsingGET_Response>({
  id: "errorUsingGET",
  path: "/error",
  verb: "GET",
  parameters: []
})

export type errorUsingHEAD_Type = {}
export type errorUsingHEAD_Response = {}
/**
 * HEAD /error
 *
 **/
export const errorUsingHEAD = ApiCommon.requestMaker<errorUsingHEAD_Type, errorUsingHEAD_Response>({
  id: "errorUsingHEAD",
  path: "/error",
  verb: "HEAD",
  parameters: []
})

export type errorUsingPOST_Type = {}
export type errorUsingPOST_Response = {}
/**
 * POST /error
 *
 **/
export const errorUsingPOST = ApiCommon.requestMaker<errorUsingPOST_Type, errorUsingPOST_Response>({
  id: "errorUsingPOST",
  path: "/error",
  verb: "POST",
  parameters: []
})

export type errorUsingPUT_Type = {}
export type errorUsingPUT_Response = {}
/**
 * PUT /error
 *
 **/
export const errorUsingPUT = ApiCommon.requestMaker<errorUsingPUT_Type, errorUsingPUT_Response>({
  id: "errorUsingPUT",
  path: "/error",
  verb: "PUT",
  parameters: []
})

export type errorUsingDELETE_Type = {}
export type errorUsingDELETE_Response = {}
/**
 * DELETE /error
 *
 **/
export const errorUsingDELETE = ApiCommon.requestMaker<
  errorUsingDELETE_Type,
  errorUsingDELETE_Response
>({
  id: "errorUsingDELETE",
  path: "/error",
  verb: "DELETE",
  parameters: []
})

export type errorUsingOPTIONS_Type = {}
export type errorUsingOPTIONS_Response = {}
/**
 * OPTIONS /error
 *
 **/
export const errorUsingOPTIONS = ApiCommon.requestMaker<
  errorUsingOPTIONS_Type,
  errorUsingOPTIONS_Response
>({
  id: "errorUsingOPTIONS",
  path: "/error",
  verb: "OPTIONS",
  parameters: []
})

export type errorUsingPATCH_Type = {}
export type errorUsingPATCH_Response = {}
/**
 * PATCH /error
 *
 **/
export const errorUsingPATCH = ApiCommon.requestMaker<
  errorUsingPATCH_Type,
  errorUsingPATCH_Response
>({
  id: "errorUsingPATCH",
  path: "/error",
  verb: "PATCH",
  parameters: []
})
