import { Navigate } from 'react-router-dom'
import React, { FC, useEffect, useState } from 'react'

import PropsWithChildren from '../@types/PropsWithChildren'
import useAppDispatch from '@/store/useAppDispatch'
import useAppSelector from '@/store/useAppSelector'
import { setLoginStatus } from '@/store/login.store'
import { verifyAuth } from '@/service'

const AuthRouter: FC<PropsWithChildren> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<Boolean | null>(null)
  const loginStatus = useAppSelector((state) => state.login.isLogin)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const w = async () => {
      const res = await verifyAuth()
      setIsLogin(res.success)
      if (res.success === true) {
        dispatch(setLoginStatus({ isLogin: res.success, username: res.data }))
      }
    }
    if (loginStatus !== true)
      w().catch((e) => {
        console.error(e)
      })
    else setIsLogin(loginStatus)
  }, [])
  return isLogin === true ? (
    <>{children}</>
  ) : isLogin === false ? (
    <Navigate to="/login" replace></Navigate>
  ) : (
    <>loading...</>
  )
}
export default AuthRouter
