// 配置一个符合项目需要的axios  导出去进行全局的配置
// 导入axios
import axios from 'axios'
import store from '@/store'
import router from '../router/router'

// 配置 相同的 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 2. 配置  请求头 token
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`
//  在每次发请求前
// 请求拦截器
axios.interceptors.request.use(config => {
  // 第一个函数：拦截请求成功调用   config 请求配置  默认配置
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
  // 第二个函数：拦截请求的时候，做业务的时候，
  // 出现报错，才会触发第二个函数的执行。
}, (err) => {
  return Promise.reject(err)
})
// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 1. 获取状态码
  const status = err.response.status

  if (status === 401) {
    // 响应失败
    // 401错误  获取响应状态码 判断是不是401
    // 清除无效token
    store.delUser()

    router.push('/lg')
  }
  return Promise.reject(err)
})

// 跑出、
export default axios
