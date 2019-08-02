<template>
 <el-table :data="data"  stripe v-on="listeners" v-bind="$attrs" >
    <template v-for="colConfig in colConfigs">
      <slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
      <component v-else-if="colConfig.component" :is="colConfig.component" :col-config="colConfig" :key="colConfig.component"> </component>
      <el-table-column v-else v-bind="colConfig" :key="colConfig.prop"></el-table-column>
  </template>  
</el-table>
</template>

<script>
export default {
  name: 'BaseTable',
    props: {
    colConfigs: {
      required: true
    },
    data: {
      required: true
    },
  }, 

  data() {
    return {}
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {
    listeners() {
      return {
        ...this.$listeners
      }
    } 
  }
 }
</script>

<style>

</style>
