/**
 * 代理所有的业务接口
 */
const axios = require('axios')
const querystring = require('query-string') // 处理路径的参数

const baseUrl = 'http://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  const path = req.path // 请求接口 /api/topics => /topics
  const user = req.session.user || {} // 是否登录
  const needAccessToken = req.query.needAccessToken // 判断是否已需要accesstionToen

  if (needAccessToken && !user.accessToken) {
    // 这个表示没有登录
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  const query = Object.assign({}, req.query, {
    accesstoken: (needAccessToken && req.method === 'GET') ? user.accessToken : ''
  })
  if (query.needAccessToken) delete query.needAccessToken
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: querystring.stringify(Object.assign({}, req.body, {
      accesstoken: (needAccessToken && req.method === 'POST') ? user.accessToken : ''
    })),
    headers: { // 这个是处理form-data的请求
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(resp => {
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch(err => {
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })
}