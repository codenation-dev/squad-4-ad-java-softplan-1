import { Formik } from "formik"
import { Form } from "semantic-ui-react"
import * as yup from "yup"
import { FormHelper } from "./_common/FormHelper"

export function Signup() {
  return (
    <>
      <div className="ui center aligned middle aligned grid" style={{ height: "100vh" }}>
        <div className="column" style={{ maxWidth: "450px" }}>
          <h2 className="ui center aligned header">Cadastrar</h2>
          <SignupForm />
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
  repeatPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match")
})

function SignupForm() {
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
              <Form.Input
                type="text"
                placeholder="Usuário"
                iconPosition="left"
                icon="user"
                {...h.bindInput("username")}
              />
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
