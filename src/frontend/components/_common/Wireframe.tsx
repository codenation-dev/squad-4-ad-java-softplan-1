import React from "react"
import Head from "next/head"
import { Dropdown, Divider, Menu } from "semantic-ui-react"
import { UserDetailDTO } from "../_api/swagger/api-types"
import { selfUsingGET } from "../_api/swagger/modules/Users"
import Link from "next/link"
import { requester } from "../_api/requester"

const initialUserContext = {
  user: {
    displayName: ""
  } as UserDetailDTO,
  refresh() {}
}
export const userContext = React.createContext(initialUserContext)

export const Wireframe: React.SFC<{ title }> = ({ children, title }) => {
  const [userInfo, setUserInfo] = React.useState(initialUserContext)
  const refresh = async () => {
    const user = await selfUsingGET({})
    const toSave = { user, refresh }
    localStorage.setItem("user_info", JSON.stringify(user))
    setUserInfo(toSave)
  }
  React.useEffect(() => {
    async function run() {
      try {
        const userInfo = JSON.parse(localStorage.getItem("user_info")!)
        if (!userInfo) throw Error()
        setUserInfo({ user: userInfo, refresh })
      } catch (err) {
        refresh()
      }
    }
    run()
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
          <Link href="/dashboard">
            <div className="header item _pointer">Aceleralog</div>
          </Link>
          <div className="right menu">
            <Menu.Item>{i.username}</Menu.Item>
            <Dropdown item icon="user circle">
              <Dropdown.Menu>
                <Link href="/settings">
                  <Dropdown.Item>Clientes</Dropdown.Item>
                </Link>
                <Divider></Divider>
                <Dropdown.Item
                  onClick={() => {
                    requester.clearToken()
                  }}
                >
                  Sair
                </Dropdown.Item>
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
