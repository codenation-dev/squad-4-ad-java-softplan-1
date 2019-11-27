import React from "react"
import { DropdownItemProps } from "semantic-ui-react"
import { showToastC, showToast } from "../_common/ToastService"
import { listClientsUsingGET } from "../_api/swagger/modules/ClientController"
import { formatError } from "../_common/formatError"
import { listLogsUsingGET } from "../_api/swagger/modules/LogController"
import { LogListDTO } from "../_api/swagger/api-types"
import Router from "next/router"

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
  const [selectedLog, _setSelectedLog] = React.useState<LogListDTO | null>(null)
  const [filter, setFilter] = React.useState<Filters>({})
  const [globalError, setGlobalError] = React.useState("")

  function setSelectedLog(log: LogListDTO | null) {
    console.log("selected log", log)
    _setSelectedLog(log)
    const path = log ? `?id=${log.id}` : ""
    Router.push("/dashboard" + path)
  }

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

  async function updateLogs(
    mode: "reset" | "paging",
    selectId?: number | undefined
  ): Promise<void> {
    console.log("update logs", mode, selectId)
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
      if (selectId) {
        const found = (out.content || []).find(x => x.id === selectId)
        if (found) {
          setSelectedLog(found)
        }
      }
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

const _sortBy_src = [
  {
    text: "Ordenar por...",
    value: "*"
  },
  {
    text: "Nível",
    value: "logLevel"
  },
  {
    text: "Frequência",
    value: "count"
  },
  {
    text: "Data",
    value: "createdAt"
  }
]

export const SORTBY_OPTIONS = _sortBy_src.reduce((out, line) => {
  if (line.value === "*") {
    out.push({ ...line, key: line.value })
    return out
  }
  out.push({
    text: line.text + " +",
    value: line.value + "|+",
    key: line.value + "|+"
  })
  out.push({
    text: line.text + " -",
    value: line.value + "|-",
    key: line.value + "|-"
  })
  return out
}, [] as { text; value; key }[])

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
