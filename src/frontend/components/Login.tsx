import { Formik } from "formik"
import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import { Button, Form, Message, Image } from "semantic-ui-react"
import * as yup from "yup"
import { requester } from "./_api/requester"
import { formatError } from "./_common/formatError"
import { FormHelper } from "./_common/FormHelper"

export function Login() {
  return (
    <div>
      <Head>
        <title>Aceleralog</title>
      </Head>
      <div className="ui middle aligned grid" style={{ height: "100vh", justifyContent: "center" }}>
        <div className="column" style={{ maxWidth: "450px" }}>
          <h2 className="ui center aligned header">
            aceleralog
            <Image src="static/aceleralog.png" />
          </h2>
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
  const [loading, setLoading] = useState(false)
  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}
      onSubmit={async value => {
        try {
          setLoading(true)
          localStorage.clear()
          await requester.authenticate({ username: value.username, password: value.password })
          console.log("login success")
          // Router.push("/dashboard")
          window.location.pathname = "/dashboard"
        } catch (err) {
          setLoading(false)
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
              <Button large fluid type="submit" style={{ marginTop: "16px" }} loading={loading}>
                Entrar
              </Button>
            </Form>
          </div>
        )
      }}
    />
  )
}
