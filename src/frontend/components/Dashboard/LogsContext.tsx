import Router from "next/router"
import React, { createContext } from "react"
import { DropdownItemProps } from "semantic-ui-react"
import { LogListDTO, LogListGroupedDTO } from "../_api/swagger/api-types"
import { listClientsUsingGET } from "../_api/swagger/modules/Clients"
import {
  listLogsUsingGET,
  listLogsGroupedUsingGET,
  getLogUsingGET
} from "../_api/swagger/modules/Logs"
import { formatError } from "../_common/formatError"
import { showToast } from "../_common/ToastService"

export interface SearchParams {
  selectedClient
  sortBy
  logLevel
  text
  searchBy
}

export const logContext = createContext((null as any) as ReturnType<LogsContext["getContext"]>)

export class LogsContext extends React.Component<{}, LogsContext["state"]> {
  state = {
    searchParams: {
      selectedClient: "*",
      sortBy: "*",
      logLevel: "*",
      searchBy: "*",
      text: ""
    },
    isGrouped: true,
    logs: [] as (LogListDTO & { _selected?: boolean })[],
    logsGrouped: [] as LogListGroupedDTO[],
    selectedLog: null as LogListDTO | null,
    globalError: "",
    logsPage: 0,
    clients: [ALL_CLIENTS_OPTION]
  }

  async componentDidMount() {
    listClientsUsingGET({})
      .then(clients => {
        const dropdownContent = [
          ALL_CLIENTS_OPTION,
          ...clients.map(c => ({ value: c.id, text: c.name, key: c.id }))
        ]
        this.setState({ clients: dropdownContent })
      })
      .catch(err => {
        showToast("error", formatError(err))
        this.setError(formatError(err))
      })
  }

  setSearchParams = (i: LogsContext["state"]["searchParams"]) => {
    this.setState({ searchParams: i })
    if (this.state.isGrouped) {
      this.updateLogsGrouped()
    } else {
      this.updateLogs("reset")
    }
  }

  setError = (s: string) => {
    this.setState({ globalError: s })
  }

  setSelectedLog = (log: LogListDTO | null) => {
    console.log("selected log", log)
    this.setState({ selectedLog: log })
    this._selectedLogRouterUpdate(log?.id)
  }

  setLogs = (logs: LogListDTO[]) => {
    this.setState({ logs })
  }

  getUpdateParams = (mode: "reset" | "paging") => {
    const state = this.state
    const page = mode === "reset" ? 0 : state.logsPage + 1
    //filter
    const filter: Record<string, string | undefined> = {}
    let filterKey = nullMap(state.searchParams.searchBy)
    let filterValue =
      filterKey === "logLevel"
        ? nullMap(state.searchParams.logLevel) || undefined
        : state.searchParams.text
    if (filterValue && !filterKey) filterKey = "message"
    if (filterKey) {
      filter[filterKey] = filterValue
    }
    //sort
    let _extraQueryParams = {} as Record<string, string>
    if (nullMap(state.searchParams.sortBy)) {
      const [sortKey, sortOrder] = state.searchParams.sortBy.split("|")
      const order = sortOrder === "+" ? "asc" : "desc"
      _extraQueryParams.sort = sortKey + "," + order
    }

    const params = {
      _extraQueryParams,
      clientId: (nullMap(state.searchParams.selectedClient) as any) || undefined,
      pageNumber: page,
      ...filter
    }
    console.log(params)
    return params
  }

  updateLogs = async (mode: "reset" | "paging", selectId?: number) => {
    const state = this.state
    const params = this.getUpdateParams(mode)

    const out = await listLogsUsingGET(params)

    const toSetLogsPage = out.pageable!.pageNumber! || params.pageNumber
    let toSetLogs = state.logs
    let toSetSelectedLog = state.selectedLog
    if (mode === "reset") {
      toSetLogs = out.content || []
      if (selectId) {
        const found = (out.content || []).find(x => x.id === selectId)
        if (found) {
          toSetSelectedLog = found
        }
      }
    } else if (mode === "paging") {
      toSetLogs = [...state.logs, ...(out.content || [])]
    }
    return new Promise(resolve => {
      this.setState(
        {
          logsPage: toSetLogsPage,
          logs: toSetLogs,
          selectedLog: toSetSelectedLog
        },
        resolve
      )
    })
  }

  _selectedLogRouterUpdate = (id?: number) => {
    const path = id ? `?id=${id}` : ""
    Router.push("/dashboard" + path)
  }

  setSelectedLogById = async (selectId: number) => {
    const currentList = this.state.logs
    const found = currentList.find(x => x.id == selectId)
    if (found) {
      this.setState({ selectedLog: found })
      this._selectedLogRouterUpdate(found.id)
      return
    }
    try {
      const getLog = await getLogUsingGET({ id: selectId })
      this.setState({ selectedLog: getLog })
      this._selectedLogRouterUpdate(getLog?.id)
    } catch (err) {}
  }

  updateLogsGrouped = async () => {
    const params = this.getUpdateParams("reset")
    const out = await listLogsGroupedUsingGET(params)
    this.setState({
      logsGrouped: out
    })
  }

  setSelectedLogGrouped = async (log: LogListGroupedDTO | null) => {
    if (!log) {
      this.setState({ selectedLog: null })
      return
    }
    const params = this.getUpdateParams("reset")
    const { content: list } = await listLogsUsingGET({
      logLevel: log.logLevel,
      code: log.code,
      message: log.message,
      day: log.day,
      month: log.month,
      year: log.year,
      clientId: log.client?.id
    })
    const found = (list || [])[0]
    this.setState({ selectedLog: found })
    this._selectedLogRouterUpdate(found?.id)
  }

  setGrouped = (toSet: boolean) => {
    this.setState({ isGrouped: toSet })
    this.updateLogs("reset")
  }

  getContext = () => {
    return {
      ...this.state,
      setSearchParams: this.setSearchParams,
      setError: this.setError,
      updateLogs: this.updateLogs,
      updateLogsGrouped: this.updateLogsGrouped,
      setSelectedLog: this.setSelectedLog,
      setSelectedLogGrouped: this.setSelectedLogGrouped,
      setSelectedLogById: this.setSelectedLogById,
      setGrouped: this.setGrouped,
      setLogs: this.setLogs
    }
  }

  render() {
    return (
      <logContext.Provider value={this.getContext()}>{this.props.children}</logContext.Provider>
    )
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

const ALL_CLIENTS_OPTION = {
  text: "Todos os clientes",
  value: "*",
  key: "*"
} as DropdownItemProps

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
    text: "Mensagem",
    value: "message",
    key: "message"
  }
]

const logLevel_src = [
  { text: "", value: "*" },
  { text: "Error", value: "ERROR" },
  { text: "Warn", value: "WARN" },
  { text: "Info", value: "INFO" },
  { text: "Debug", value: "DEBUG" },
  { text: "Trace", value: "TRACE" }
]

export const LOGLEVEL_OPTIONS = logLevel_src.map(item => ({
  ...item,
  key: item.value
}))
