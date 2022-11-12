// 封装ls存取token
import tokenKey from '../constants/tokenKey'

class Token {
  setToken(token: string) {
    console.log(token)
    return window.localStorage.setItem(tokenKey, token)
  }

  getToken() {
    return window.localStorage.getItem(tokenKey)
  }

  removeToken() {
    return window.localStorage.removeItem(tokenKey)
  }
}

const token = new Token()
export default token
