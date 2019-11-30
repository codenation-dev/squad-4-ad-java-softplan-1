import { useContext } from "react"
import { Header, Image } from "semantic-ui-react"
import { userContext, Wireframe } from "../_common/Wireframe"
import "./Settings.scss"
import { ClientList } from "./ClientList"
import { UserSettingsColumn } from "./UserSettingsColumn"

export function Settings() {
  return (
    <Wireframe title="Configurações">
      <Content />
    </Wireframe>
  )
}

function Content() {
  const ctx = useContext(userContext)
  const currentUser = ctx.user
  if (!ctx.user.clients) return null
  return (
    <div className="ui container _settings">
      <h1 className="ui header">Configurações</h1>

      <section className="ui vertical segment _avatarBlock">
        <Header as="h2" className="_header" textAlign="center">
          <Image circular src="/static/girl.png" style={{ backgroundColor: "#feff9c" }} />
          <br />
          <Header.Content>{currentUser.displayName}</Header.Content>
        </Header>
        <span>(Nome de usuário: {currentUser.username})</span>
      </section>

      <section className="ui vertical segment _columns">
        <ClientList />
        <UserSettingsColumn />
      </section>
    </div>
  )
}
