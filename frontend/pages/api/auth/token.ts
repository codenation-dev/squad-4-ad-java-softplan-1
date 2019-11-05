import { authToken_Response } from "../../../components/_api/swagger/modules/Auth";
import { handler } from "../_apihelper";

export default handler([
  {
    method: "POST",
    response: {
      access: "abcdef",
      refresh: "abcdef",
      expires: "abcdef"
    } as authToken_Response
  }
]);
