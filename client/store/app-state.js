import {
  observable, computed, autorun, action
} from 'mobx'

export class AppState {
  @observable count =0

  @observable name ='徐毅飞'

  @computed get msg() {
    return `${this.name} say count is 好的${this.count}`
  }

  @action add() {
    this.count += 1
  }
}

const appState = new AppState()
autorun(() => {
  // console.log(appState.msg)
})

export default appState
