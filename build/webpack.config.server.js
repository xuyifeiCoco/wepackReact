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
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2' // 打包的规范
  }
})
