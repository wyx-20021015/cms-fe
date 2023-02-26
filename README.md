**本项目的[后端地址](https://github.com/wyx-20021015/cms-be)**

# 结课作业

## 安装与运行

项目运行之前，请确保系统已经安装以下应用

- node (6.0 及以上版本)

### 运行命令

```
git clone https://git.kscampus.io:10443/hust-2022-web-tasks/wangyixuan.git
cd final/fe

npm install

#development
npm run start

#production
npm run build
```

### 关于开发环境

1.**用户名wyx ,密码wyx123**

2.虽然后端配置了跨域，也可以跨域发送非session的请求，但是仍然无法跨域设置session，这个问题试了网上的大部分方法仍然无法解决。开发环境下在```package.json```配置了代理。

### 关于生产环境

如上所述，跨域设置session的问题无法解决。所以生产环境下前端打包到后端，并起一个static server，<br>**请用```${后端的主机+端口}/index.html```访问**

### 登录密码

用户名 wyx <br>
密码 wyx123

## 技术特点

- react+react-router+redux
- TypeScript
- antd
- scss
- 封装 ts 友好的 axios
- markdown 预览
- prettier+eslint

## 其它

见本目录下的'detail.md'
