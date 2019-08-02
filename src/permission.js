import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress configuration

const whiteList = ['/login', '/reset-pwd'] // 不定項白名單
router.beforeEach((to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    const hasMenu = store.getters.addRouters.length !== 0
    if (to.path === '/login' && hasMenu) {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (!hasMenu) {
        store.dispatch('GenerateRoutes').then((res) => {
          router.addRoutes(res, { override: true })
          next({ ...to, replace: true })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否則全部重定向到登錄頁
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish Progress
})
