import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './views/App.jsx'
import appState from './store/app-state'
// ReactDom.hydrate
const root = document.getElementById('root')
ReactDom.render(
  <BrowserRouter key="broswer">
    <Provider appState={appState}>
      <App key="app" />
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
