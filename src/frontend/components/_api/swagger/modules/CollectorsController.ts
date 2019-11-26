import * as ApiCommon from "../api-common"
// @ts-ignore
import * as Types from "../api-types"

export type submitLogUsingPOST_Type = {
  apiToken: string
  log: Types.Log
}
export type submitLogUsingPOST_Response = Types.LogCreatedDTO
/**
 * POST /collectors/submit-log
 *
 **/
export const submitLogUsingPOST = ApiCommon.requestMaker<
  submitLogUsingPOST_Type,
  submitLogUsingPOST_Response
>({
  id: "submitLogUsingPOST",
  path: "/collectors/submit-log",
  verb: "POST",
  parameters: [
    { name: "apiToken", required: true, in: "query" },
    { name: "log", required: true, in: "body" }
  ]
})
