/**
 * 声明整个页面的内容
 */

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import TestApi from '../views/test/apiTest'
import UserInfo from '../views/user/info'
import UserLogin from '../views/user/login'
import TopicCreate from '../views/topic-create/index'

// console.log(process.env.NODE_ENV)
export default () => [
    <Route path="/" render={() => <Redirect push to="/list" />} exact key="TopicList" />,
    <Route path="/list" component={TopicList} exact key="List" />,
    <Route path="/detail/:id" component={TopicDetail} exact key="detail" />,
    <Route path="/testapi" component={TestApi} exact key="TestApi" />,
    <Route path="/user/info" component={UserInfo} exact key="UserInfo" />,
    <Route path="/user/login" component={UserLogin} exact key="UserLogin" />,
    <Route path="/topic/create" component={TopicCreate} exact key="TopicCreate" />,
]
