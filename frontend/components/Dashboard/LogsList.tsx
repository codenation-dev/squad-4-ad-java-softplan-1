import React from "react"
import { Model } from "./useLogs"
import { Segment, Label } from "semantic-ui-react"
import immer from "immer"
import { LogCount } from "../_api/swagger/api-types"
import dayjs from "dayjs"

export function LogsList(i: { data: Model }) {
  const { data } = i
  const logs = data.logs as (typeof data.logs[0] & { _selected: boolean })[]
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
  return (
    <div className="list">
      <style jsx global>{`
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
          <Segment key={log.id}>
            <div className="selector">
              <input
                type="checkbox"
                checked={log._selected || false}
                onChange={handleSelect(idx)}
              />
            </div>
            <div className="log-level">
              <Label color={logLevelColors[log.logLevel || ""]}>{log.logLevel}</Label>
            </div>
            <div className="info">
              <LogInfoCell log={log} />
            </div>
            <div className="count">{log.count}</div>
          </Segment>
        ))}
      </Segment.Group>
    </div>
  )
}

function LogInfoCell(i: { log: LogCount }) {
  return (
    <>
      <div>{i.log.message}</div>
      <div>{i.log.clientName}</div>
      <div>{dayjs(i.log.createdAt).format("DD/MM/YY hh:mm:ss")}</div>
    </>
  )
}

const logLevelColors = {
  ERROR: "red",
  WARN: "yellow",
  INFO: "blue",
  DEBUG: "gray",
  TRACE: "white",
  "": "white"
}
