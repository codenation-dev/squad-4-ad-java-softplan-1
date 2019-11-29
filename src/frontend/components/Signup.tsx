import { Formik } from "formik"
import { Form, Message } from "semantic-ui-react"
import * as yup from "yup"
import { FormHelper } from "./_common/FormHelper"
import { showToast } from "./_common/ToastService"
import { formatError } from "./_common/formatError"
import { useState } from "react"
import { createUserInsecureUsingPOST } from "./_api/swagger/modules/Users"
import Router from "next/router"
import Link from "next/link"

export function Signup() {
  return (
    <>
      <div className="ui center aligned middle aligned grid" style={{ height: "100vh" }}>
        <div className="column" style={{ maxWidth: "450px" }}>
          <h2 className="ui center aligned header">Cadastrar</h2>
          <SignupForm />
          <div className="ui basic segment">
            <Link href="/">
              <a>Voltar</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

const formSchema = yup.object({
  username: yup
    .string()
    .min(3)
    .required(),
  email: yup
    .string()
    .email()
    .required(),
  displayName: yup
    .string()
    .required()
    .min(1),
  password: yup
    .string()
    .min(3)
    .required(),
  repeatPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match")
})

function SignupForm() {
  const [error, setError] = useState("")

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        displayName: "",
        password: "",
        repeatPassword: ""
      }}
      validationSchema={formSchema}
      onSubmit={async value => {
        try {
          await createUserInsecureUsingPOST({
            input: {
              email: value.email,
              displayName: value.displayName,
              password: value.password,
              username: value.username
            },
            _noAuth: true
          })
          console.log("terminou")
          showToast("success", "Usuário criado com sucesso!")
          setTimeout(() => {
            Router.push("/")
          }, 1000)
        } catch (err) {
          console.log("onauth")
          setError(formatError(err))
        }
      }}
      render={ctrl => {
        const h = new FormHelper(ctrl)
        return (
          <form className="ui large form" onSubmit={ctrl.handleSubmit}>
            <div className="ui stacked segment">
              {error && <Message negative>{error}</Message>}
              <Form.Input
                type="text"
                placeholder="Usuário"
                iconPosition="left"
                icon="user"
                {...h.bindInput("username")}
              />
              <Form.Input
                type="text"
                placeholder="Nome de exibição"
                iconPosition="left"
                icon="user"
                {...h.bindInput("displayName")}
              ></Form.Input>
              <Form.Input
                type="text"
                placeholder="Email"
                iconPosition="left"
                icon="mail"
                {...h.bindInput("email")}
              ></Form.Input>
              <Form.Input type="password" placeholder="Senha" {...h.bindInput("password")} />
              <Form.Input
                type="password"
                placeholder="Repetir senha"
                {...h.bindInput("repeatPassword")}
              />
              <button className="ui large fluid button" type="submit">
                Concluído
              </button>
            </div>
          </form>
        )
      }}
    />
  )
}
