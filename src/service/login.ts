import wRequest from './wRequest'
interface IProp {
  username: string
  password: string
}
const url = '/login'
const login = async (data: IProp) => {
  return await wRequest.post<{ token: string }>({ url, data })
}
export { login }
