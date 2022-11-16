import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import BASE_URL from '../constants/baseURL'
import httpRes from '../shared/httpRes'
// import Token from '../utils/token'
// import { isString } from '../@types/typeGuards'
// const { getToken } = Token
class WRequest {
  private readonly instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 5000
    })
    this.instance.defaults.withCredentials = true
  }

  async request<T>(config: AxiosRequestConfig): Promise<httpRes<T>> {
    return await new Promise<any>((resolve, reject) => {
      this.instance.interceptors.request.use(
        (config) => {
          // const token = getToken()
          // if (isString(token)) config.headers!.Authorization = `Bearer ${token}`
          return config
        },
        (err) => {
          console.error(err)
          return err
        }
      )
      this.instance
        .request(config)
        .then((res: AxiosResponse<httpRes<T>>) => {
          if (res.data.success !== true) {
            alert(res.data.msg)
            resolve({ ...res.data, data: null })
          } else {
            resolve(res.data)
          }
        })
        .catch((err: AxiosError) => {
          console.error(err)
          resolve({
            data: null,
            status: 400,
            msg: '出错',
            success: false
          })
        })
        .finally(() => {
          // console.log(`end of request`)
        })
    })
  }

  async get<T>(config: AxiosRequestConfig): Promise<httpRes<T>> {
    return await this.request({ ...config, method: 'GET' })
  }

  async post<T>(config: AxiosRequestConfig): Promise<httpRes<T>> {
    return await this.request({ ...config, method: 'POST' })
  }

  async patch<T>(config: AxiosRequestConfig): Promise<httpRes<T>> {
    return await this.request({ ...config, method: 'PATCH' })
  }

  async delete<T>(config: AxiosRequestConfig): Promise<httpRes<T>> {
    return await this.request({ ...config, method: 'DELETE' })
  }
}
const wRequest = new WRequest()
export default wRequest
