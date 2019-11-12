import React, { useEffect } from "react"
import { Wireframe } from "../_common/Wireframe"
import { useLogs, readLogs } from "./useLogs"
import { SearchBar } from "./SearchBar"
import { LogsList } from "./LogsList"
import { showToastC } from "../_common/ToastService"

export function Dashboard() {
  return (
    <Wireframe title="Painel">
      <Content />
    </Wireframe>
  )
}

function Content() {
  const data = useLogs()
  React.useEffect(() => {
    readLogs(data)
      .then(res => {
        data.setLogs(res.results)
      })
      .catch(showToastC("error"))
  }, [])

  return (
    <div className="ui container">
      <h1 className="ui header">Logs</h1>
      <SearchBar data={data} />
      <LogsList data={data} />
    </div>
  )
}
