import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'

import {
  TextField, Radio ,Button
} from '@material-ui/core'
import IconReply from '@material-ui/icons/Reply'
import { withStyles } from '@material-ui/core/styles'

import SimpleMDE from 'react-simplemde-editor'
import Container from '../../components/container'
import createStyles from './styles'
import { tabs } from '../../util/variable-define'


@inject((stores) => {
  return {
    topicStore: stores.topicStore,
    // appState: stores.appState,
  }
}) @observer
class TopicCreate extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      // showEditor: false,
      title: '',
      content: '',
      tab: 'dev',
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleChangeTab = this.handleChangeTab.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       showEditor: true,
  //     })
  //   }, 500)
  // }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value.trim(),
    })
  }

  handleContentChange(value) {
    this.setState({
      content: value,
    })
  }

  handleChangeTab(e) {
    this.setState({
      tab: e.currentTarget.value,
    })
  }

  handleCreate() {
    // do create here
    const {
      tab, title, content,
    } = this.state
    // const { appState } = this.props
    if (!title) {
      // return appState.notify({
      //   message: '标题必须填写',
      // })
      alert('标题必须填写')
      return false
    }
    if (!content) {
      // return appState.notify({
      //   message: '内容不能为空',
      // })
      alert('内容不能为空')
      return false
    }
    return this.props.topicStore.createTopic(title, tab, content)
      .then(() => {
        this.context.router.history.push('/list')
      })
      .catch((err) => {
        alert(err.message)
        // appState.notify({
        //   message: err.message,
        // })
      })
  }

  render() {
    const { classes } = this.props
    return (
      <Container>
        <div className={classes.root}>
          <TextField
            className={classes.title}
            label="标题"
            value={this.state.title}
            onChange={this.handleTitleChange}
            fullWidth
          />
          <SimpleMDE
            onChange={this.handleContentChange}
            value={this.state.newReply}
            options={{
              toolbar: false,
              spellChecker: false,
              placeholder: '发表你的精彩意见',
            }}
          />
          <div>
            {
              Object.keys(tabs).map((tab) => {
                if (tab !== 'all' && tab !== 'good') {
                  return (
                    <span className={classes.selectItem} key={tab}>
                      <Radio
                        value={tab}
                        checked={tab === this.state.tab}
                        onChange={this.handleChangeTab}
                      />
                      {tabs[tab]}
                    </span>
                  )
                }
                return null
              })
            }
          </div>
          <Button color="primary" onClick={this.handleCreate} className={classes.replyButton}>
            <IconReply />
          </Button>
        </div>
      </Container>
    )
  }
}

TopicCreate.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  // appState: PropTypes.object.isRequired,
}

TopicCreate.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(createStyles)(TopicCreate)
