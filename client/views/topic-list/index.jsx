/**
 * 声明整个页面的内容
 */
import React from 'react'
import Helmet from 'react-helmet' // 设置title,其实也是一个标签
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Tabs, Tab
} from '@material-ui/core'
import AppState from '../../store/app-state'
import Container from '../layout/container'

const styles = {
  root: {
    flexGrow: 1,
  },
};

@inject('appState')
@observer
class TopicList extends React.Component {
  state = {
    tabIndex: 0
  }

  handleChange = (event, value) => {
    this.setState({ tabIndex: value })
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
    const { classes } = this.props
    const { tabIndex } = this.state
    return (
      <Container>
        <Helmet>
          <title>this is topic list</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Tabs
          value={tabIndex}
          onChange={this.handleChange}
          indicatorColor="secondary"
          textColor="primary"
          centered={false}
          className={classes.root}
        >
          <Tab label="全部" />
          <Tab label="分享" />
          <Tab label="工作" />
          <Tab label="问答" />
          <Tab label="精品" />
          <Tab label="测试" />
        </Tabs>
      </Container>
    )
  }
}
TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TopicList);
