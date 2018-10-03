import React from 'react'
import PropTypes from 'prop-types'

import {
  inject,
  observer,
} from 'mobx-react'

import { withStyles } from '@material-ui/core/styles'
import {
  AppBar, Button, IconButton, Typography, Toolbar,
} from '@material-ui/core'
// import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flexGrow: 1,
  },
}

@inject((stores) => {
  return {
    user: stores.appState.user,
  }
}) @observer
class MainAppBar extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  /*  可以直接向下面这样定义state，方法都用箭头函数的话也可以不用bind绑定this */ 
  // state = {
  //   auth: true,
  //   anchorEl: null,
  // };
  // constructor() {
  //   super()
  //   this.onHomeIconClick = this.onHomeIconClick.bind(this)
  // }

  /*eslint-disable*/
  onHomeIconClick = () => {
    this.context.router.history.push('/')
  }

  crateButtonClick = () => {
    this.context.router.history.push('/topic/create')
  }
  /* eslint-enable */

  loginButtonClick = () => {
    if (this.props.user.isLogin) {
      this.context.router.history.push('/user/info')
    } else {
      this.context.router.history.push({
        pathname: '/user/login',
        // search: `?from=${location.pathname}`,
      })
    }
  }


  render() {
    // console.log(this.props)
    const { classes ,user } = this.props
    // console.log(classes)
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              JNODE
            </Typography>
            <Button color="primary" variant="contained" onClick={this.crateButtonClick}> 新建话题</Button>
            <Button color="inherit" onClick={this.loginButtonClick}> 
              {user.isLogin ? user.info.loginname : '登录'}
            </Button>

          </Toolbar>

        </AppBar>
      </div>
    )
  }
}

MainAppBar.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired,
}
MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MainAppBar)

