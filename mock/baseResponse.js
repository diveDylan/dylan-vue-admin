/**
 * 
 * @param {*} code 返回的状态吗 6位
 * @param {*} message 请求的消息通知、错误日志
 * @param {*} content 返回的内容消费体
 */
export function baseResponse(type, content) {
  return Object.assign({}, type, { content })
}


export const responseConfig = {
  success: {
    code: '000000',
    message: '成功'
  },
  params_error: {
    code: '000001',
    message: '入参错误，请前端检查入参'
  },
  service_error: {
    code: '000002',
    message: '内部服务错误，请后端检查服务'
  },
  sql_timeout: {
    code: '000003',
    message: '表查询超时，后端排查'
  },
  // 0001开头token 用户相关错误
  no_token: {
    code: '000100',
    message: '未找到的token，请传token'
  },
  unexpired_token: {
    code: '000101',
    message: '失效的token，请重新登录'
  },
  no_permission: {
    code: '000102',
    message: '无权限访问'
  },
  error_password: {
    code: '000103',
    message: '密码错误，请重新输入'
  },
  no_username: {
    code: '000104',
    message: '不存在的用户名'
  }
}
