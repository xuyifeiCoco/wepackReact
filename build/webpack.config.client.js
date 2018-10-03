const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin') // 生成html模板
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const isDev = process.env.NODE_ENV === 'development' // 再启动时设置
let config = webpackMerge(baseConfig, { // 会对比每一项配置
  mode: 'development',
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash:8].js'
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    }),
    new HTMLPlugin({ // 还要有ejs
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.template.ejs'),
      filename: 'server.ejs'
    })
  ]
})

// const env = process.env
// env.MEIPIAN_PROJECT_PACKAGE_CONFIG = path.join(process.cwd(), 'package.json') // 可以获取当前进程的路径
// console.log(require(env.MEIPIAN_PROJECT_PACKAGE_CONFIG))

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map' // 这个是没有编译完成的原始代码 方便调试
  config.entry = {
    app: [
      'react-hot-loader/patch', // 热更新代码需要加载
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    //contentBase: path.join(__dirname, '../dist'), // 在dist目录下面直接起的服务，一定要将硬盘上的dist目录删除要不然会直接读取dist目录下面的文件，这样就对应不上版本
    hot: true, // 需要配置  Hot Module Replacement
    overlay: {
      warnings: false,
      errors: true
    },
    publicPath: '/public', // 所有访问的资源都会添加一个public
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: {
      '/api': 'http://localhost:3333'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = config
