import React, { useEffect } from "react"
import { Wireframe } from "../_common/Wireframe"
import { useLogs } from "./useLogs"
import { SearchBar } from "./SearchBar"
import { LogsList } from "./LogsList"
import { showToastC } from "../_common/ToastService"
import { Detail } from "../Detail/Detail"

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
    data.updateLogs("reset").catch(showToastC("error"))
  }, [])

  return (
    <div className="ui container">
      <style jsx>{`
        .columns {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
      `}</style>
      <h1 className="ui header">Logs</h1>
      <SearchBar data={data} />
      <div className="columns">
        <LogsList data={data} />
        {data.selectedLog && <Detail data={data} />}
      </div>
    </div>
  )
}
