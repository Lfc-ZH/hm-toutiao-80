// 封装 一个插件 全局注册components 下的插件/
// - 怎么定义一个基于vue的插件：
//   - 规则：需要js模块，导出一个对象，必须包含一个选项install，是一个函数，接收一个对象Vue
//   - 功能：在install去实现，Vue对象基础之上，去扩展功能。
// 封装插件：components/index.js
import myBread from '@/components/my-bread'
import myChannel from '@/components/my-pingdao'
import myImage from '@/components/my-image'
export default {
  install (Vue) {
    // Vue 对象  main.js 使用 Vue.use(插件) 调用install函数，传入当前的Vue对象
    // Vue.component('名字', '配置对象')
    Vue.component(myBread.name, myBread)
    Vue.component(myChannel.name, myChannel)
    Vue.component(myImage.name, myImage)
  }
}
