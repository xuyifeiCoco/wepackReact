/**
 * 声明整个页面的内容
 */
import React from 'react'
import { observer,inject } from 'mobx-react'
import PropTypes from 'prop-types'
import AppState from '../../store/app-state'

@inject('appState')
@observer
class TopicList extends React.Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
  }

  changeName(event) {
    this.props.appState.name = event.target.value
  }

  render() {
    return (
        <div>
       <input type="text" onChange={this.changeName} />
        {this.props.appState.msg}
        测试热更新 可以的
        </div>
    )
  }
}
TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}

export default TopicList
