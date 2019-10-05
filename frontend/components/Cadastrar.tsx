import Link from "next/link";
import * as yup from "yup";
import { Formik } from "formik";
import { FormHelper } from "./FormHelper";
import { Input, Segment, Form } from "semantic-ui-react";

export function Cadastrar() {
  return (
    <>
      <div
        className="ui center aligned middle aligned grid"
        style={{ height: "100vh" }}
      >
        <div className="column" style={{ maxWidth: "450px" }}>
          <h2 className="ui center aligned header">Cadastrar</h2>
          <CadastroForm />
          <Segment basic>
            <Link href="/">
              <a>Enviar</a>
            </Link>
          </Segment>
        </div>
      </div>
    </>
  );
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
    .oneOf([yup.ref("password"), null], "Passwords must match")
});

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
        const h = new FormHelper(ctrl);
        return (
          <form className="ui large form" onSubmit={ctrl.handleSubmit}>
            <div className="ui stacked segment">
              <Form.Field {...h.bindField("username")}>
                <Input
                  type="text"
                  placeholder="Usuário"
                  {...h.bindInput("username")}
                  iconPosition="left"
                  icon="user"
                />
                {h.errorMessage("username")}
              </Form.Field>
              <Form.Field {...h.bindField("password")}>
                <Input
                  type="password"
                  placeholder="Senha"
                  {...h.bindInput("password")}
                />
                {h.errorMessage("password")}
              </Form.Field>
              <Form.Field {...h.bindField("repeatPassword")}>
                <Input
                  type="password"
                  placeholder="Repetir senha"
                  {...h.bindInput("repeatPassword")}
                />
                {h.errorMessage("repeatPassword")}
              </Form.Field>
              <button className="ui large fluid button" type="submit">
                Concluído
              </button>
            </div>
          </form>
        );
      }}
    />
  );
}
