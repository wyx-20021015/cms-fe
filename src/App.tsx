import * as React from 'react'
import 'antd/dist/antd.min.css'

import Login from './pages/login'
import Layout from './pages/layout'
import About from './pages/about'
import UserAdmin from './pages/userAdmin'
import AuthRouter from './components/AuthRouter'
import Detail from '@/pages/detail'
import Notfound from '@/pages/notfound/notfound'

import { HashRouter, Route, Routes } from 'react-router-dom'

function App(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <AuthRouter>
              <Layout />
            </AuthRouter>
          }
        >
          <Route index element={<UserAdmin />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="detail/*" element={<Detail />}></Route>
        </Route>
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </HashRouter>
  )
}

export default App
