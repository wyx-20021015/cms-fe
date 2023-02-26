import React from 'react'
import './index.scss'
import { Card, Form, Input, Checkbox, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { login } from '../../service'
import { setLoginStatus } from '@/store/login.store'
import useAppDispatch from '@/store/useAppDispatch'
interface FormPorp {
  username: string
  password: string
}
function Login() {
  const navigate = useNavigate()
  const dispath = useAppDispatch()
  async function onFinish(values: FormPorp) {
    // values：放置的是所有表单项中用户输入的内容
    // todo:登录
    const { username, password } = values
    const res = await login({ username, password })
    // 跳转首页
    if (res.success === true) {
      dispath(setLoginStatus({ username: res.data, isLogin: true }))
      navigate('/', { replace: true })
      await message.success('登录成功')
    } else {
      await message.error('登录失败')
    }
    // 提示用户
  }

  return (
    <div className="login">
      <Card className="login-container">
        {/* 登录表单 */}
        {/* 子项用到的触发事件 需要在Form中都声明一下才可以 */}
        <Form
          validateTrigger={['onBlur', 'onChange']}
          initialValues={{
            remember: false
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '用户名必填'
              }
            ]}
          >
            <Input size="large" placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码'
              },
              {
                max: 18,
                message: '密码应在6-18位',
                validateTrigger: 'onChange'
              },
              {
                min: 6,
                message: '密码应在6-18位',
                validateTrigger: 'onChange'
              }
            ]}
          >
            <Input.Password size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            rules={[
              {
                pattern: /^true$/,
                message: "请勾选'我已阅读并同意「用户协议」和「隐私条款」'"
              }
            ]}
          >
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

// export default observer(Login)
export default Login
