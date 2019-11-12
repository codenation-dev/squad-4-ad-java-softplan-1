import { requestMaker } from "../api-common"
import { LogCount } from "../api-types"

type Params = {
  sortBy?: string
  client?: number
  level?: string
  code?: string
  description?: string
}

export const listLogsGrouped = requestMaker<Params, { results: LogCount[] }>({
  id: "listLogsGrouped",
  path: "/log/grouped",
  verb: "GET",
  parameters: []
})
