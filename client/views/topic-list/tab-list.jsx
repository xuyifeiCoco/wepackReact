import React from 'react'
// import PropTypes from 'prop-types'

// import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar'

const primary = ({ topic }) => {
  return (
    <div>
      <span>{topic.tab}</span>
      <span>{topic.title}</span>
    </div>
  )
}

const secondary = ({ topic }) => {
  return (
    <div>
      <span>{topic.username}</span>
      <span>
        <span>
          {topic.reply_count}
        </span>
        <span>/</span>
        <span>{topic.visit_count}</span>
      </span>
    </div>
  )
}

export default ({ onClick, topic }) => {
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <Avatar src={topic.image} />
      </ListItemAvatar>
      <ListItemText
        primary={primary(topic)}
        secondary={secondary(topic)}
      />
    </ListItem>
  )
}

