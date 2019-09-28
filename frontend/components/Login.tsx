import { Input } from "semantic-ui-react"
import * as yup from "yup"
import { Formik } from "formik"
import Link from "next/link"
import { FormHelper } from "./FormHelper"

export function Login() {
  return (
    <>
      <div className="ui center aligned middle aligned grid" style={{ height: "100vh" }}>
        <div className="column" style={{ maxWidth: "450px" }}>
          <h2 className="ui center aligned header">Login</h2>
          <LoginForm />
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
    .required()
})

function LoginForm() {
  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}
      onSubmit={value => {}}
      validationSchema={formSchema}
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
                <Input
                  type="password"
                  placeholder="Senha"
                  {...h.bind("password")}
                  iconPosition="left"
                  icon="lock"
                />
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
