import * as ApiCommon from "../api-common"
// @ts-ignore
import * as Types from "../api-types"

export type authorizeUsingGET_Type = {
  complete?: boolean
  model?: {}
  name?: string
  parameters: any
}
export type authorizeUsingGET_Response = Types.ModelAndView
/**
 * GET /oauth/authorize
 *
 **/
export const authorizeUsingGET = ApiCommon.requestMaker<
  authorizeUsingGET_Type,
  authorizeUsingGET_Response
>({
  id: "authorizeUsingGET",
  path: "/oauth/authorize",
  verb: "GET",
  parameters: [
    { name: "complete", required: false, in: "query" },
    { name: "model", required: false, in: "query" },
    { name: "name", required: false, in: "query" },
    { name: "parameters", required: true, in: "query" }
  ]
})

export type authorizeUsingHEAD_Type = {
  complete?: boolean
  model?: {}
  name?: string
  parameters: any
}
export type authorizeUsingHEAD_Response = Types.ModelAndView
/**
 * HEAD /oauth/authorize
 *
 **/
export const authorizeUsingHEAD = ApiCommon.requestMaker<
  authorizeUsingHEAD_Type,
  authorizeUsingHEAD_Response
>({
  id: "authorizeUsingHEAD",
  path: "/oauth/authorize",
  verb: "HEAD",
  parameters: [
    { name: "complete", required: false, in: "query" },
    { name: "model", required: false, in: "query" },
    { name: "name", required: false, in: "query" },
    { name: "parameters", required: true, in: "query" }
  ]
})

export type authorizeUsingPOST_Type = {
  complete?: boolean
  model?: {}
  name?: string
  parameters: any
}
export type authorizeUsingPOST_Response = Types.ModelAndView
/**
 * POST /oauth/authorize
 *
 **/
export const authorizeUsingPOST = ApiCommon.requestMaker<
  authorizeUsingPOST_Type,
  authorizeUsingPOST_Response
>({
  id: "authorizeUsingPOST",
  path: "/oauth/authorize",
  verb: "POST",
  parameters: [
    { name: "complete", required: false, in: "query" },
    { name: "model", required: false, in: "query" },
    { name: "name", required: false, in: "query" },
    { name: "parameters", required: true, in: "query" }
  ]
})

export type authorizeUsingPUT_Type = {
  complete?: boolean
  model?: {}
  name?: string
  parameters: any
}
export type authorizeUsingPUT_Response = Types.ModelAndView
/**
 * PUT /oauth/authorize
 *
 **/
export const authorizeUsingPUT = ApiCommon.requestMaker<
  authorizeUsingPUT_Type,
  authorizeUsingPUT_Response
>({
  id: "authorizeUsingPUT",
  path: "/oauth/authorize",
  verb: "PUT",
  parameters: [
    { name: "complete", required: false, in: "query" },
    { name: "model", required: false, in: "query" },
    { name: "name", required: false, in: "query" },
    { name: "parameters", required: true, in: "query" }
  ]
})

export type authorizeUsingDELETE_Type = {
  complete?: boolean
  model?: {}
  name?: string
  parameters: any
}
export type authorizeUsingDELETE_Response = Types.ModelAndView
/**
 * DELETE /oauth/authorize
 *
 **/
export const authorizeUsingDELETE = ApiCommon.requestMaker<
  authorizeUsingDELETE_Type,
  authorizeUsingDELETE_Response
>({
  id: "authorizeUsingDELETE",
  path: "/oauth/authorize",
  verb: "DELETE",
  parameters: [
    { name: "complete", required: false, in: "query" },
    { name: "model", required: false, in: "query" },
    { name: "name", required: false, in: "query" },
    { name: "parameters", required: true, in: "query" }
  ]
})

export type authorizeUsingOPTIONS_Type = {
  complete?: boolean
  model?: {}
  name?: string
  parameters: any
}
export type authorizeUsingOPTIONS_Response = Types.ModelAndView
/**
 * OPTIONS /oauth/authorize
 *
 **/
export const authorizeUsingOPTIONS = ApiCommon.requestMaker<
  authorizeUsingOPTIONS_Type,
  authorizeUsingOPTIONS_Response
>({
  id: "authorizeUsingOPTIONS",
  path: "/oauth/authorize",
  verb: "OPTIONS",
  parameters: [
    { name: "complete", required: false, in: "query" },
    { name: "model", required: false, in: "query" },
    { name: "name", required: false, in: "query" },
    { name: "parameters", required: true, in: "query" }
  ]
})

export type authorizeUsingPATCH_Type = {
  complete?: boolean
  model?: {}
  name?: string
  parameters: any
}
export type authorizeUsingPATCH_Response = Types.ModelAndView
/**
 * PATCH /oauth/authorize
 *
 **/
export const authorizeUsingPATCH = ApiCommon.requestMaker<
  authorizeUsingPATCH_Type,
  authorizeUsingPATCH_Response
>({
  id: "authorizeUsingPATCH",
  path: "/oauth/authorize",
  verb: "PATCH",
  parameters: [
    { name: "complete", required: false, in: "query" },
    { name: "model", required: false, in: "query" },
    { name: "name", required: false, in: "query" },
    { name: "parameters", required: true, in: "query" }
  ]
})
