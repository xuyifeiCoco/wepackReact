const serialize = require('serialize-javascript')
const Helmet = require('react-helmet').default
const ejs = require('ejs')
const asyncBootstrap = require('react-async-bootstrapper')
const ReactDomServer = require('react-dom/server')

/*  服务端配置material*/
const SheetsRegistry = require('react-jss/lib/jss').SheetsRegistry
const createMuiTheme = require('@material-ui/core/styles').createMuiTheme
const createGenerateClassName = require('@material-ui/core/styles').createGenerateClassName
const colors = require('@material-ui/core/colors')

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default

    const routerContext = {}
    const stores = createStoreMap()

    // material-ui服务端配置
    const sheetsRegistry = new SheetsRegistry()
    // Create a sheetsManager instance.
    const sheetsManager = new Map()
    // const jss = create(preset())
    // jss.options.createGenerateClassName = createGenerateClassName
    const theme = createMuiTheme({
      palette: {
        primary: colors.pink,
        accent: colors.lightBlue,
        type: 'light'
      }
    })
    // Create a new class name generator.
    const generateClassName = createGenerateClassName()

    const app = createApp(stores, routerContext, sheetsRegistry, generateClassName, theme, sheetsManager, req.url)

    asyncBootstrap(app).then(() => {
      const helmet = Helmet.rewind()
      const state = getStoreState(stores)
      const content = ReactDomServer.renderToString(app)
      if (routerContext.url) {  // 如果client上的路由有Redirect属性的话，routerContext会添加url属性
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }

      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString()
        // materialCss: sheetsRegistry.toString()
      })
      res.send(html)
      resolve()
    }).catch(reject)
  })
}
