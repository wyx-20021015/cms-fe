// import "./styles/index.scss";
import * as React from 'react'
import 'antd/dist/antd.min.css'

import Login from './pages/login'
import Layout from './pages/layout'
import About from './pages/about'
import UserAdmin from './pages/userAdmin'
import AuthRouter from './components/AuthRouter'
import Detail from '@/pages/detail'

import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes
} from 'react-router-dom'
import { History } from '@remix-run/router'
import history from './utils/history'

function App(): JSX.Element {
  return (
    <HistoryRouter history={history as unknown as History}>
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
      </Routes>
    </HistoryRouter>
  )
}

export default App
