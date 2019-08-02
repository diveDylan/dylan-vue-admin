<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    <img class="pic-home-welcome" src="~@/assets/images/home/welcome.png">

    <p class="dashboard-text">歡迎登錄法巴人壽保經代後台管理系統！</p>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import mixins from '@/mixins/index'
// console.log(mixins)
export default {
  name: 'Dashboard',
  computed: {
    // ...mapGetters([
    //   'name',
    //   'roles'
    // ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    text-align: center;
  }

  &-text {
    height: 21px;
    font-size: 15px;
    font-weight: 400;
    color: #999999;
    line-height: 21px;
    margin-top: 45px;
  }
}
.pic-home-welcome {
  width: 400px;
  margin-top: 133px;
}
</style>
