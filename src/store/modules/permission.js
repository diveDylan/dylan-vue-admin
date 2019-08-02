import { getAsyncRouterMap, constantRouterMap } from '@/router/index'// rootAuth 可忽略代表基础路由
import { getMenu } from '@/utils/auth'

/**
 * 通过authCode判断是否与当前用户权限匹配
 * @param authCode
 * @param route
 */

function hasPermissionAuthCode(auths, route) {
  if (route.authCode) {
    return auths.some(authCode => route.authCode === authCode)
  } else {
    return false
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param auths
 */

function filterAsyncRouterAuthCode(asyncRouterMap, auths) {
  const accessedRouters = asyncRouterMap.map(route => {
    if (hasPermissionAuthCode(auths, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouterAuthCode(route.children, auths)
        if (!route.children.filter(item => !item.hidden).length) {
          route.hidden = true
          return route
        }
      }
      return route
    }
    route.hidden = true
    return route
  })
  return accessedRouters.filter(item => !item.authCode || item.hidden !== true)
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        const authCode = getMenu()
        // mock all
        // const authCode = [].concat('A0', 'A', 'A1', 'A2', 'A3', 'A31', 'A32', 'B', 'B1', 'B2', 'C', 'C1', 'C11', 'C12', 'C13', 'C14', 'C2', 'C21', 'C22', 'C3', 'C4', 'C5', 'C6', 'D', 'D1', 'E', 'E1', 'E2', 'F', 'F1', 'F11', 'F2', 'F21', 'F3', 'F31', 'F4', 'F5', 'F6', 'F7', 'F8')
        const asyncRouterMap = getAsyncRouterMap()
        const accessedRouters = filterAsyncRouterAuthCode(asyncRouterMap, authCode)
        commit('SET_ROUTERS', accessedRouters)
        resolve(accessedRouters)
      })
    },
  }
}
export default permission
