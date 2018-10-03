import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'

import {
  Avatar,Icon
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Container from '../../components/container'
import userStyles from './styles/user-style'

@inject((stores) => {
  return {
    user: stores.appState.user,
  }
}) @observer
class User extends React.Component {
  componentDidMount() {
    // do someting here
  }

  render() {
    const { classes } = this.props
    const user = this.props.user.info || {}
    return (
      <Container>
        <div className={classes.avatar}>
          <div className={classes.bg} />
          {
            user.avatar_url
              ? <Avatar className={classes.avatarImg} src={user.avatar_url} />
              : (
<Avatar className={classes.avatarImg}>
                <Icon fontSize="large" />
</Avatar>
              )
          }
          <span className={classes.userName}>{user.loginname || '未登录'}</span>
        </div>
        {this.props.children}
      </Container>
    )
  }
}

User.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired,
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
}

export default withStyles(userStyles)(User)
