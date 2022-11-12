/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import User from '../../shared/user'
import majors from '@/shared/majors'
import grades from '@/shared/grades'
import {
  Card,
  Table,
  Space,
  Button,
  Modal,
  Form,
  Select,
  Input,
  Radio,
  Dropdown,
  Typography,
  MenuProps,
  Menu
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import FormValue from '@/shared/FormValue'
import {
  deleteUser,
  fetchUser,
  searchUser,
  updateUser
} from '../../service/index'
import avatarURL from '@/constants/avatarURL'
import Token from '@/utils/token'
import './index.scss'
import {
  SettingFilled,
  createFromIconfontCN,
  EditTwoTone,
  ProfileTwoTone,
  DeleteTwoTone
} from '@ant-design/icons'

const { Option } = Select
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3761217_q4y2h0eurq8.js' // 在 iconfont.cn 上生成
})
function UserAdmin() {
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('Content of the modal')
  const [isEditable, setIsEditable] = useState(false)
  const [currUser, setCurrUser] = useState<User | null>(null)
  const [params, setParams] = useState({
    offset: 1,
    limit: 6
  })
  const [showedData, setShowedData] = useState<User[]>([])
  const [userData, setUserData] = useState<User[]>([])
  const [option, setOption] = useState('')
  useEffect(() => {
    const loadList = async () => {
      const res = await fetchUser()
      console.log(res.data)
      setUserData(res.data)
    }
    loadList().catch((e) => console.log(e))
  }, [])
  useEffect(() => {
    const first = (params.offset - 1) * params.limit
    const last = first + params.limit
    setShowedData(userData.slice(first, last))
  }, [userData, params])
  const pageChange = (offset: number, limit: number) => {
    setParams({
      limit,
      offset
    })
  }
  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }
  const handleOk = async () => {
    setModalText('操作中,请勿离开...')
    setConfirmLoading(true)
    switch (option) {
      case 'delete':
        await deleteUser(currUser?._id)
        setConfirmLoading(false)
        setOpen(false)
        setUserData(userData.filter((t) => t._id !== currUser?._id))
        break
      case 'update':
        setConfirmLoading(false)
        setOpen(false)
        setIsEditable(true)
        break
      case 'detail':
        nav(`/detail/${currUser?._id ?? 'none'}`)
        break
    }
  }

  const desc = {
    delete: '删除',
    update: '修改',
    detail: '查看'
  }

  const openModal = (data: User, options: 'delete' | 'update' | 'detail') => {
    setOption(options)
    setCurrUser(data)
    const descript = desc[options]
    setModalText(`确认${descript} ${data.name}?`)
    setOpen(true)
  }

  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (src) => (
        <img
          src={`${avatarURL}/${src as string}?token=${Token.getToken()!}`}
          className="avatar"
        ></img>
      )
    },
    {
      title: 'Major',
      dataIndex: 'major',
      key: 'major'
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade'
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      key: 'sex',
      render: (sex: string) => {
        return sex === 'female' ? (
          <MyIcon type="icon-female" className="sex-icon"></MyIcon>
        ) : (
          <MyIcon type="icon-male" className="sex-icon"></MyIcon>
        )
      }
    },
    {
      title: 'Phone number',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Dropdown
            arrow={false}
            placement={'bottom'}
            trigger={['click']}
            overlay={() => {
              return (
                <Menu>
                  <Menu.Item key="1">
                    <Button
                      icon={<ProfileTwoTone />}
                      onClick={() => openModal(data, 'detail')}
                    >
                      详细
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Button
                      icon={<EditTwoTone />}
                      onClick={() => openModal(data, 'update')}
                    >
                      修改
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Button
                      icon={<DeleteTwoTone />}
                      onClick={() => openModal(data, 'delete')}
                    >
                      删除
                    </Button>
                  </Menu.Item>
                </Menu>
              )
            }}
          >
            <Typography.Link>
              <Space>
                <SettingFilled className="icon" />
              </Space>
            </Typography.Link>
          </Dropdown>
        )
      },
      fixed: 'right'
    }
  ]
  const rowKey = (row: User) => {
    return row._id!
  }

  const onFinished = async (value: FormValue) => {
    const { grade, name, sex, major } = value
    const res = await searchUser({ grade, name, sex, major })
    setUserData(res.data)
  }
  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确认"
      >
        <p>{modalText}</p>
      </Modal>
      <Modal open={isEditable} title="编辑用户" destroyOnClose={true}>
        <Form
          preserve={false}
          autoComplete="off"
          validateTrigger={['onChange']}
        >
          <Form.Item
            name={`name`}
            rules={[{ required: true, message: 'Please input username!' }]}
          >
            <Input placeholder="编辑姓名"></Input>
          </Form.Item>
          <Form.Item name={`major`}>
            <Select placeholder="请选择专业">
              {majors.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={`grade`}>
            <Select placeholder="请选择年级">
              {majors.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={`name`}>
            <Radio.Group>
              <Radio value={'male'}>男</Radio>
              <Radio value={'female'}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name={`name`}
            rules={[
              { required: true, message: 'Please input phone number!' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: 'please input correct phone number!',
                validateTrigger: 'onChange'
              }
            ]}
          >
            <Input placeholder="编辑电话号码"></Input>
          </Form.Item>
          <Form.Item
            name={`name`}
            rules={[
              { required: true, message: 'Please input email!' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: 'please input correct phone number!',
                validateTrigger: 'onChange'
              }
            ]}
          >
            <Input placeholder="编辑电子邮箱"></Input>
          </Form.Item>
        </Form>
      </Modal>
      <Card className="card">
        <Form initialValues={{ sex: '' }} onFinish={onFinished}>
          <Form.Item
            label="年级"
            name="grade"
            style={{ display: 'inline-flex' }}
          >
            <Select
              placeholder="请选择想要筛选的年级"
              style={{ width: 120 }}
              allowClear
            >
              {grades.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="专业"
            name="major"
            style={{ display: 'inline-flex', marginLeft: '40px' }}
          >
            <Select
              placeholder="请选择想要筛选的专业"
              style={{ width: 200 }}
              allowClear
            >
              {majors.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
            style={{ display: 'inline-flex', marginLeft: '40px' }}
          >
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={'male'}>男</Radio>
              <Radio value={'female'}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="姓名"
            name="name"
            style={{ display: 'inline-flex', marginLeft: '40px' }}
          >
            <Input placeholder="搜索姓名，支持模糊匹配" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>

        <Table
          columns={columns}
          dataSource={showedData}
          pagination={{
            onChange: pageChange,
            pageSize: params.limit ?? 6,
            current: params.offset,
            hideOnSinglePage: false,
            total: userData.length
          }}
          rowKey={(record) => rowKey(record)}
        />
      </Card>
    </>
  )
}
export default UserAdmin
