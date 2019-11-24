import React from "react"
import { DropdownItemProps } from "semantic-ui-react"
import { showToastC, showToast } from "../_common/ToastService"
import { listClientsUsingGET } from "../_api/swagger/modules/ClientController"
import { formatError } from "../_common/formatError"
import { listLogsUsingGET } from "../_api/swagger/modules/LogController"
import { LogListDTO } from "../_api/swagger/api-types"

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
  const [logs, setLogs] = React.useState<LogListDTO[]>([])
  const [logsPage, setLogsPage] = React.useState(0)
  const [selectedLog, setSelectedLog] = React.useState<LogListDTO | null>(null)
  const [filter, setFilter] = React.useState<Filters>({})
  const [globalError, setGlobalError] = React.useState("")

  React.useEffect(() => {
    listClientsUsingGET({})
      .then(clients => {
        const dropdownContent = [
          ALL_CLIENTS_OPTION,
          ...clients.map(c => ({ value: c.id, text: c.name, key: c.id }))
        ]
        setClients(dropdownContent)
      })
      .catch(err => {
        showToast("error", formatError(err))
        setGlobalError(formatError(err))
      })
  }, [])

  async function updateLogs(mode: "reset" | "paging"): Promise<void> {
    const page = mode === "reset" ? 0 : logsPage + 1
    const out = await listLogsUsingGET({
      _extraQueryParams: {
        sort: nullMap(selectedSort) || undefined
      },
      clientId: (nullMap(selectedClient) as any) || undefined,
      pageNumber: page,
      ...filter
    })
    setLogsPage(out.pageable!.pageNumber! || page)
    if (mode === "reset") {
      setLogs(out.content || [])
    } else if (mode === "paging") {
      setLogs([...logs, ...(out.content || [])])
    }
  }

  return {
    clients,
    setClients,
    selectedClient,
    setSelectedClient,
    selectedSort,
    setSelectedSort,
    logs,
    setLogs,
    logsPage,
    updateLogs,
    // setLogsPage,
    filter,
    selectedLog,
    setSelectedLog,
    globalError
  }
}

/**
 * Devido a alguma limitação do semantic, tive que designar como valor de select vazio
 * o "*", pois '' ou null traziam problemas
 */
function nullMap<T extends string | number>(i?: T) {
  if (i === "*") return undefined
  return i
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
