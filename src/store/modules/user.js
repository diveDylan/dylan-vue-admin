// import { getInfo } from '@/api/login'
import api from '@/api/index'
import { getToken, setToken, removeToken, setMenu, removeMenu, getMenu } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise(async(resolve, reject) => {
        // const { success, value } = await api.user.login(username)
        const { success, content } = { success: true, content: { menuList: ['A0', 'A', 'A1', 'A2', 'A3', 'A31', 'A32', 'B', 'B1', 'B2', 'C', 'C1', 'C11', 'C12', 'C13', 'C14', 'C2', 'C21', 'C22', 'C3', 'C4', 'C5', 'C6', 'D', 'D1', 'E', 'E1', 'E2', 'F', 'F1', 'F11', 'F2', 'F21', 'F3', 'F31', 'F4', 'F5', 'F6', 'F7', 'F8'], token: 'a3850091cd7c0777390d0c575cf7e7ac' }}
        if (success) {
          console.log(1, content.menuList, content.token)
          setToken(content.token)
          setMenu(content.menuList)
          commit('SET_TOKEN', content.token)
          resolve()
        } else {
          reject()
        }
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise(async(resolve, reject) => {
        try {
          const res = await api.user.logout(getToken())
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeMenu()
          removeToken()
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeMenu()
        resolve()
      })
    }
  }
}

export default user
