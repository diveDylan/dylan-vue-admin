import enumConfig from '@/enum/index'

const initPageInfo = JSON.parse(JSON.stringify(enumConfig.common.initPageInfo))
export default {
  data() {
    return {
      pageInfo: {
        ...initPageInfo
      }
    }
  },
  methods: {
    pageNoChange(val) {
      this.pageInfo.pageNo = val
      this.getList()
    },
    pageSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getList()
    },
    initPageInfo() {
      this.pageInfo = { ...initPageInfo }
      this.getList()
    }
  }
}