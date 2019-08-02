import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setMenu(menu) {
  return Cookies.set('menu', JSON.stringify(menu))
}

export function getMenu() {
  return JSON.parse(Cookies.get('menu'))
}

export function removeMenu() {
  return Cookies.remove('menu')
}
