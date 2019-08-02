<template>
  <div>
    <svg-icon :class="isActive ? 'hamburger is-active' : 'hamburger'" icon-class="hamburger" @click="toggleClick"/>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
.hamburger {
  display: inline-block;
  cursor: pointer;
  font-size: 30px;
  color: $menuActiveText;
}

.is-active {
  transform: rotate(180deg);
}

</style>
