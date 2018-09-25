const router = require('express').Router()
const axios = require('axios') // 发送请求

const baseUrl = 'https://cnodejs.org/api/v1'

router.post('/login', function (req, res, next) {
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accessToken // 判断是否存在session
  }, {
    headers: { // 这个是处理form-data的请求
      // 'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(resp => {
      if (resp.status === 200 && resp.data.success) {
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: resp.data.loginname,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url
        }
        res.json({
          sucess: true,
          data: resp.data
        })
      }
    })
    .catch(err => {
      if (err.response) { // 这个是说名有返回值的，不是服务器的错误
        res.json({
          success: false,
          data: err.response.data
        })
      } else {
        next(err) // 抛给全局的错误处理
      }
    })
})

module.exports = router
