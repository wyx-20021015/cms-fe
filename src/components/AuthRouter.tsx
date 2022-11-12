import Token from '../utils/token'
import { Navigate } from 'react-router-dom'
import React, { FC } from 'react'

import PropsWithChildren from '../@types/PropsWithChildren'
import { isString } from '../@types/typeGuards'

const AuthRouter: FC<PropsWithChildren> = ({ children }) => {
  const token = Token.getToken()
  if (isString(token)) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace></Navigate>
  }
}
export default AuthRouter
