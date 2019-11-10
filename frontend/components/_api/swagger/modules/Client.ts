import { requestMaker } from "../api-common"
import { Client } from "../api-types"

type clientList_Request = {}

type clientList_Response = { result: Client[] }

export const clientList = requestMaker<clientList_Request, clientList_Response>({
  id: "clientList",
  path: "/client",
  verb: "GET",
  parameters: []
})
