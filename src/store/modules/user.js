import { login } from '@/api/login'
import { getUserInfoAPI, getUserdetailsAPI } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    REMOVE_USER_INFO(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      // 接口
      const data = await login(loginData)
      commit('SET_TOKEN', data)
    },

    async getUserInfo({ commit }) {
      const res = await getUserInfoAPI()
      const res1 = await getUserdetailsAPI(res.userId)
      const result = { ...res, ...res1 }
      // console.log(res)
      commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(res))
    }
  }
}
