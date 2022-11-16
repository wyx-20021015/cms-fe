type httpRes<T = any> = {
  data: T
  success: Boolean
  msg: string
}
export default httpRes
