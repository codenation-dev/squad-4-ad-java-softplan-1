import { FormikProps } from "formik"
export class FormHelper<Values extends {}> {
  constructor(public ctrl: FormikProps<Values>) {}
  bind(field: keyof Values) {
    const hasError = Boolean(this.ctrl.errors[field])
    return {
      name: field,
      id: field,
      value: this.ctrl.values[field],
      onChange: ev => this.ctrl.handleChange,
      onBlur: ev => this.ctrl.handleBlur,
      error: hasError
    }
  }
}
