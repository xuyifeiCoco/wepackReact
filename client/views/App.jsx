/**
 * 声明整个页面的内容
 */
import React from 'react'
import {
  Link,
} from 'react-router-dom'
import { hot } from 'react-hot-loader'  // eslint-disable-line
import Routes from '../config/router.jsx'

class App extends React.Component {
  componentDidMount() {
    // do som
  }

  render() {
    return [
      <div key="banner">
        <Link to="/">首页</Link>
        <br />
        <Link to="/detail">详情页</Link>
      </div>,
      <Routes key="routes" />,
    ]
  }
}


export default hot(module)(App)
