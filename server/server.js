const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser') // 处理post过来的参数
const session = require('express-session') // 保存session

const favicon = require('serve-favicon') // 解决favicon的问题

const serverRender = require('./util/server-render')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

// 处理faveicon请求
app.use(favicon(path.join(__dirname, '../favicon.ico')))

// 处理session
app.use(session({
  maxAge: 10 * 60 * 1000, // 设置session过期时间
  name: 'tid',
  resave: false, // 是否每次都要生成一个cookie
  saveUninitialized: false,
  secret: 'xuyifei' // 加密cookie
}))

// 下面的两步会处理请求发送的数据 转化为json格式  然后存储到req.body
app.use(bodyParser.json()) // 处理json格式的数据
app.use(bodyParser.urlencoded({ extended: false })) // 处理form表单的一些数据

// 拦截cnode的api请求

app.use('/api/user', require('./util/handle-login'))

app.use('/api', require('./util/proxy'))

if (!isDev) { // 正式环境
  const serverEntry = require('../dist/server-entry')
  const template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', (req, res, next) => {
    serverRender(serverEntry, template, req, res).catch(next)
  })
} else { // 开发环境
  const devStatic = require('./util/dev-static')
  devStatic(app)
}
app.use(function (error, req, res, next) {
  console.log(error)
  res.status(500).send(error)
})
app.listen(3333, () => {
  console.log('server is listen 3333')
})
