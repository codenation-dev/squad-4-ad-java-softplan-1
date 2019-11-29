import React, { useContext } from "react"
import { Checkbox } from "semantic-ui-react"
import { Detail } from "../Detail/Detail"
import { Wireframe } from "../_common/Wireframe"
import { logContext, LogsContext } from "./LogsContext"
import { LogsList } from "./LogsList"
import { LogsListGrouped } from "./LogsListGrouped"
import { SearchBar } from "./SearchBar"

export function Dashboard(initial: { id?: number }) {
  return (
    <Wireframe title="Painel">
      <LogsContext>
        <Content initialSelectedLog={initial.id} />
      </LogsContext>
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
    data.updateLogsGrouped()
    if (initialSelectedLog) {
      data.setSelectedLogById(initialSelectedLog)
    }
    // data.updateLogs("reset", initialSelectedLog).catch(showToastC("error"))
  }, [])
  function groupedChange() {
    data.setGrouped(!data.showGrouped)
  }

  return (
    <div className="ui container">
      <style jsx>{`
        .columns {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
      `}</style>
      <h1 className="ui header">
        Logs
        <Checkbox
          label="Agrupado"
          slider
          checked={data.showGrouped}
          onChange={groupedChange}
          style={{ marginLeft: "30px" }}
        />
      </h1>
      <SearchBar />
      <div className="columns">
        {data.showGrouped ? <LogsListGrouped /> : <LogsList />}
        {data.selectedLog && <Detail />}
      </div>
    </div>
  )
}
