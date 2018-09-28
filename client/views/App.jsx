/**
 * 声明整个页面的内容
 * 引入组件的时候不要通过结构引入 直接单独引入某个组件，这样可以减小打包体积
 * 
 */
import React from 'react'
// import {
//   Link,
// } from 'react-router-dom'
import { hot } from 'react-hot-loader'  // eslint-disable-line
import Routes from '../config/router.jsx'
import AppBar from './layout/app-bar'

class App extends React.Component {
  componentDidMount() {
    // do som
  }

  render() {
    return [
      <AppBar key="appbar" />,
      <Routes key="routes" />,
    ]
  }
}


export default hot(module)(App)
