import React from 'react'
import ReactDom from 'react-dom'
// 包括需要渲染的内容
// import {AppContainer} from 'react-hot-loader'
import App from './App.jsx'
// ReactDom.hydrate
const root = document.getElementById('root')
ReactDom.render(<App />, root)


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
