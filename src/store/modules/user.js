import { login } from '@/api/login'
import { getUserInfoAPI } from '@/api/user'
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
      console.log(res)
      commit('SET_USER_INFO', res)
      // return JSON.parse(JSON.stringify(res))
    }
  }
}
