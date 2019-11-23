import { SwaggerRequester, IRequest, IOperation, settings } from "./swagger/api-common"

const BACKEND_URL = process.env.BACKEND_URL!
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
console.log("backend url", BACKEND_URL)

interface TokenResponse {
  access_token
  token_type
  refresh_token
  expires_in
  scope
}

class RestRequester extends SwaggerRequester {
  async authenticate(i: { username; password }) {
    const data = { grant_type: "password", username: i.username, password: i.password }
    const dataStr = Object.entries(data)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&")
    const fetchResp = await fetch(BACKEND_URL + "/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: dataStr
    })
    const respJson = await fetchResp.json()
    if (fetchResp.status != 200) {
      throw respJson
    }
    localStorage.setItem("auth_info", JSON.stringify(respJson))
  }

  async getCurrentToken(): Promise<string> {
    //fixme: a forma mais correta é usar cookies
    const stored = localStorage.getItem("auth_info") || "{}"
    const storedJson = JSON.parse(stored) as TokenResponse
    return storedJson.access_token
  }

  async handler(
    request: IRequest & GApiCommon.MergeToRequest,
    input: Record<string, any>,
    operation: IOperation
  ) {
    const token = this.getCurrentToken()
    const url = new URL(BACKEND_URL + request.url)
    const params = request.query || {}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
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
