/**
 * 声明整个页面的内容
 */
import React from 'react'
import Helmet from 'react-helmet' // 设置title,其实也是一个标签
import { observer,inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import AppState from '../../store/app-state'

function log() {
  console.log('打印日志')
}
@log
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

  bootstrap() { // 注意这个函数名字和服务端渲染的时候  名字一定要对应
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.add()
        resolve(true)
      })
    })
  }

  render() {
    return (
        <div>
          <Helmet>
            <title>this is topic list</title>
            <meta name="description" content="this is description" />
          </Helmet>
          <Button variant="contained" color="primary">这是一个按钮</Button>
          <input type="text" onChange={this.changeName} />
            {this.props.appState.msg}
            <span>发送到发送到发送到dsfg</span>
        </div>
    )
  }
}
TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}

export default TopicList
