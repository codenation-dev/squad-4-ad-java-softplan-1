import { FormikProps } from "formik"
export class FormHelper<Values extends {}> {
  constructor(public ctrl: FormikProps<Values>) {}

  bindInput(field: keyof Values) {
    return {
      name: field,
      id: field,
      value: this.ctrl.values[field],
      onChange: ev => this.ctrl.handleChange(ev),
      onBlur: ev => this.ctrl.handleBlur(ev),
      error: (this.ctrl.touched[field] && this.ctrl.errors[field]) || undefined
    }
  }
}

const errorMessageStyle = {
  textAlign: "left",
  color: "red"
} as const
