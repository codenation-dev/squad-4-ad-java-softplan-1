import "toastr/toastr.scss"
import toast from "toastr"

export function showToast(type: "error" | "info" | "success" | "warning", message) {
  toast[type](message)
}
