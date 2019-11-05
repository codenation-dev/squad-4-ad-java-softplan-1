import { SwaggerRequester, IRequest, IOperation } from "./swagger/api-common";
import { authToken_Response } from "./swagger/modules/Auth";

const BACKEND_URL = process.env.BACKEND_URL!;

class RestRequester extends SwaggerRequester {
  getCurrentToken(): authToken_Response {
    //fixme: a forma mais correta é usar cookies
    const stored = localStorage.get("auth_info") || "{}";
    return JSON.parse(stored);
  }

  async handler(
    request: IRequest & GApiCommon.MergeToRequest,
    input: Record<string, any>,
    operation: IOperation
  ) {
    const url = new URL(BACKEND_URL);
    const params = request.query || {};
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    const token = this.getCurrentToken().access;
    const body = ["GET", "DELETE"].includes(request.verb!)
      ? undefined
      : JSON.stringify(request.body);
    const fetchResp = await fetch(url.toString(), {
      method: request.verb,
      body,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : (undefined as any)
      }
    });
    if (fetchResp.status === 204) return {};
    return fetchResp.json();
  }
}
