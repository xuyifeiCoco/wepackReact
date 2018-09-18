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
  componentDidMount() {
    // do something
    setInterval(() => {
      // console.log(this.props.appState)
    },2000)
    return true
  }

  render() {
    return (
        <div>
        这是一个列表
        {this.props.appState.msg}
        </div>
    )
  }
}
TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}

export default TopicList
