<template>
  <el-breadcrumb class="app-breadcrumb" separator=">">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"/>
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1 || !item.redirect" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      const matched = this.$route.matched.filter(item => item.name)

      // const first = matched[0]
      // if (first && first.name !== 'dashboard') {
      // matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      // }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
 @import '~@/styles/function.scss';
 #app .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: rem(24);
    line-height: 50px;
    // color: #606266;
    .no-redirect {
      color: #333333;
      cursor: text;
    }
    a {
      color: rgba(51, 51, 51, .5);
    }
    svg {
      font-size: 20px;
    }
  }
</style>
