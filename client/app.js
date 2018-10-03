import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { lightBlue, pink } from '@material-ui/core/colors'

import { Provider } from 'mobx-react'
import App from './views/App.jsx'
import { AppState, TopicStore } from './store'
// ReactDom.hydrate

const theme = createMuiTheme({
  palette: {
    primary: pink,
    accent: lightBlue,
    type: 'light',
  },
})

const initialState =window.__INITIAL__STATE__ || {} // eslint-disable-line

const appState = new AppState(initialState.appState)
// appState.init(initialState.appState)
const topicStore = new TopicStore(initialState.topicStore)

const root = document.getElementById('root')
ReactDom.render(
  <BrowserRouter key="broswer">
    <Provider appState={appState} topicStore={topicStore}>
    <MuiThemeProvider theme={theme}>
      <App key="app" />
    </MuiThemeProvider>
    </Provider>
  </BrowserRouter>,

  root,
)


// const render= (Component) => {
//   ReactDom.render(
//     <AppContainer>
//       <Component />
//     </AppContainer>,
//      root
//   )
// }
// render(App)
// if(module.hot){
//   module.hot.accept('./App.jsx',function(){
//     const NextApp=require('./App.jsx').default
//     render(NextApp)
//   })
// }
// 初次配置hot-module不起作用
