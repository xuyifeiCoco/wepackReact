// 开发环境打包的文件都在内存中
const axios = require('axios')
const path = require('path')

// const fs = require('fs')
const webpack = require('webpack')

const MemoryFs = require('memory-fs') // 这个可以将内容写入到内存而不是硬盘中
const proxy = require('http-proxy-middleware') // 后端的代理

const serverConfig = require('../../build/webpack.config.server')
const serverRender = require('./server-render')

/*转化一段js字符串，让他成为可执行的，同时支持require方法*/
const NativeModule = require('module')
const vm = require('vm')
// `(function(exports, require, module, __finename, __dirname){ ...bundle code })`
const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle) //包装一段可执行的js代码，类似于上面
  const script = new vm.Script(wrapper, { // 这样就可以直接执行一段js代码
    filename: filename,
    displayErrors: true //有错误信息传出来
  })
  const result = script.runInThisContext() // 可以指定当前的执行环境
  result.call(m.exports, m.exports, require, m) // 让m.export调用当前的函数
  return m
}

const getTemplate = () => { // 这个方法是用来获取首页的模板
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs').then((res) => {
      resolve(res.data)
    }).catch((err) => { reject(err) })
  })
}

let serverBundle = {}
const mfs = new MemoryFs()
const serverComplier = webpack(serverConfig)
serverComplier.outputFileSystem = mfs// 指定输出文件为mfs，在内存中  不在硬盘中
serverComplier.watch({}, (err, state) => { // state  webpack打包的信息  监听文件的变化
  if (err) throw err
  state = state.toJson()
  state.errors.forEach(err => console.log(err))
  state.warnings.forEach(warning => console.log(warning))

  const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)
  const bundle = mfs.readFileSync(bundlePath, 'utf-8') // 这个读取出来是一个js的字符串,是通过webpack打包生成的
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports
})

module.exports = (app) => {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.get('*', (req, res, next) => {
    getTemplate().then(template => {
      return serverRender(serverBundle, template, req, res)
    }).catch(next)
  })
}
