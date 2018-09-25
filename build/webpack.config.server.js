const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
// const HTMLPlugin=require('html-webpack-plugin')  //生成html模板

module.exports = webpackMerge(baseConfig, {
  target: 'node',
  mode: 'development',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  externals: Object.keys(require('../package.json').dependencies), //指定一些包不打入到最后生生的js里面,所有需要引用的包都会通过require引用进来
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2' // 打包的规范
  }
})
