import React from 'react'
// import PropTypes from 'prop-types'

// import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar'

export default ({ onClick, topic }) => {
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <Avatar src={topic.image} />
      </ListItemAvatar>
    </ListItem>
  )
}

