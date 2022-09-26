// 实现对axios 的二次封装
import store from '@/store'
import axios from 'axios'
// 引入elementUI
import { Message } from 'element-ui'
// 通过axios创建axios
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址 /prod-api
  timeout: 5000
})

service.interceptors.request.use(config => {
  console.log(config)
  if (store.getters.token) {
    console.log(config)
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
}
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  }, error => {
    Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
