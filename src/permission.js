//
import router from './router'
import store from './store'

const whiteLsit = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  // console.log(to)
  // console.log(from)
  // next(false)
  // 1. 判断token是否存在
  // 1.1  存在 处于登录状态 是否去往登录页 处于 则去首页 否则放行
  // 1.2 不存在 不处于登录状态 去往页面 是否处于白名单 处于则放行 否则登录页
  if (store.getters.token) {
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteLsit.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

