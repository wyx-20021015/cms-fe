import React from 'react'
import { Table, Menu, Dropdown, Button, Typography, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import avatarURL from '@/constants/avatarURL'
import {
  ProfileTwoTone,
  EditTwoTone,
  DeleteTwoTone,
  createFromIconfontCN,
  SettingFilled
} from '@ant-design/icons'
import Stu from '../../shared/stu'
import offsetParam from '@/shared/offsetParam'
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3761217_q4y2h0eurq8.js' // 在 iconfont.cn 上生成
})
const columns: ColumnsType<Stu> = [
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
type IProp = {
  stuData: Stu[]
  pageChange: (page: number, pageSize: number) => void
  params: offsetParam
  total: number | null | undefined
  openModal: (data: Stu, options: 'delete' | 'update' | 'detail') => void
}
const rowKey = (row: Stu) => {
  return row._id!
}
let openModal: (data: Stu, options: 'delete' | 'update' | 'detail') => void
const TableShow: React.FC<IProp> = (props) => {
  const { stuData, pageChange, params, total } = props
  openModal = props.openModal
  return (
    <Table
      columns={columns}
      dataSource={stuData}
      pagination={{
        onChange: pageChange,
        pageSize: params.limit ?? 6,
        current: params.offset,
        hideOnSinglePage: false,
        total: total!
      }}
      rowKey={(record) => rowKey(record)}
    />
  )
}
export default TableShow
