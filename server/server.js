const express = require('express')
const fs = require('fs')
const path = require('path')
const ReactSSR = require('react-dom/server')
const favicon = require('serve-favicon') // 解决favicon的问题
const isDev = process.env.NODE_ENV === 'development'

const app = express()
app.use(favicon(path.join(__dirname, '../favicon.ico')))

if (!isDev) { // 正式环境
  const serverEntry = require('../dist/server-entry').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', (req, res) => {
    const appString = ReactSSR.renderToString(serverEntry)
    template.replace('<!-- app -->', appString)
    res.send(template)
  })
} else { // 开发环境
  const devStatic = require('./util/dev-static')
  devStatic(app)
}

app.listen(3333, () => {
  console.log('server is listen 3333')
})
