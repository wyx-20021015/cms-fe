import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Breadcrumb, Card, Avatar } from 'antd'
import { fetchStuById } from '../../service'
import Stu from '../../shared/stu'
import avatarURL from '@/constants/avatarURL'

function Detail(props: any) {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const [currStu, setCurrStu] = useState<Stu | null>(null)
  useEffect(() => {
    const loadData = async () => {
      const res = await fetchStuById(id)
      setCurrStu(res.data)
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
      <Card title={`${currStu?.name ?? ''}`}>
        <Card title={`姓名`} type="inner">
          {currStu?.name}
        </Card>
        <Card title={`头像`} type="inner">
          {/* <Avatar src={currStu?.avatar}></Avatar> */}
          <Avatar src={`${avatarURL}/${currStu?.avatar ?? ''}`} />
        </Card>
        <Card title={`专业`} type="inner">
          {currStu?.major}
        </Card>
        <Card title={`年级`} type="inner">
          {currStu?.grade}
        </Card>
        <Card title={`性别`} type="inner">
          {currStu?.sex}
        </Card>
        <Card title={`邮箱`} type="inner">
          {currStu?.email}
        </Card>
      </Card>
    </>
  )
}
export default Detail
