import React from "react"
import Head from "next/head"
import { Dropdown, Divider } from "semantic-ui-react"

const initialUserContext = {
  user: {
    displayName: ""
  }
}
export const userContext = React.createContext(initialUserContext)

export const Wireframe: React.SFC<{ title }> = ({ children, title }) => {
  const [userInfo, setUserInfo] = React.useState(initialUserContext)
  React.useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.get("userInfo"))
      setUserInfo({ user: userInfo })
    } catch (err) {}
  }, [])

  return (
    <userContext.Provider value={userInfo}>
      <Head>
        <title>{title} - Aceleralog</title>
      </Head>
      <WireframeInner username={userInfo.user.displayName}>{children}</WireframeInner>
    </userContext.Provider>
  )
}

const WireframeInner: React.SFC<{ username }> = i => {
  return (
    <>
      <style jsx>{`
        .main {
          margin-top: 5rem;
        }
      `}</style>
      <div className="ui fixed menu inverted">
        <div className="ui container">
          <div className="header item">Aceleralog</div>
          <div className="right menu">
            <Dropdown item icon="user circle">
              <Dropdown.Menu>
                <Dropdown.Item>Clientes</Dropdown.Item>
                <Dropdown.Item>Opções</Dropdown.Item>
                <Divider></Divider>
                <Dropdown.Item>Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* <div className="item">
              <i className="user circle icon"></i>
              {i.username}
            </div> */}
          </div>
        </div>
      </div>
      <div className="main">{i.children}</div>
    </>
  )
}
