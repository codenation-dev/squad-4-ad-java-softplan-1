import "toastr/toastr.scss"
import toast from "toastr"

export function showToast(type: "error" | "info" | "success" | "warning", message) {
  debugger
  console.log(message)
  toast[type](String(message))
}

// "curried"
export function showToastC(type: "error" | "info" | "success" | "warning") {
  return message => showToast(type, message)
}
