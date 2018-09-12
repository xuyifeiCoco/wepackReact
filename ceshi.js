
const fs=require('fs')
let buddle=fs.readFileSync('./a.js','utf-8')
let serverBundle;

const Module=module.constructor
// console.log(Module)
const m=new Module()
m._compile(buddle,'server-entry.js')//指定文件名
console.log(m)
serverBundle=m.exports;
console.log(serverBundle)
// console.log(m._compile)