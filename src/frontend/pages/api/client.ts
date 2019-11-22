import { handler } from "./_apihelper"
import { Client } from "../../components/_api/swagger/api-types"

export default handler([
  { method: "GET", response: { result: [{ name: "Dev", id: 1 }] as Client[] } }
])
