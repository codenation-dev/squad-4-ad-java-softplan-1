import { useFormik, yupToFormErrors } from "formik"
import * as yup from "yup"
import { Message, Form, Button } from "semantic-ui-react"
import { useState } from "react"
import { FormHelper } from "../_common/FormHelper"
import { formatError } from "../_common/formatError"
import { patchUserSelfUsingPATCH } from "../_api/swagger/modules/Users"
import { showToast } from "../_common/ToastService"

const userSchema = yup.object({
  displayName: yup.string(),
  password: yup.string(),
  passwordRepeat: yup.string().oneOf([yup.ref("password"), null], "Senhas devem coincidir")
})

export function UserSettingsColumn() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const bag = useFormik({
    initialValues: {
      displayName: "",
      password: "",
      repeatPassWord: ""
    },
    validationSchema: userSchema,
    onSubmit: async (values, bag) => {
      try {
        let toSend = {
          displayName: values.displayName || undefined,
          password: values.password || undefined
        }
        setLoading(true)
        await patchUserSelfUsingPATCH({
          body: toSend
        })
        setLoading(false)
        showToast("success", "Usuário alterado com sucesso!")
        bag.resetForm()
      } catch (err) {
        setLoading(false)
        console.log(err)
        setError(formatError(err))
      }
    }
  })

  const h = new FormHelper(bag)

  return (
    <div className="_userSettings">
      <h3 className="ui header" style={{ height: "36px" }}>
        Dados de usuário
      </h3>
      <form className="ui form" onSubmit={bag.handleSubmit}>
        {error && <Message negative>{error}</Message>}
        <Form.Input
          type="text"
          placeholder="Nome de exibição"
          iconPosition="left"
          icon="user"
          {...h.bindInput("displayName")}
        ></Form.Input>
        <Form.Input
          type="password"
          iconPosition="left"
          placeholder="Alterar senha"
          icon="lock"
          {...h.bindInput("password")}
        ></Form.Input>
        <Form.Input
          type="password"
          iconPosition="left"
          placeholder="Repetir senha"
          icon="lock"
          {...h.bindInput("repeatPassWord")}
        />
        <Button large fluid loading={loading}>
          Alterar
        </Button>
      </form>
    </div>
  )
}
