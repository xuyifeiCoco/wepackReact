const path=require('path')
module.exports={
  mode:'development',
  entry: {
    app: path.join(__dirname, '../client/app.js'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
    publicPath:'',//指定生成的文件的引用的静态资源的前缀
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
}