const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
// const HTMLPlugin=require('html-webpack-plugin')  //生成html模板

module.exports = webpackMerge(baseConfig, {
  target: 'node',
  mode: 'development',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  //指定一些包不打入到最后生生的js里面,所有需要引用的包都会通过require引用进来
  externals: Object.keys(require('../package.json').dependencies),
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2' // 打包的规范
  },
  plugins: [
    new webpack.DefinePlugin({ // 这里面定义的一些变量在全局都是可以访问到的
      'process.env.API_BASE': '"http://127.0.0.1:3333"'
    })
  ]
})
