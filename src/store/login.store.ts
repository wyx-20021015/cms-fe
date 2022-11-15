import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface loginStatus {
  isLogin: Boolean
  username: string
}
const initialState: loginStatus = {
  isLogin: false,
  username: '加载中..'
}
// true:登录,false:登录失败,null:未登录

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginStatus: (state, action: PayloadAction<loginStatus>) => {
      state.isLogin = action.payload.isLogin
      state.username = action.payload.username
    }
  }
})

export const {
  // doLogin,
  setLoginStatus
} = loginSlice.actions
