<template>
  <div class="login-header">
    <logo/>
    <p>全能數位銷售平台</p>
  </div>
</template>

<script>

import Logo from './Logo'
export default {
  name: 'LoginHeader',
  components: { Logo },
  mixins: [],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
@import '~@/styles/function.scss';
.login-header {
  height: rem(90);
  width: 100%;
  font-family: MicrosoftYaHei;
  font-size: rem(30);
  color: #333333;
  letter-spacing: 0;
  background: #fff;
  display: flex;
  align-items: center;
  p {
    margin-left: rem(161);
    height: rem(40);
  }
}

</style>
