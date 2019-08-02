<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
    >
      <sidebar-item v-for="route in addRouters" :key="route.path" :item="route" :base-path="route.path"/>
      <div style="height: 60px; width: 100%; background: rgb(255, 255, 255)"/>
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import Hamburger from '@/components/Hamburger'
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem, Hamburger },
  computed: {
    ...mapGetters([
      'sidebar', 'addRouters'
    ]),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      console.log('tog')
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/function.scss';
.hamburger-container {
  position: fixed;
  bottom: 33px;
  left: 0;
  transform: translateX(rem(193));
}
.hideSidebar .hamburger-container {
  left: 0;
  animation: ham .3 linear;
  transform: translateX(0);
}

@keyframes wide {
  from {
    width: 36px
  }
  to {
    width: 273px
  }
}
@keyframes ham {
  from {
    transform: translateX(rem(193))
  }
  to {
    transform: translateX(0)
  }
}
</style>
