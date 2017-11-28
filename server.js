const express = require('express')
const path = require('path')
const forwardRequest = require('forward-request')
const {Nuxt, Builder} = require('nuxt')
const isProd = process.env.NODE_ENV === 'production'
const port = process.env.port || 3000
const app = express()

const resolve = file => path.resolve(__dirname, file)

// 用指定的配置对象实例化 Nuxt.js
let config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// 在开发模式下启用编译构建和热加载
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

let ipAddress = process.env.ADDRESS || 'ews.500.com'

// 请求转发
app.use((req, resp, next) => {
  if (req.originalUrl.indexOf('/ews') === 0) {
    forwardRequest({
      req,
      resp,
      host: 'ews.500.com',
      ip: ipAddress,
      // ip: '43.247.69.20',  预发布
      // ip: 'ews.500.com',  线上
      // ip: '10.0.1.31',  线下
      path: req.originalUrl.replace('/ews', '')
    })
  } else {
    next()
  }
})

// 静态服务
const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})
app.use('/dist', serve('./dist', true))

// 用 Nuxt.js 渲染每个路由
app.use(nuxt.render)

// 服务端监听
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
