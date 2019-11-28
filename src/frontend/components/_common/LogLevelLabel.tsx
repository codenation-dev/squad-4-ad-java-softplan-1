import { Label } from "semantic-ui-react"

export function LogLevelLabel({ level }: { level?: string }) {
  return (
    <Label color={logLevelColors[level || ""] || undefined}>{(level || "").toLowerCase()}</Label>
  )
}

const logLevelColors = {
  ERROR: "red",
  WARN: "yellow",
  INFO: "blue",
  DEBUG: "",
  TRACE: "",
  "": ""
}
