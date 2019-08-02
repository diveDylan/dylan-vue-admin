<template>
<el-row>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageNo"
      :page-sizes="pageSizeArr"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total">
      <div slot="sizes"></div>
      <div slot="pager"></div>
      <div slot="jumper"></div>
      <div slot="next"></div>
  </el-pagination>
</el-row>
</template>

<script>
import enumConfig from '@/enum/index'
export default {
  name: 'BasePagination',
  props: ['pageInfo', 'pageNoChange', 'pageSizeChange'],
  data() {
    return {
      pageSizeArr: enumConfig.common.initPageInfo.pageSizeArr,

    }
  },
  components: {},
  methods: {
    handleCurrentChange(val) {
      this.pageNoChange(val)
    },
    handleSizeChange(val) {
      this.pageSizeChange(val)
    }
  },
  mounted() {},
  watch: {},
  computed: {}
 }
</script>

<style>

</style>
