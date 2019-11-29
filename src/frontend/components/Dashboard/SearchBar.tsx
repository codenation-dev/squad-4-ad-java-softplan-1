import { useFormik } from "formik"
import React, { useContext } from "react"
import { Button, Dropdown, Input } from "semantic-ui-react"
import { FormHelper } from "../_common/FormHelper"
import {
  logContext,
  LOGLEVEL_OPTIONS,
  SEARCHBY_OPTIONS,
  SearchParams,
  SORTBY_OPTIONS
} from "./LogsContext"

export function SearchBar() {
  const data = useContext(logContext)

  const bag = useFormik({
    initialValues: {
      selectedClient: "*",
      sortBy: "*",
      logLevel: "*",
      text: "",
      searchBy: "*"
    },
    onSubmit(value: SearchParams) {
      data.setSearchParams(value)
    }
  })

  const searchBy = bag.values.searchBy

  const h = new FormHelper(bag)

  return (
    <form
      id="search-form"
      className="ui menu stackable"
      style={{ flexWrap: "wrap" }}
      onSubmit={bag.handleSubmit}
    >
      <div className="item">
        <Dropdown
          selection
          search
          options={data.clients}
          {...h.bindInputSemantic("selectedClient")}
        />
      </div>
      <div className="item">
        <Dropdown selection options={SORTBY_OPTIONS} {...h.bindInputSemantic("sortBy")} />
      </div>

      <div className="item _grow">
        <Input
          className="search-input"
          placeholder="Buscar..."
          action
          style={{ display: "flex", width: "100%" }}
        >
          {searchBy !== "logLevel" && (
            <input name="text" className="_noBorder right" {...h.bindInput("text")} />
          )}
          {searchBy === "logLevel" && (
            <Dropdown
              selection
              name="logLevel"
              options={LOGLEVEL_OPTIONS}
              className="_grow _noBorder right"
              {...h.bindInputSemantic("logLevel")}
            />
          )}
          <Dropdown
            selection
            name="searchBy"
            options={SEARCHBY_OPTIONS}
            style={{ minWidth: "100px" }}
            {...h.bindInputSemantic("searchBy")}
          />
          <Button type="submit" icon="search"></Button>
        </Input>
      </div>
    </form>
  )
}

interface FormValues {
  logLevel
  searchBy
  text
}
