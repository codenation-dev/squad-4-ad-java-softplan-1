import Link from "next/link"
import * as yup from "yup"
import { Formik } from "formik"
import { FormHelper } from "./FormHelper"
import { Input } from "semantic-ui-react"

export function Cadastrar() {
  return (
    <>
      <div className="ui center aligned middle aligned grid" style={{ height: "100vh" }}>
        <div className="column" style={{ maxWidth: "450px" }}>
          <h2 className="ui center aligned header">Login</h2>
          <CadastroForm />
          <div className="ui message">
            <Link href="/cadastrar">
              <a>Cadastrar</a>
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
  password: yup
    .string()
    .min(3)
    .required(),
  repeatPassword: yup
    .string()
    .min(3)
    .required()
})

function CadastroForm() {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        repeatPassword: ""
      }}
      validationSchema={formSchema}
      onSubmit={value => {}}
      render={ctrl => {
        const h = new FormHelper(ctrl)
        return (
          <form className="ui large form" onSubmit={ctrl.handleSubmit}>
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui fluid left icon input">
                  <Input
                    type="text"
                    placeholder="Usuário"
                    {...h.bind("username")}
                    iconPosition="left"
                    icon="user"
                  />
                </div>
              </div>
              <div className="field">
                <Input type="password" placeholder="Senha" {...h.bind("password")} />
              </div>
              <div className="field">
                <Input type="password" placeholder="Repetir senha" {...h.bind("repeatPassword")} />
              </div>
              <button className="ui large fluid button" type="submit">
                Login
              </button>
            </div>
          </form>
        )
      }}
    />
  )
}
