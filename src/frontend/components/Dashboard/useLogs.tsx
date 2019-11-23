import React from "react"
import { DropdownItemProps } from "semantic-ui-react"
import { showToastC } from "../_common/ToastService"
import { LogCount } from "../_api/customTypes"
import { listClientsUsingGET } from "../_api/swagger/modules/ClientController"

interface Filters {
  client?
  level?
  code?
  description?
}

export function useLogs() {
  const [clients, setClients] = React.useState<DropdownItemProps[]>([ALL_CLIENTS_OPTION])
  const [selectedClient, setSelectedClient] = React.useState("*" as string | number)
  const [selectedSort, setSelectedSort] = React.useState("*")
  const [logs, setLogs] = React.useState<LogCount[]>([])
  const [selectedLog, setSelectedLog] = React.useState<LogCount | null>(null)
  const [filter, setFilter] = React.useState<Filters>({})
  React.useEffect(() => {
    listClientsUsingGET({})
      .then(clients => {
        const dropdownContent = [
          ALL_CLIENTS_OPTION,
          ...clients.map(c => ({ value: c.id, text: c.name, key: c.id }))
        ]
        setClients(dropdownContent)
      })
      .catch(showToastC("error"))
  }, [])

  return {
    clients,
    setClients,
    selectedClient,
    setSelectedClient,
    selectedSort,
    setSelectedSort,
    logs,
    setLogs,
    filter,
    selectedLog,
    setSelectedLog
  }
}

function nullMap<T extends string | number>(i?: T) {
  if (i === "*") return undefined
  return i
}

export async function readLogs(model: Model) {
  const out = await listLogsGrouped({
    sortBy: nullMap(model.selectedSort),
    client: nullMap(model.selectedClient) as any,
    ...model.filter
  })
  return out
}

export type Model = ReturnType<typeof useLogs>

const ALL_CLIENTS_OPTION = {
  text: "Todos os clientes",
  value: "*",
  key: "*"
}

export const SORTBY_OPTIONS = [
  {
    text: "Ordenar por...",
    value: "*",
    key: "*"
  },
  {
    text: "Nível",
    value: "logLevel",
    key: "logLevel"
  },
  {
    text: "Frequência",
    value: "count",
    key: "count"
  }
]

export const SEARCHBY_OPTIONS = [
  {
    text: "por...",
    value: "*",
    key: "*"
  },
  {
    text: "Nível",
    value: "logLevel",
    key: "logLevel"
  },
  {
    text: "Código",
    value: "code",
    key: "code"
  },
  {
    text: "Descrição",
    value: "description",
    key: "description"
  }
]
