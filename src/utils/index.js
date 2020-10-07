export function isArray(arr) {
  return arr instanceof Array
}

// tree shaking 测试
export function isString(str) {
  return typeof str === 'string'
}
