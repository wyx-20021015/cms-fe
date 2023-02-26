import { Form, Select, Radio, Button, Input } from 'antd'
import React, { FC } from 'react'
import FormValue from '@/shared/FormValue'
import grades from '@/shared/grades'
import majors from '@/shared/majors'
const { Option } = Select
type IProp = {
  onFinished: (value: FormValue) => Promise<void>
  newStudent: () => void
}

const SearchForm: FC<IProp> = (props) => {
  const { onFinished, newStudent } = props
  return (
    <Form initialValues={{ sex: '' }} onFinish={onFinished}>
      <Form.Item label="年级" name="grade" style={{ display: 'inline-flex' }}>
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
        <Button
          type="primary"
          style={{ marginLeft: 80 }}
          onClick={() => newStudent()}
        >
          新建用户
        </Button>
      </Form.Item>
    </Form>
  )
}
export default SearchForm
