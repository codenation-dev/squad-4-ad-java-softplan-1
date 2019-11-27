import { SwaggerRequester, IRequest, IOperation, settings } from "./swagger/api-common"
import Router from "next/router"

// ver: babelrc.js
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

// ver: github wkrueger/swagger-ts-template
class RestRequester extends SwaggerRequester {
  async authenticate({ username = "", password = "" }) {
    const data = { grant_type: "password", username, password }
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

  getSavedAuth() {
    //fixme: a forma mais correta é usar cookies
    const stored = localStorage.getItem("auth_info") || "{}"
    const storedJson = JSON.parse(stored) as TokenResponse
    return storedJson
  }

  clearToken() {
    localStorage.removeItem("auth_info")
    localStorage.removeItem("user_info")
    Router.push("/")
  }

  // @Override
  async handler(
    request: IRequest,
    input: Record<string, any> & GApiCommon.MergeToRequest,
    operation: IOperation
  ) {
    const token = this.getSavedAuth()?.access_token
    if (!token) {
      this.clearToken()
      throw Error("Não autenticado.")
    }
    const url = new URL(BACKEND_URL + request.url)
    const params = Object.assign({}, request.query || {}, input._extraQueryParams || {})
    Object.keys(params).forEach(
      key => params[key] !== undefined && url.searchParams.append(key, params[key])
    )
    const body = ["GET", "DELETE"].includes(request.verb!)
      ? undefined
      : JSON.stringify(request.body)
    const headers = {} as Record<string, string>
    if (token) {
      headers.authorization = `Bearer ${token}`
    }
    headers["Content-Type"] = "application/json"
    const fetchResp = await fetch(url.toString(), {
      method: request.verb,
      body,
      headers
    })
    console.log("fetchresp", request, fetchResp.status)
    if (fetchResp.status == 204) return {}
    if (fetchResp.status == 401) {
      this.clearToken()
      throw Error("Não autenticado.")
    }
    let jsonResp = {}
    try {
      console.log("parsing", request)
      jsonResp = await fetchResp.json()
      console.log("parsed", request, jsonResp)
    } catch (err) {
      // console.error("parse error at", request, err)
    }
    if (String(fetchResp.status).substr(0, 1) !== "2") {
      throw jsonResp
    }
    return jsonResp
  }
}

export const requester = new RestRequester()
settings.getRequester = () => requester

declare global {
  namespace GApiCommon {
    interface MergeToRequest {
      _extraQueryParams?: Record<string, any>
    }
  }
}
