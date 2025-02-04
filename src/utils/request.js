// 实现对axios 的二次封装
import axios from 'axios'
// 引入elementUI
import { Message } from 'element-ui'
// 通过axios创建axios
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址 /prod-api
  timeout: 5000
})

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
