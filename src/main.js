import Vue from 'vue'
import App from './App.vue' // 导入app.vue
import ElementUI from 'element-ui' // 导入 element-UI 模块、
import 'element-ui/lib/theme-chalk/index.css'// 引入element、模块中的css
// 引入router
import router from './router/router'
Vue.use(ElementUI) /// 注册 element
Vue.config.productionTip = false
new Vue({

  router, // 挂载router

  render: h => h(App)

}).$mount('#app')
