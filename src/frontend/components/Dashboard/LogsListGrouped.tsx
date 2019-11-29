import dayjs from "dayjs"
import React, { useContext } from "react"
import { Header, Icon, Segment } from "semantic-ui-react"
import { LogListGroupedDTO } from "../_api/swagger/api-types"
import { LogLevelLabel } from "../_common/LogLevelLabel"
import { logContext } from "./LogsContext"

export function LogsListGrouped() {
  const data = useContext(logContext)
  const logsGrouped = data.logsGrouped

  const setDetail = React.useCallback(
    (log: LogListGroupedDTO | null) => ev => {
      data.setSelectedLogGrouped(log)
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
          <div className="log-level">Nível</div>
          <div className="info">Log</div>
          <div className="count">Ocorrências</div>
        </Segment>
        {logsGrouped.map((log, idx) => (
          <Segment key={idx} onClick={setDetail(log)} className="line">
            <div className="log-level">
              <LogLevelLabel level={log.logLevel} />
            </div>
            <div className="info">
              <LogInfoCell log={log} />
            </div>
            <div className="count">{log.count}</div>
          </Segment>
        ))}
        {!logsGrouped.length && (
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

function LogInfoCell(i: { log: LogListGroupedDTO }) {
  return (
    <>
      <div>{i.log.code}</div>
      <div>{i.log.message}</div>
      <div>{i.log.client!.name}</div>
      {i.log.day && (
        <div>{dayjs(new Date(i.log.year!, i.log.month! - 1, i.log.day)).format("DD/MM/YY")}</div>
      )}
    </>
  )
}
