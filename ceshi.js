const fs = require('fs')
const NativeModule = require('module')
const vm = require('vm')
let buddle = fs.readFileSync('./a.js', 'utf-8')
const getModuleFromString = (bundle, filename) => {
  const m = {
    exports: {}
  }
  const wrapper = NativeModule.wrap(bundle) //包装一段可执行的js代码，类似于上面
  const script = new vm.Script(wrapper, { // 这样就可以直接执行一段js代码
    filename: filename,
    displayErrors: true //有错误信息传出来
  })
  const result = script.runInThisContext() // 可以指定当前的执行环境
  result.call(m.exports, m.exports, require, m) // 让m.export调用当前的函数
  return m
}

const m = getModuleFromString(buddle, 'aaa.js')

console.log(m.exports())
