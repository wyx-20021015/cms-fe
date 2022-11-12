type httpRes<T = any> = {
  data: T
  success: Boolean
  msg: string
  status: number
}
export default httpRes
