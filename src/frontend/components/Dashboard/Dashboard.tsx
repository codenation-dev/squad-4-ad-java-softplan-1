import React, { useEffect, useContext } from "react"
import { Wireframe } from "../_common/Wireframe"
import { SearchBar } from "./SearchBar"
import { LogsList } from "./LogsList"
import { showToastC } from "../_common/ToastService"
import { Detail } from "../Detail/Detail"
import { logContext, LogsState } from "./LogsContext"

export function Dashboard(initial: { id?: number }) {
  return (
    <Wireframe title="Painel">
      <LogsState>
        <Content initialSelectedLog={initial.id} />
      </LogsState>
    </Wireframe>
  )
}

Dashboard.getInitialProps = async ({ query }) => {
  return { id: Number(query.id) || undefined }
}

function Content({ initialSelectedLog = undefined as undefined | number }) {
  const data = useContext(logContext)
  React.useEffect(() => {
    console.log("initial", initialSelectedLog)
    data.updateLogs("reset", initialSelectedLog).catch(showToastC("error"))
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
      <SearchBar />
      <div className="columns">
        <LogsList />
        {data.selectedLog && <Detail />}
      </div>
    </div>
  )
}
