import * as ApiCommon from "../api-common"
// @ts-ignore
import * as Types from "../api-types"

export type submitLogUsingPOST_Type = {
  body: Types.SubmitLogDTO
}
export type submitLogUsingPOST_Response = Types.LogListDTO
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
  parameters: [{ name: "body", required: true, in: "body" }]
})
