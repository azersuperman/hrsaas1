import { login } from '@/api/login'
import { getUserInfoAPI, getUserdetailsAPI } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    time: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_TIME(state) {
      state.time = +new Date()
    },
    REMOVE_USER_INFO(state) {
      state.userInfo = {}
    },
    REMOVE_TOKEN(state) {
      state.token = null
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      // 接口
      const data = await login(loginData)
      commit('SET_TOKEN', data)
      commit('SET_TIME')
    },

    async getUserInfo({ commit }) {
      const res = await getUserInfoAPI()
      const res1 = await getUserdetailsAPI(res.userId)
      const result = { ...res, ...res1 }
      // console.log(res)
      commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(res))
    },
    logout({ commit }) {
      commit('REMOVE_USER_INFO')
      commit('REMOVE_TOKEN')
    }
  }
}
