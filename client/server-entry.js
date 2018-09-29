import React from 'react'
import { StaticRouter } from 'react-router-dom' // 服务端router
import { Provider,useStaticRendering } from 'mobx-react'
import {
  MuiThemeProvider,
} from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider'
import App from './views/app'
import { createStoreMap } from './store/store'

// 使用静态渲染，让mobx在服务端渲染的时候不会重复数据变换
// context 路由信息
useStaticRendering(true)

// routerContext 这个是传入StaticRoute会被做一些操作，添加url属性  location 当前请求的url
export default (stores,routerContext,sheetsRegistry,generateClassName, theme,sheetsManager,url) => (
   <Provider {...stores}>
      <StaticRouter context={routerContext} location={url}>
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            <App />
          </MuiThemeProvider>
        </JssProvider>
      </StaticRouter>
   </Provider>
)

// 直接可以在dev-static.js里面直接访问
export {
  createStoreMap
}
