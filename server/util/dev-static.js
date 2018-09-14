// 开发环境打包的文件都在内存中
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')
const serverConfig = require('../../build/webpack.config.server')
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html').then((res) => {
      resolve(res.data)
    }).catch(() => { reject() })
  })
}

let serverBundle = {}
const Module = module.constructor // 使用module.constructor构造一个函数
const mfs = new MemoryFs()
const serverComplier = webpack(serverConfig)
serverComplier.outputFileSystem = mfs// 指定输出文件为mfs，在内存中  不在硬盘中
serverComplier.watch({}, (err, state) => { // state  webpack打包的信息
  if (err) throw err
  state = state.toJson()
  state.errors.forEach(err => console.log(err))
  state.warnings.forEach(warning => console.log(warning))

  const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)
  const bundle = mfs.readFileSync(bundlePath, 'utf-8') // 这个读取出来是一个js的字符串
  const m = new Module()
  m._compile(bundle, 'server-entry.js')// 指定文件名
  serverBundle = m.exports.default
})
module.exports = (app) => {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.get('*', (req, res) => {
    getTemplate().then(template => {
      // console.log(template)
      const content = ReactDomServer.renderToNodeStream(serverBundle)
      res.send(template.replace('<!-- app -->', content))
    })
  })
}
