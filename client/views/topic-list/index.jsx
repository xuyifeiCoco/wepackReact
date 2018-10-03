/**
 * 声明整个页面的内容
 */
import React from 'react'
import Helmet from 'react-helmet' // 设置title,其实也是一个标签
import queryString from 'query-string'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Tabs, Tab ,List, CircularProgress
} from '@material-ui/core'
import { AppState,TopicStore } from '../../store'
import Container from '../layout/container'
import TopicListItem from './tab-list'

import { tabs } from '../../util/variable-define'

const styles = {
  root: {
    flexGrow: 1,
  },
};

@inject((stores) => {
  return {
    topicStore: stores.topicStore,
    appState: stores.appState,
    // user: stores.appState.user,
  }
})
@observer
class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    // tabIndex: 0
  }
  
  componentDidMount() {
    this.fetchTopic()
  }

  componentWillReceiveProps(nextProps) {
    // nextProps 将要进来的props
    if (nextProps.location.search !== this.props.location.search) {
      this.fetchTopic(nextProps.location)
    }
  }

  handleChange = (event, value) => {
    this.context.router.history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    })
  }
  
  fetchTopic(location) {
    location = location || this.props.location
    const query = queryString.parse(location.search)
    const { tab } = query
    this.props.topicStore.fetchTopics(tab || 'all')
  }

  listItemClick(id) {
    this.context.router.history.push(`/detail/${id}`)
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
    const { classes,topicStore } = this.props
    const topicList = topicStore.topics
    const { syncing } = topicStore 

    const query = queryString.parse(this.props.location.search)
    const tab = query.tab ? query.tab : 'all'
    // const topic = {
    //   title: 'this is a title',
    //   username: 'xu yifei',
    //   reply_count: 20,
    //   visit_count: 30,
    //   create_at: 'gdsgf',
    //   tab: 'share',
    //   image: 'https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/soutu/img/camera_new_5606e8f.png'
    // }
    return (
      <Container>
        <Helmet>
          <title>this is topic list</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Tabs
          value={tab}
          onChange={this.handleChange}
          indicatorColor="secondary"
          textColor="primary"
          centered={false}
          className={classes.root}
        >
          {
            Object.keys(tabs).map(t => <Tab key={t} label={tabs[t]} value={t} />)
          }
        </Tabs>
        <List>
          {
            topicList.map(topic => <TopicListItem onClick={() => this.listItemClick(topic.id)} topic={topic} key={topic.id} />)
          }
        </List>
        {
          syncing ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '40px 0',
              }}
            >
               <CircularProgress size={100} />
            </div>
          ) : null
        }
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
  appState: PropTypes.instanceOf(AppState).isRequired,
  // user: PropTypes.object.isRequired,
}

TopicList.propTypes = {
  // user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired, // 要获取当前的路由
}

export default withStyles(styles)(TopicList);
