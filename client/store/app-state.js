import {
  observable, autorun, action ,toJS
} from 'mobx'
import { post,get } from '../util/http'

export default class AppState {
  @observable user = {
    isLogin: false,
    info: {},
    detail: {
      syncing: false,
      recent_topics: [],
      recent_replies: [],
    },
    collections: {
      syncing: false,
      list: [],
    },
  }

  @observable activeNotifications = []

  @observable notifications = []

  @observable state = {
    topicTab: 0,
  }

  init({ user } = {}) {
    if (user) {
      this.user = user
    }
  }

  @action login(accessToken) {
    return new Promise((resolve, reject) => {
      post('/user/login', {
        accessToken,
      }).then((resp) => {
        if (resp.sucess) {
          // console.log(resp)
          this.user.info = resp.data
          this.user.isLogin = true
          resolve()
          // this.notify({ message: '登录成功' })
        } else {
          reject()
        }
      }).catch((err) => {
        // console.log(err)
        if (err.response) {
          reject(err.response.data.msg)
          this.notify({ message: err.response.data.msg })
        } else {
          reject(err.message)
          this.notify({ message: err.message })
        }
      })
    })
  }

  @action notify(config) {
    // config.id = notifyId
    // notifyId += 1
    this.activeNotifications.push(config)
  }

  @action closeNotify(notify) {
    this.activeNotifications.splice(this.activeNotifications.indexOf(notify), 1)
    this.notifications.push(notify)
  }

  @action getUserDetail() {
    const appData = this.toJson()
    this.user.detail.syncing = true
    return new Promise((resolve, reject) => {
      get(`/user/${appData.user.info.loginname}`)
        .then((resp) => {
          // console.log(resp)
          if (resp.success) {
            this.user.detail.recent_replies = resp.data.recent_replies
            this.user.detail.recent_topics = resp.data.recent_topics
            resolve()
          } else {
            reject()
            // this.notify({ message: resp.data.msg })
          }
          this.user.detail.syncing = false
        }).catch((err) => {
          reject(err.message)
          // this.notify({ message: err.msg })
          this.user.detail.syncing = false
        })
    })
  }

  @action getUserCollection() {
    const appData = this.toJson()
    this.user.collections.syncing = true
    return new Promise((resolve, reject) => {
      get(`/topic_collect/${appData.user.info.loginname}`)
        .then((resp) => {
          if (resp.success) {
            this.user.collections.list = resp.data
            resolve()
          } else {
            reject()
            // this.notify({ message: resp.data.msg })
          }
          this.user.collections.syncing = false
        }).catch((err) => {
          reject(err.message)
          // this.notify({ message: err.msg })
          this.user.collections.syncing = false
        })
    })
  }

  toJson() {
    return {
      user: toJS(this.user),
    }
  }
}


autorun(() => {
  // console.log(appState.msg)
})


