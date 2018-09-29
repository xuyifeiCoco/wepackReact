/**
 * 声明整个页面的内容
 */

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import TestApi from '../views/test/apiTest'

// console.log(process.env.NODE_ENV)
export default () => [
    <Route path="/" render={() => <Redirect push to="/list" />} exact key="TopicList" />,
    <Route path="/list" component={TopicList} exact key="List" />,
    <Route path="/detail" component={TopicDetail} exact key="detail" />,
    <Route path="/testapi" component={TestApi} exact key="TestApi" />
]
