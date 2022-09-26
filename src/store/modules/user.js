import { login } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      // 接口
      console.log(1)
      const data = await login(loginData)
      commit('SET_TOKEN', data)
    }
  }
}
