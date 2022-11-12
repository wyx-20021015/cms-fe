import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Breadcrumb, Card, Avatar } from 'antd'
import { fetchUserById } from '../../service'
import User from '../../shared/user'
import avatarURL from '@/constants/avatarURL'

function Detail(props: any) {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const [currUser, setCurrUser] = useState<User | null>(null)
  useEffect(() => {
    const loadData = async () => {
      const res = await fetchUserById(id)
      setCurrUser(res.data)
      console.log(res)
    }
    loadData().catch((e) => console.log(e))
  }, [])
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={'/'}>人员管理</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a>查看详细</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card title={`${currUser?.name ?? ''}`}>
        <Card title={`姓名`} type="inner">
          {currUser?.name}
        </Card>
        <Card title={`头像`} type="inner">
          {/* <Avatar src={currUser?.avatar}></Avatar> */}
          <Avatar src={`${avatarURL}/${currUser?.avatar ?? ''}`} />
        </Card>
        <Card title={`专业`} type="inner">
          {currUser?.major}
        </Card>
        <Card title={`年级`} type="inner">
          {currUser?.grade}
        </Card>
        <Card title={`性别`} type="inner">
          {currUser?.sex}
        </Card>
        <Card title={`邮箱`} type="inner">
          {currUser?.email}
        </Card>
      </Card>
    </>
  )
}
export default Detail
