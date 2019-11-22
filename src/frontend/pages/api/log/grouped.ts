import { handler } from "../_apihelper"
import { LogCount } from "../../../components/_api/swagger/api-types"

export default handler([
  {
    method: "GET",
    response: {
      results: [
        {
          id: 1,
          clientName: "client1",
          code: "code1",
          count: 2,
          createdAt: new Date().toISOString(),
          details: "some\ndetails",
          logLevel: "error",
          message: "the title"
        },
        {
          id: 2,
          clientName: "client2",
          code: "code2",
          count: 2,
          createdAt: new Date().toISOString(),
          details: "other\ndetails",
          logLevel: "info",
          message: "another title"
        }
      ] as LogCount[]
    }
  }
])
