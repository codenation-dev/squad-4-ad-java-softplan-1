import Router from "next/router"
import React from "react"
import { showToast } from "./_common/ToastService"
import { userRequestConfirm } from "./_api/swagger/modules/User"
import { NextPage } from "next"

export const SignupConfirm: NextPage<{ token }> = i => {
  return (
    <div className="ui center aligned middle aligned grid" style={{ height: "100vh" }}>
      <div className="column" style={{ maxWidth: "450px" }}>
        <h2 className="ui center aligned header">Cadastrar</h2>
        <SignupConfirmForm token={i.token} />
      </div>
    </div>
  )
}

SignupConfirm.getInitialProps = async function({ query }) {
  const token = query.token
  return { token }
}

function SignupConfirmForm(i: { token }) {
  const { onSubmit, $form } = formLogic(i)

  return (
    <form onSubmit={onSubmit} className="ui form" ref={$form}>
      <div className="field">
        <label htmlFor="password">Nova senha</label>
        <input type="password" name="password" />
      </div>
      <div className="field">
        <label htmlFor="password2">Repetir senha</label>
        <input type="password" name="password2" />
      </div>
      <button className="ui button fluid" type="submit">
        Enviar
      </button>
    </form>
  )
}

function formLogic(i: { token }) {
  const onSubmit = React.useCallback(async ev => {
    ev.preventDefault()
    ev.stopPropagation()
    try {
      const pwd1 = $form.current!.password.value
      const pwd2 = $form.current!.password2.value
      if (!pwd1 || !pwd2) {
        throw Error("Faltou preencher a senha.")
      }
      if (pwd1 !== pwd2) {
        throw Error("As senhas não coincidem.")
      }
      await userRequestConfirm({
        password: pwd1,
        token: i.token
      })
      showToast("success", "Usuário confirmado!")
      Router.push("/")
    } catch (err) {
      showToast("error", err)
    }
  }, [])
  const $form = React.useRef<HTMLFormElement>(null)

  return { onSubmit, $form }
}
