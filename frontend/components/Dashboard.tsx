import React, { useEffect } from "react"
import { Wireframe } from "./_common/Wireframe"
import { Dropdown, DropdownItemProps, Input, Button } from "semantic-ui-react"
import { clientList } from "./_api/swagger/modules/Client"
import { showToastC } from "./_common/ToastService"

export function Dashboard() {
  return (
    <Wireframe title="Painel">
      <Content />
    </Wireframe>
  )
}

function Content() {
  const [clients, setClients] = React.useState<DropdownItemProps[]>([ALL_CLIENTS_OPTION])
  const [selectedClient, setSelectedClient] = React.useState("*" as string | number)
  const [selectedSort, setSelectedSort] = React.useState("*")

  const handleClientChange = React.useCallback(ev => {}, [])
  const handleSortChange = React.useCallback(ev => {}, [])
  const handleSearchFormSubmit = React.useCallback(ev => {
    ev.preventDefault()
    ev.stopPropagation()
  }, [])

  React.useEffect(() => {
    clientList({})
      .then(({ result: clients }) => {
        const dropdownContent = [
          ALL_CLIENTS_OPTION,
          ...clients.map(c => ({ value: c.id, text: c.name, key: c.id }))
        ]
        setClients(dropdownContent)
      })
      .catch(showToastC("error"))
  }, [])

  return (
    <div className="ui container">
      <style jsx>{`
        #_grow {
          flex-grow: 1;
        }
        #_grow form {
          display: flex;
          flex-grow: 1;
        }
      `}</style>
      <h1 className="ui header">Logs</h1>
      <div className="ui menu stackable" style={{ flexWrap: "wrap" }}>
        <div className="item">
          <Dropdown
            selection
            search
            options={clients}
            value={selectedClient}
            onChange={handleClientChange}
          />
        </div>
        <div className="item">
          <Dropdown
            selection
            options={SORTBY_OPTIONS}
            value={selectedSort}
            onChange={handleSortChange}
          />
        </div>

        <div className="item" id="_grow">
          <form onSubmit={handleSearchFormSubmit}>
            <Input
              className="search-input"
              placeholder="Buscar..."
              action
              style={{ display: "flex", width: "100%" }}
            >
              <input style={{ flexGrow: 1 }} />
              <Dropdown
                selection
                options={SEARCHBY_OPTIONS}
                defaultValue="*"
                style={{ minWidth: "140px" }}
              />
              <Button type="submit" icon="search"></Button>
            </Input>
          </form>
        </div>
      </div>
    </div>
  )
}

const ALL_CLIENTS_OPTION = {
  text: "Todos os clientes",
  value: "*",
  key: "*"
}

const SORTBY_OPTIONS = [
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

const SEARCHBY_OPTIONS = [
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
