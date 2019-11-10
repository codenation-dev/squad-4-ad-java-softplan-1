import { SwaggerRequester, IRequest, IOperation, settings } from "./swagger/api-common"
import { authToken_Response } from "./swagger/modules/Auth"

const BACKEND_URL = process.env.BACKEND_URL!
console.log("backend url", BACKEND_URL)

class RestRequester extends SwaggerRequester {
  getCurrentToken(): authToken_Response {
    //fixme: a forma mais correta é usar cookies
    const stored = localStorage.getItem("auth_info") || "{}"
    return JSON.parse(stored)
  }

  async handler(
    request: IRequest & GApiCommon.MergeToRequest,
    input: Record<string, any>,
    operation: IOperation
  ) {
    const url = new URL(BACKEND_URL + request.url)
    const params = request.query || {}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    const token = this.getCurrentToken().access
    const body = ["GET", "DELETE"].includes(request.verb!)
      ? undefined
      : JSON.stringify(request.body)
    const headers = {} as Record<string, string>
    if (token) {
      headers.authorization = `Bearer ${token}`
    }
    if (body) {
      headers["Content-Type"] = "application/json"
    }
    const fetchResp = await fetch(url.toString(), {
      method: request.verb,
      body,
      headers
    })
    if (fetchResp.status === 204) return {}
    return fetchResp.json()
  }
}

export const requester = new RestRequester()
settings.getRequester = () => requester
