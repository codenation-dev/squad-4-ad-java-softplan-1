import React, { useContext } from "react"
import { Segment, Label, Message, Header, Icon } from "semantic-ui-react"
import immer from "immer"
import dayjs from "dayjs"
import { LogLevelLabel } from "../_common/LogLevelLabel"
import { LogListDTO } from "../_api/swagger/api-types"
import { logContext } from "./LogsContext"

export function LogsList() {
  const data = useContext(logContext)
  const logs = data.logs
  const handleSelect = React.useCallback(
    (idx: number) => {
      return ev => {
        const updated = immer(logs, prev => {
          const item = prev[idx]
          item._selected = !item._selected
        })
        data.setLogs(updated)
      }
    },
    [logs, data.setLogs]
  )
  const [allSelected, setAllSelected] = React.useState(false)
  const handleSelectAll = React.useCallback(() => {
    const toSet = !allSelected
    setAllSelected(toSet)
    const updated = immer(logs, prev => {
      prev.forEach(item => {
        item._selected = toSet
      })
    })
    data.setLogs(updated)
  }, [allSelected, setAllSelected, logs, data.setLogs])

  const setDetail = React.useCallback(
    (log: LogListDTO | null) => ev => {
      data.setSelectedLog(log)
    },
    [data]
  )

  return (
    <div className="list">
      <style jsx global>{`
        .list {
          flex-grow: 3;
        }
        .ui.segment {
          display flex;
          flex-direction: row;
          align-items: center;
        }
        .log-level {
          text-align: center;
          width: 100px;
        }
        .info {
          flex-grow: 1
        }
        .count {
          min-width: 50px;
        }
        .line {
          transition: background-color 0.3s ease;
        }
        .line:hover {
          background-color: #f3f3f3;
        }
      `}</style>
      <Segment.Group>
        <Segment>
          <div className="selector">
            <input type="checkbox" checked={allSelected} onChange={handleSelectAll} />
          </div>
          <div className="log-level">Nível</div>
          <div className="info">Log</div>
          <div className="count">Ocorrências</div>
        </Segment>
        {logs.map((log, idx) => (
          <Segment key={log.id} onClick={setDetail(log)} className="line">
            <div className="selector">
              <input
                type="checkbox"
                checked={log._selected || false}
                onChange={handleSelect(idx)}
              />
            </div>
            <div className="log-level">
              <LogLevelLabel level={log.logLevel} />
            </div>
            <div className="info">
              <LogInfoCell log={log} />
            </div>
            {/* <div className="count">{log.count}</div> */}
          </Segment>
        ))}
        {!logs.length && (
          <Segment placeholder>
            <Header icon>
              <Icon name="inbox" />
              Nenhum log!
            </Header>
          </Segment>
        )}
      </Segment.Group>
    </div>
  )
}

function LogInfoCell(i: { log: LogListDTO }) {
  return (
    <>
      <div>{i.log.code}</div>
      <div>{i.log.message}</div>
      <div>{i.log.client!.name}</div>
      <div>{dayjs(i.log.createdAt).format("DD/MM/YY hh:mm:ss")}</div>
    </>
  )
}
