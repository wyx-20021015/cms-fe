import {
  HomeOutlined,
  DiffOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons'
import { Layout, Menu, Popconfirm, MenuProps, message } from 'antd'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import './index.scss'
import { setLoginStatus } from '@/store/login.store'
import useAppDispatch from '@/store/useAppDispatch'
import useAppSelector from '@/store/useAppSelector'
import { logout } from '@/service'

const { Header, Sider, Content } = Layout

const items: MenuProps['items'] = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: <Link to="/">人员管理</Link>
  },
  {
    key: '/about',
    icon: <DiffOutlined />,
    label: <Link to="/about">关于</Link>,
    children: [
      {
        key: '/about/fe',
        // icon: <DiffOutlined />,
        label: <div>fe</div>,
        children: [
          {
            key: '/about?path=path=/about/fe/README.md',
            label: (
              <Link
                to={{
                  pathname: `/about`,
                  search: 'path=/about/fe/README.md'
                }}
              >
                README
              </Link>
            )
          },
          {
            key: '/about?path=/about/fe/detail.md',
            label: <Link to="/about?path=/about/fe/detail.md">实现细节</Link>
          }
        ]
      },
      {
        key: '/about/be',
        // icon: <DiffOutlined />,
        label: <div>be</div>,
        children: [
          {
            key: '/about?path=/about/be/README.md',
            label: <Link to="/about?path=/about/be/README.md">README</Link>
          },
          {
            key: '/about?path=/about/be/detail.md',
            label: <Link to="/about?path=/about/be/detail.md">实现细节</Link>
          }
        ]
      }
    ]
  }
]

const LayOut = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const username = useAppSelector((state) => state.login.username)
  const [collapsed, setCollapsed] = useState(false)
  const path = useLocation().pathname + useLocation().search
  const onConfirm = async (value: any) => {
    dispatch(setLoginStatus({ isLogin: false, username: '加载中..' }))
    const res = await logout()
    if (res.success === true) {
      navigate('/login')
      await message.success('登出成功')
      return
    }
    await message.error('登出失败!')
  }
  const [current, setCurrent] = useState(path)
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={onClick}
          items={items}
          selectedKeys={[current]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed)
            }
          )}
          <span className="login-info">
            <span className="user-logout">
              <Popconfirm
                onConfirm={onConfirm}
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                title="是否确认退出？"
                okText="退出"
                cancelText="取消"
              >
                <LogoutOutlined style={{ marginLeft: '30px' }} /> 退出
              </Popconfirm>
            </span>
            <span className="user-info">{username}</span>
          </span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayOut
