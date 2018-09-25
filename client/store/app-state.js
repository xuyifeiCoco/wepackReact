import {
  observable, computed, autorun, action
} from 'mobx'

export default class AppState {
  constructor({ count,name } = { count: 0,name: '徐毅飞' }) {
    this.count = count
    this.name = name
  }

  @observable count

  @observable name

  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }

  @action add() {
    this.count += 1
  }

  toJson() { // 将服务端渲染之后的数据 以json的格式拿到
    return {
      count: this.count,
      name: this.name
    }
  }
}


autorun(() => {
  // console.log(appState.msg)
})


