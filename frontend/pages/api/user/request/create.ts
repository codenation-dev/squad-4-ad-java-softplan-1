import { handler } from "../../_apihelper";
import { userRequestCreate_Response } from "../../../../components/_api/swagger/modules/User";

export default handler([
  {
    method: "POST",
    response: {
      token: "1234"
    } as userRequestCreate_Response
  }
]);
