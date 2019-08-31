import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入index.vue组件  @/views/login
import Login from '../views/Login/index'
// 在引入home 下的
import Home from '../views/Home/index'
// 引入celcome
import welcome from '../views/welcome/index'
// 引入404文件
import NotFound from '@/views/404'
// 引入stroe
import store from '@/store'
// 引入 首页内容
import article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
// 注册 vue -router
Vue.use(VueRouter)
// 初始化router、
const router = new VueRouter({
  routes: [
    // name选项作用  找到对应的路由规则
    // / 跳转方便一些：$router.push('/login') 或者 $router.push({name:'login'})
    // { path: '/', redirect: '/lg' }, // 重定向
    { path: '/lg', name: 'login', component: Login },
    {
      path: '/',
      // name: 'Home',
      component: Home,
      children: [
        // 路由规则  子路由有名称  父路由不需要设置name属性
        { path: '/', name: 'welcome', component: welcome },
        { path: '/article', name: 'article', component: article },
        { path: '/image', name: 'Image', component: Image },
        { path: '/publish', name: 'Publish', component: Publish }
      ]
    },
    { path: '*', name: '404', component: NotFound }
  ]
})
router.beforeEach((to, from, next) => {
  // to 去哪里  // from 来自哪里
  // next() 放行  next('/login') 拦截到login
  if (to.path !== '/lg' && !store.getUser().token) return next('/lg')
  next()
})
// 导出router
export default router
