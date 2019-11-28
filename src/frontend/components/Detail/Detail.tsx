import { Button, Icon, Header, Segment, List } from "semantic-ui-react"
import dayjs from "dayjs"
import { LogLevelLabel } from "../_common/LogLevelLabel"
import React, { useContext } from "react"
import { logContext } from "../Dashboard/LogsContext"

export function Detail() {
  const data = useContext(logContext)
  const selected = data.selectedLog
  if (!selected) return null
  const back = React.useCallback(() => {
    data.setSelectedLog(null)
  }, [data])
  return (
    <div className="detail">
      <style jsx>{`
        .detail {
          display: block;
          margin-left: 30px;
          min-width: 400px;
        }
        section {
          margin-bottom: 30px;
        }
      `}</style>
      <Button icon labelPosition="right" onClick={back}>
        <Icon name="angle left" />
        Voltar
      </Button>
      <Header as="h1">{selected.message}</Header>

      <Segment>
        <List horizontal divided style={{ display: "flex", alignItems: "center" }}>
          <List.Item>
            <List.Content>
              <LogLevelLabel level={selected.logLevel} />
            </List.Content>
          </List.Item>
          {/* <List.Item>
            <List.Content>
              <List.Header>Eventos</List.Header>
              <List.Description>{selected.count}</List.Description>
            </List.Content>
          </List.Item> */}
          <List.Item>
            <List.Content>
              <List.Header>Cliente</List.Header>
              <List.Description>{selected.client?.name}</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Segment>

      <section>
        <Header as="h3">Última ocorrência</Header>
        <div className="content">{dayjs(selected.createdAt).format("DD/MM/YYYY hh:mm:ss")}</div>
      </section>

      <section>
        <Header as="h3">Mensagem</Header>
        <div className="content">{selected.message}</div>
      </section>

      <section>
        <Header as="h3">Detalhes</Header>
        <pre>{selected.details}</pre>
      </section>
    </div>
  )
}
