<template>
  <section class="app-main">
    <Breadcrumb class="breadcrumb" />
    <transition name="fade-transform" mode="out-in" class="content">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'AppMain',
  components: { Breadcrumb },
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/function.scss';
$contentBg: #f3f6f8;
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
  background: $contentBg;
  padding: rem(35) rem(60) rem(35) rem(56);
}
.content {
  height: 100%;
  width: 100%;
}
</style>
