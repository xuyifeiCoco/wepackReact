/**
 * 声明整个页面的内容
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect,withRouter } from 'react-router-dom'
import {
  inject,
  observer,
} from 'mobx-react'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import TestApi from '../views/test/apiTest'
import UserInfo from '../views/user/info'
import UserLogin from '../views/user/login'
import TopicCreate from '../views/topic-create/index'

/*eslint-disable*/
const PrivateRoute = ({ isLogin, component: Component, ...rest }) => {
  return (
    <Route 
      {...rest}
      render={
       props => (
         isLogin ? <Component {...props} />
           : (
<Redirect to={{
  pathname: '/user/login',
  search: `?from=${rest.path}`
}

         }
/>
           )
       )
     }
    />
  )
}
const InjectedPrivateRoute = withRouter(inject(({ appState }) => {
  return {
    isLogin: appState.user.isLogin,
  }
})(observer(PrivateRoute)))

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  isLogin: PropTypes.bool,
}

PrivateRoute.defaultProps = {
  isLogin: false,
}
/* eslint-enable */

// console.log(process.env.NODE_ENV)
export default () => [
    <Route path="/" render={() => <Redirect push to="/list" />} exact key="TopicList" />,
    <Route path="/list" component={TopicList} exact key="List" />,
    <Route path="/detail/:id" component={TopicDetail} exact key="detail" />,
    <Route path="/testapi" component={TestApi} exact key="TestApi" />,

    <InjectedPrivateRoute path="/user/info" component={UserInfo} key="user-info" />,
    <InjectedPrivateRoute path="/topic/create" component={TopicCreate} key="create" />,

    <Route path="/user/login" component={UserLogin} exact key="UserLogin" />,
]
