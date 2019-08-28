import Vue from 'vue'
import App from './App.vue' // 导入app.vue
import ElementUI from 'element-ui' // 导入 element-UI 模块、
import 'element-ui/lib/theme-chalk/index.css'// 引入element、模块中的css
// 引入router
import router from './router/router'
// 引入全局components下的配置对象
import myBread from '@/components'
// 简单配置axios 引入
// import Axios from 'axios'
import Axios from '@/api'
// 注册
Vue.use(myBread)
// 给它原型设置一个属性、 $http 指向axios 就可以直接使用 $http不用再去重复引用Axios
Vue.prototype.$http = Axios
Vue.use(ElementUI) /// 注册 element
Vue.config.productionTip = false

new Vue({

  router, // 挂载router

  render: h => h(App)

}).$mount('#app')
