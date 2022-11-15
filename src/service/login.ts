import wRequest from './wRequest'
interface IProp {
  username: string
  password: string
}
const url = '/login'
const login = async (data: IProp) => {
  return await wRequest.post<string>({ url, data })
}
const verifyAuth = async () => {
  return await wRequest.get<string>({ url })
}
const logout = async () => {
  return await wRequest.delete({ url })
}
export { login, verifyAuth, logout }
