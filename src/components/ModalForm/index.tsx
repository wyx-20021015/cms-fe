import React from 'react'
import {
  Form,
  Modal,
  Input,
  Upload,
  Avatar,
  Button,
  Select,
  Radio,
  message
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd/es/upload/interface'
import majors from '@/shared/majors'
import avatarURL from '@/constants/avatarURL'
import uploadURL from '@/constants/uploadURL'
import Stu from '@/shared/stu'
import grades from '@/shared/grades'
const { Option } = Select
interface IProp {
  subMitEdit: (name: any, value: any) => Promise<void>
  handleOk: () => Promise<void>
  isEditable: boolean
  handleCancel: () => void
  currStu: Stu | null
  form: any
  option:
    | 'editing'
    | 'delete'
    | 'update'
    | 'detail'
    | 'create'
    | null
    | undefined
}
const getValueFromUpload = (args: any) => {
  return args.fileList[0]?.response?.data ?? ' '
}
const uploadProps: UploadProps = {
  name: 'avatar',
  action: uploadURL,
  accept: 'image/*',
  withCredentials: true,
  onChange: async (info: any) => {
    if (info.file.status === 'done') {
      await message.success(`file uploaded successfully`)
    } else if (info.file.status === 'error') {
      await message.error(` file upload failed.`)
    }
  }
}
const MyComponent: React.FC<IProp> = (props) => {
  const {
    subMitEdit,
    handleOk,
    isEditable,
    handleCancel,
    currStu,
    form,
    option
  } = props
  return (
    <Form.Provider onFormFinish={subMitEdit}>
      <Modal
        forceRender
        open={isEditable}
        title="编辑用户"
        destroyOnClose={true}
        okText="确认"
        cancelText="取消"
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
            name: currStu?.name,
            sex: currStu?.sex,
            major: currStu?.major,
            grade: currStu?.grade,
            phone: currStu?.phone,
            email: currStu?.email
          }}
        >
          <Form.Item
            name={`name`}
            label="姓名"
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <Input placeholder="编辑姓名"></Input>
          </Form.Item>
          <Form.Item
            name={`avatar`}
            label="头像"
            rules={[{ required: true, message: 'avatar is required' }]}
            getValueFromEvent={getValueFromUpload}
            initialValue={currStu?.avatar ?? ''}
          >
            <Upload {...uploadProps}>
              {option === 'editing' && (
                <Avatar
                  src={`${avatarURL}/${currStu?.avatar ?? ''}`}
                  style={{ marginRight: '40px' }}
                ></Avatar>
              )}

              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name={`major`}
            label="专业"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select placeholder="请选择专业">
              {majors.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={`grade`}
            label="年级"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select placeholder="请选择年级">
              {grades.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={`sex`}
            label="性别"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Radio.Group>
              <Radio value={'male'}>男</Radio>
              <Radio value={'female'}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name={`phone`}
            label="电话"
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
            name={`email`}
            label="邮箱"
            rules={[
              { required: true, message: 'Please input email!' },
              {
                pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                message: 'please input correct phone email!',
                validateTrigger: 'onChange'
              }
            ]}
          >
            <Input placeholder="编辑电子邮箱"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </Form.Provider>
  )
}

export default MyComponent
