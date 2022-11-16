import wRequest from './wRequest'
import md5password from '@/utils/md5'
interface IProp {
  username: string
  password: string
}
const url = '/api/login'
const login = async ({ username, password }: IProp) => {
  password = md5password(password.trim())
  username = md5password(username.trim())
  return await wRequest.post<string>({ url, data: { username, password } })
}
const verifyAuth = async () => {
  return await wRequest.get<string>({ url })
}
const logout = async () => {
  return await wRequest.delete({ url })
}
export { login, verifyAuth, logout }
