const path=require('path')
// const HTMLPlugin=require('html-webpack-plugin')  //生成html模板

module.exports={
  target:'node',
  mode:'development',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'server-entry.js',
    publicPath:'/public/',//指定生成的文件的引用的静态资源的前缀
    libraryTarget:'commonjs2'  //打包的规范
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  },
  plugins:[
    
  ]
}