import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入index.vue组件  @/views/login
import Login from '../views/Login/index.vue'
// 注册 vue -router
Vue.use(VueRouter)
// 初始化router、
const router = new VueRouter({
  routes: [
    // name选项作用  找到对应的路由规则
    // / 跳转方便一些：$router.push('/login') 或者 $router.push({name:'login'})
    { path: '/', redirect: '/lg' }, // 重定向
    { path: '/lg', name: 'login', component: Login }
  ]
})
// 导出router
export default router
