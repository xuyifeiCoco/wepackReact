
/**
 * arr.reduce(callback,[initialValue])  callback （执行数组中每个值的函数，包含四个参数）
 * 1、initialValue
 * 2、当前被处理的元素
 * 3、index 当前元素在数组的索引
 * 4、调用reduce的数组
 */
var items = [10, 120, 1000]
// our reducer function
var reducer = function add (sumSoFar, item) {
  sumSoFar.sum = sumSoFar.sum + item
  return sumSoFar
}
// do the job
var total = items.reduce(reducer, {
  sum: 0
})
console.log(total) // {sum:1130}

//如何知道一串字符串中每个字母出现的次数？
var arrString = 'abcdaabc'
const aaa = arrString.split('').reduce(function (res, cur) {
  res[cur] ? res[cur]++ : res[cur] = 1
  return res
}, {})
console.log(aaa)
/*====================================reduce的使用================================*/
