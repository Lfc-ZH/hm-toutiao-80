// 定义一个模块，操作本地的用户信息
/* sessionStorage.getItem(key) :获取指定key本地存储的值；
sessionStorage.setItem(key,value) :将值存储到key字段；
sessionStorage.removeItem(key) :删除指定key本地存储的值；
sessionStorage.length是sessionStorage的项目数 */
const KEY = 'hm-taotiao-80-user'
export default {
  // user 是你登录时传进来的值
  setUser (user) {
    // 储存 用户信息
    // user 的数据类型是队像
    // JSON.stringify 将值转化成字符串
    const jsStr = JSON.stringify(user)
    // 将值存储到key字段
    window.sessionStorage.setItem(KEY, jsStr)
  },
  getUser () {
    // 获取用户信息      取出来的数据为null 默认给他一个空对象
    const jsonStr = window.sessionStorage.getItem(KEY) || '{}'
    // JSON.parse() 方法将数据转换为  对象。
    return JSON.parse(jsonStr) // 在返回去
  },
  delUser () {
    // 删除用户信息
    window.sessionStorage.removeItem(KEY)
  }

}
