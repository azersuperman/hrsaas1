// 实现对axios 的二次封装
import store from '@/store'
import axios from 'axios'
import router from '@/router'
// 引入elementUI
import { Message } from 'element-ui'
// 通过axios创建axios
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址 /prod-api
  timeout: 5000
})
const settime = 3600
const isCheck = function() {
  const isCheckOut = Date.now()
  const Timeout = (isCheckOut - store.state.user.time) / 1000
  console.log(Timeout - settime)
  return Timeout > settime
}

service.interceptors.request.use(config => {
  // console.log(config)
  if (store.getters.token) {
    console.log(config)
    if (isCheck()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token 超时了'))
    }
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
    console.log(response.data)
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  }, error => {
    if (error.response && error.response.status === 401) {
      store.dispatch('user/logout')
      router.push('/login')
      Message.error('token 超时了')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service
