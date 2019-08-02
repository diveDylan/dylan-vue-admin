<template>
  <div class="admin-header">
    <Logo/>
    <section>
      <div class="user"><svg-icon icon-class="user" class="icon-user"/>歡迎您  總公司管理員</div>
      <div class="off"><svg-icon icon-class="quit" class="icon-off" @click="logout"/></div>
    </section>
  </div>
</template>

<script>
import Logo from './Logo'
export default {
  name: 'Navbar',
  components: { Logo },
  mixins: [],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/function.scss';
.admin-header {
  height: rem(90);
  position: fixed;
  z-index: 9;
  width: 100%;
  display: flex;
  align-self: center;
  justify-content: space-between;
  background: #fff;
  section {
    font-family: PingFangSC-Regular;
    font-size: rem(24);
    color: #666666;
    letter-spacing: 0;
    height: rem(36);
    line-height: rem(36);
    display: flex;
    align-self: center;
    .user {
      width: rem(316);
      border-right: 1px solid rgba(102, 102, 102, .6);
      svg {
        margin-right: rem(10);
      }
    }
    .off {
      padding-left: rem(42);
      padding-right: rem(50);
      svg {
        font-size: 24px;
      }
    }
  }
}
</style>
