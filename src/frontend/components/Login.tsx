import { Input, Message, Form } from "semantic-ui-react"
import * as yup from "yup"
import { Formik } from "formik"
import Link from "next/link"
import { FormHelper } from "./_common/FormHelper"
import { requester } from "./_api/requester"
import { useState } from "react"
import { formatError } from "./_common/formatError"
import Router from "next/router"

export function Login() {
  return (
    <div>
      <div className="ui middle aligned grid" style={{ height: "100vh", justifyContent: "center" }}>
        <div className="column" style={{ maxWidth: "450px" }}>
          <h2 className="ui center aligned header">Login</h2>
          <LoginForm />
          <div className="ui basic segment">
            <Link href="/signup">
              <a>Cadastrar</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const formSchema = yup.object({
  username: yup
    .string()
    .min(3)
    .required(),
  password: yup
    .string()
    .min(3)
    .required()
})

function LoginForm() {
  const [error, setError] = useState("")
  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}
      onSubmit={async value => {
        try {
          await requester.authenticate({ username: value.username, password: value.password })
          console.log("login success")
          Router.push("/dashboard")
        } catch (err) {
          console.log(err)
          setError(formatError(err))
        }
      }}
      validationSchema={formSchema}
      render={ctrl => {
        const h = new FormHelper(ctrl)
        return (
          <div className="ui stacked segment">
            {error && <Message>{error}</Message>}
            <Form className="ui large form login-form" onSubmit={ctrl.handleSubmit}>
              <Form.Input
                type="text"
                placeholder="Usuário"
                {...h.bindInput("username")}
                iconPosition="left"
                icon="user"
              />
              <Form.Input
                type="password"
                placeholder="Senha"
                {...h.bindInput("password")}
                iconPosition="left"
                icon="lock"
              />
              <button className="ui large fluid button" type="submit" style={{ marginTop: "16px" }}>
                Entrar
              </button>
            </Form>
          </div>
        )
      }}
    />
  )
}
