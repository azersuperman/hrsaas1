// 实现对axios 的二次封装
import axios from 'axios'
// 通过axios创建axios
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址 /prod-api
  timeout: 5000
})
export default service
