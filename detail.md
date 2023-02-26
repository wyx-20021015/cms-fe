## 配置别名

在tsconfig.json中

```ts
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
  }
```

craco.config.js

```js
const path = require('path')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    }
  }
}

```

## 封装md组件

```tsx
const MdViewer: React.FC<IProps> = (props: IProps) => {
  const { textContent } = props
  return (
    <div className="md-viewer">
      <ReactMarkdown>{textContent}</ReactMarkdown>
    </div>
  )
}
```

readctMarkdown库帮助把markdown解析成标签，再自己写一些样式。

## 登录、鉴权流程

### 登录

一个居中的表单。使用antd的Input组件，对输入进行校验。

用户输入完毕点击登陆时，发起一个请求。如果收到success，表明密码正确，在全局状态中保存登录状态，然后路由到主页。

### 鉴权

需要鉴权的页面都包裹在一个```<AuthRouter>```里面，AuthRouter干的事情是去拿全局状态中的登录状态。如果拿不到就发起一个鉴权请求，看看是不是已有保存的正确的session，如果没有则路由到登录页面，有则呈现```AuthRouter```里面的页面

## 人员管理流程

### 重要组件

#### ConfirmModal

在每次操作前，都需要弹出一次确认框以防止误触。ConfirmModal可以弹出确认框，并在点击确认时根据不同操作调起函数。

#### ModalForm

在新建用户和修改学生时，需要一个弹出框，内容为包含所有学生信息类目的表单，需要注意新建用户时表单没有初值，修改学生时要赋该学生的原值。

#### searchForm

搜索功能可以筛选除了邮箱和号码之外的所有字段，searchForm就是这个表单。如果有某个字段值为空，默认会搜索满足其它条件下该字段的全部结果。

#### TableShow

展示数据的表格，主要使用antd的Table组件，除了要展示学生的所有字段外，还要一列来进行操作。悬浮在操作的按钮上时，按钮会旋转，给良好的交互体验；点击操作按钮时，会打开ModalForm。还有一个分页器，监听页数的改变并在useEffect里发起请求。

### 分页流程

设置一个对象param，包括每页呈现的行数和当前页数。

将param添加到useEffect的依赖项。

当分页器切换页数或者每页个数，发起请求，并更新 showData，showData即是Table的dataSource，真正展示的数据。

## 404页

在路由的最后添加```<Route path="/*" element={<Notfound />} />```,即可将没有匹配到的路由全部输出到notfound页面