import React from "react"
import { Dropdown, Input, Button } from "semantic-ui-react"
import { Model, SORTBY_OPTIONS, SEARCHBY_OPTIONS } from "./useLogs"
export function SearchBar(i: { data: Model }) {
  const { data } = i
  const handleClientChange = React.useCallback(ev => {}, [])
  const handleSortChange = React.useCallback(ev => {}, [])
  const handleSearchFormSubmit = React.useCallback(ev => {
    ev.preventDefault()
    ev.stopPropagation()
  }, [])
  return (
    <>
      <style jsx>{`
        #_grow {
          flex-grow: 1;
        }
        #_grow form {
          display: flex;
          flex-grow: 1;
        }
      `}</style>
      <div className="ui menu stackable" style={{ flexWrap: "wrap" }}>
        <div className="item">
          <Dropdown
            selection
            search
            options={data.clients}
            value={data.selectedClient}
            onChange={handleClientChange}
          />
        </div>
        <div className="item">
          <Dropdown
            selection
            options={SORTBY_OPTIONS}
            value={data.selectedSort}
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
                style={{ minWidth: "100px" }}
              />
              <Button type="submit" icon="search"></Button>
            </Input>
          </form>
        </div>
      </div>
    </>
  )
}
