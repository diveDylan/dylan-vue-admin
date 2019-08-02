/**
 * 登录状态
 * 权限菜单信息
 */

import { baseResponse, responseConfig } from './baseResponse'

const userInfo = {
  admin: {
    token: 'root',
    menuList: [
      'A', 'B', 'B1'
    ],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  },
  others: {
    token: 'user',
    menuList: [
      'A', 'C'
    ],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  }
}


export default {
  login: res => {
    const { username } = JSON.parse(res.body)
    if (userInfo[username]) {
      return baseResponse(responseConfig.success, userInfo[username] )
    } else {
      return baseResponse(responseConfig.no_username, null)
    }
  },
  logout: () => baseResponse(responseConfig.success)
}

