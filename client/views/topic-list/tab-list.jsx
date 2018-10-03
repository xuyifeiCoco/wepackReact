import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames' // 生成类名

// import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar'
// import HomeIcon from '@material-ui/icons/Home'
import { withStyles } from '@material-ui/core/styles'
import {
  topicPrimaryStyle,
  topicSecondaryStyle,
} from './styles'

import { tabs } from '../../util/variable-define'

const getTab = (tab, isTop, isGood) => {
  return isTop ? '置顶' : (isGood ? '精品' : tab) // eslint-disable-line
}

const Primary = ({ topic,classes }) => {
  const isTop = topic.top
  const isGood = topic.good
  const classNames = cx([classes.tab, isTop ? classes.top : '', isGood ? classes.good : ''])
  return (
    <div className={classes.root}>
      <span className={classNames}>
        {getTab(tabs[topic.tab], isTop, isGood)}
      </span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  )
}

const Secondary = ({ topic ,classes }) => {
  return (
    <span className={classes.root}>
      <span className={classes.userName}>{topic.author.loginname}</span>
      <span className={classes.count}>
        <span className={classes.accentColor}>
          {topic.reply_count}
        </span>
        <span>/</span>
        <span>{topic.visit_count}</span>
      </span>
      <span>
          创建时间
          {topic.create_at}
      </span>
    </span>
  )
}


const StyledTopicPrimary = withStyles(topicPrimaryStyle)(Primary)
const StyledTopicSecondary = withStyles(topicSecondaryStyle)(Secondary)

Primary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}
Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}
const topicListItem = ({ onClick, topic }) => {
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
         <Avatar src={topic.author.avatar_url} />
      </ListItemAvatar>
      <ListItemText
        primary={<StyledTopicPrimary topic={topic} />}
        secondary={<StyledTopicSecondary topic={topic} />}
      />
    </ListItem>
  )
}
topicListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
}
export default topicListItem
