import { FormikProps } from "formik";
export class FormHelper<Values extends {}> {
  constructor(public ctrl: FormikProps<Values>) {}

  bindInput(field: keyof Values) {
    return {
      name: field,
      id: field,
      value: this.ctrl.values[field],
      onChange: ev => this.ctrl.handleChange(ev),
      onBlur: ev => this.ctrl.handleBlur(ev)
    };
  }

  bindField(field: keyof Values) {
    const hasError = Boolean(this.ctrl.errors[field]);
    console.log(hasError);
    return {
      error: hasError
    };
  }

  errorMessage(field: keyof Values) {
    const error = this.ctrl.errors[field];
    return error ? <div>{error}</div> : null;
  }
}
