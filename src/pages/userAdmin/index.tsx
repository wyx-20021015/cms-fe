/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import User from '../../shared/user'
import majors from '@/shared/majors'
import grades from '@/shared/grades'
import offsetParam from '@/shared/offsetParam'
import type { FormInstance } from 'antd/es/form'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
import {
  Card,
  Upload,
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
  Menu,
  message,
  Avatar
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import FormValue from '@/shared/FormValue'
import {
  createUser,
  deleteUser,
  searchUser,
  updateUser
} from '../../service/index'
import avatarURL from '@/constants/avatarURL'
// import Token from '@/utils/token'
import './index.scss'
import {
  SettingFilled,
  createFromIconfontCN,
  EditTwoTone,
  ProfileTwoTone,
  DeleteTwoTone,
  UploadOutlined
} from '@ant-design/icons'

const { Option } = Select
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3761217_q4y2h0eurq8.js' // ε¨ iconfont.cn δΈηζ
})
function UserAdmin() {
  const nav = useNavigate()

  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('Content of the modal')
  const [isEditable, setIsEditable] = useState(false)
  const [searchInfo, setSearchInfo] = useState<FormValue | null>()
  const [currUser, setCurrUser] = useState<User | null>(null)
  const [params, setParams] = useState({
    offset: 1,
    limit: 6
  })
  const [total, setTotal] = useState<number | null>()
  const [userData, setUserData] = useState<User[]>([])
  const [option, setOption] = useState<
    'editing' | 'delete' | 'update' | 'detail' | 'create' | null
  >()
  useEffect(() => {
    loadData().catch((e) => console.log(e))
  }, [params, searchInfo])
  const pageChange = (offset: number, limit: number) => {
    setParams({
      limit,
      offset
    })
  }
  const handleCancel = () => {
    // console.log('Clicked cancel button')
    setOpen(false)
    setIsEditable(false)
    setCurrUser(null)
  }
  const handleOk = async () => {
    let res
    setModalText('ζδ½δΈ­,θ―·εΏη¦»εΌ...')
    setConfirmLoading(true)
    switch (option) {
      case 'delete':
        res = await deleteUser(currUser?._id)
        setConfirmLoading(false)
        setOpen(false)
        if (res.success === true) {
          await message.success('ζεε ι€')
          await loadData()
        } else await message.error('ε ι€ε€±θ΄₯')
        break
      case 'update':
        setConfirmLoading(false)
        setOpen(false)
        setIsEditable(true)
        setOption('editing')
        break
      case 'detail':
        nav(`/detail/${currUser?._id ?? 'none'}`)
        break
      case 'editing':
        form.submit()
        break
      case 'create':
        form.submit()
        break
      default:
        break
    }
    // setCurrUser(null)
  }

  const desc = {
    delete: 'ε ι€',
    update: 'δΏ?ζΉ',
    detail: 'ζ₯η',
    create: 'ζ°ε»Ί'
  }

  const [descript, setDescript] = useState<string | null>()

  const openModal = (data: User, options: 'delete' | 'update' | 'detail') => {
    setDescript(desc[options])
    setOption(options)
    setCurrUser(data)
  }
  useEffect(() => {
    if (currUser !== null && descript !== null) {
      form.resetFields()
      setModalText(`η‘?θ?€${descript!} ${currUser?.name ?? ''}`)
      // console.log(currUser)
      setOpen(true)
    }
  }, [currUser, descript])

  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 170,
      render: (text) => <a>{text}</a>
    },
    {
      title: 'avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (src) => (
        <img src={`${avatarURL}/${src as string}`} className="avatar"></img>
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
      key: 'email',
      width: 200
    },
    {
      title: 'ζδ½',
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
                      θ―¦η»
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Button
                      icon={<EditTwoTone />}
                      onClick={() => openModal(data, 'update')}
                    >
                      δΏ?ζΉ
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Button
                      icon={<DeleteTwoTone />}
                      onClick={() => openModal(data, 'delete')}
                    >
                      ε ι€
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
    setParams({ ...params, offset: 1 })
    setSearchInfo(value)
  }

  const loadData = async () => {
    const res = await searchUser({ ...params, ...searchInfo })
    // console.log('search res', res.data.data)
    setUserData(res.data.data)
    setTotal(res.data.count)
  }

  const subMitEdit = async (name: any, value: any) => {
    console.log(value.values, 'submit****')
    let res
    if (option === 'create') {
      // console.log('εε»Ίζ°η¨ζ·', { ...value.values })
      res = await createUser({ ...value.values })
      setCurrUser(null)
      form.resetFields()
      if (res.success === true) {
        setConfirmLoading(false)
        setIsEditable(false)
        await message.success('εε»Ίζε')
        await loadData()
      } else {
        await message.error('εε»Ίε€±θ΄₯δΊ')
        setConfirmLoading(false)
      }
    } else {
      res = await updateUser({ ...value.values, _id: currUser?._id })
      setCurrUser(null)
      form.resetFields()
      if (res.success === true) {
        setConfirmLoading(false)
        setIsEditable(false)
        await message.success('ζ΄ζ°ζε')
        await loadData()
      } else {
        await message.error('ζ΄ζ°ε€±θ΄₯δΊ')
        setConfirmLoading(false)
      }
    }
  }

  const [form] = Form.useForm()

  const newStudent = () => {
    setCurrUser(null)
    setOption('create')
    setIsEditable(true)
    setConfirmLoading(false)
  }

  const uploadProps: UploadProps = {
    name: 'avatar',
    action: 'http://localhost:8000/upload',
    // headers: {
    //   authorization: 'authorization-text'
    // },
    accept: 'image/*',
    withCredentials: true,
    onChange: async (info: any) => {
      if (info.file.status === 'done') {
        const cUser = currUser
        const avatar = info.file.response.data as string
        console.log(avatar)
        await message.success(`file uploaded successfully`)
      } else if (info.file.status === 'error') {
        await message.error(` file upload failed.`)
      }
    }
  }

  const getValueFromUpload = (args: any) => {
    console.log(args, 'getvalueε¦ε¦')
    return args.fileList[0]?.response?.data ?? ' '
  }

  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText="εζΆ"
        okText="η‘?θ?€"
      >
        <p>{modalText}</p>
      </Modal>
      <Form.Provider onFormFinish={subMitEdit}>
        <Modal
          forceRender
          open={isEditable}
          title="ηΌθΎη¨ζ·"
          destroyOnClose={true}
          okText="η‘?θ?€"
          cancelText="εζΆ"
          onOk={handleOk}
          onCancel={handleCancel}
          afterClose={() => {
            form.resetFields()
          }}
        >
          <Form
            form={form}
            name="edit-form"
            preserve={false}
            autoComplete="off"
            validateTrigger={['onChange']}
            initialValues={{
              name: currUser?.name,
              sex: currUser?.sex,
              major: currUser?.major,
              grade: currUser?.grade,
              phone: currUser?.phone,
              email: currUser?.email
            }}
          >
            <Form.Item
              name={`name`}
              label="ε§ε"
              rules={[{ required: true, message: 'Please input name!' }]}
            >
              <Input placeholder="ηΌθΎε§ε"></Input>
            </Form.Item>
            <Form.Item
              name={`avatar`}
              label="ε€΄ε"
              rules={[{ required: true, message: 'avatar is required' }]}
              getValueFromEvent={getValueFromUpload}
              initialValue={currUser?.avatar ?? ''}
            >
              <Upload {...uploadProps}>
                {option !== 'create' && (
                  <Avatar
                    src={`${avatarURL}/${currUser?.avatar ?? ''}`}
                    style={{ marginRight: '40px' }}
                  ></Avatar>
                )}

                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name={`major`}
              label="δΈδΈ"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Select placeholder="θ―·ιζ©δΈδΈ">
                {majors.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={`grade`}
              label="εΉ΄ηΊ§"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Select placeholder="θ―·ιζ©εΉ΄ηΊ§">
                {grades.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={`sex`}
              label="ζ§ε«"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Radio.Group>
                <Radio value={'male'}>η·</Radio>
                <Radio value={'female'}>ε₯³</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name={`phone`}
              label="η΅θ―"
              rules={[
                { required: true, message: 'Please input phone number!' },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: 'please input correct phone number!',
                  validateTrigger: 'onChange'
                }
              ]}
            >
              <Input placeholder="ηΌθΎη΅θ―ε·η "></Input>
            </Form.Item>
            <Form.Item
              name={`email`}
              label="ι?η?±"
              rules={[
                { required: true, message: 'Please input email!' },
                {
                  pattern: /^(.*)@(.*).(.*)$/,
                  message: 'please input correct phone email!',
                  validateTrigger: 'onChange'
                }
              ]}
            >
              <Input placeholder="ηΌθΎη΅ε­ι?η?±"></Input>
            </Form.Item>
          </Form>
        </Modal>
      </Form.Provider>

      <Card className="card">
        <Form initialValues={{ sex: '' }} onFinish={onFinished}>
          <Form.Item
            label="εΉ΄ηΊ§"
            name="grade"
            style={{ display: 'inline-flex' }}
          >
            <Select
              placeholder="θ―·ιζ©ζ³θ¦η­ιηεΉ΄ηΊ§"
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
            label="δΈδΈ"
            name="major"
            style={{ display: 'inline-flex', marginLeft: '40px' }}
          >
            <Select
              placeholder="θ―·ιζ©ζ³θ¦η­ιηδΈδΈ"
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
            label="ζ§ε«"
            name="sex"
            style={{ display: 'inline-flex', marginLeft: '40px' }}
          >
            <Radio.Group>
              <Radio value={''}>ε¨ι¨</Radio>
              <Radio value={'male'}>η·</Radio>
              <Radio value={'female'}>ε₯³</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="ε§ε"
            name="name"
            style={{ display: 'inline-flex', marginLeft: '40px' }}
          >
            <Input placeholder="ζη΄’ε§εοΌζ―ζζ¨‘η³εΉι" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              η­ι
            </Button>
            <Button
              type="primary"
              style={{ marginLeft: 80 }}
              onClick={() => newStudent()}
            >
              ζ°ε»Ίη¨ζ·
            </Button>
          </Form.Item>
        </Form>

        <Table
          columns={columns}
          dataSource={userData}
          pagination={{
            onChange: pageChange,
            pageSize: params.limit ?? 6,
            current: params.offset,
            hideOnSinglePage: false,
            total: total!
          }}
          rowKey={(record) => rowKey(record)}
        />
      </Card>
    </>
  )
}
export default UserAdmin
