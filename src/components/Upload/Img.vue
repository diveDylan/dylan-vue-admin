<template>
  <div class="base-uploader-img">
    <el-upload
      ref="uploadImg"
      :show-file-list="false"
      v-bind="$attrs"
      :headers="headers"
      :before-upload="beforeAvatarUpload"
      :on-success="getImgUrl"
      class="avatar-uploader"
      accept="image/jpeg, image/png, application/pdf"
      action="/api/backend/admin/uploadFile">
      <img v-if="imgUrl" :src="imgUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"/>
      <div slot="tip" class="el-upload__tip">只支持.jpg .png .pdf格式</div>
    </el-upload>
  </div>
</template>

<script>
import exif from 'exif-js'
import { getToken } from '@/utils/auth'
export default {
  name: 'UploadImg',
  props: {
    initUrl: {
      default: '',
      type: String
    }
    // disabled: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      showDialogImg: false,
      imgUrl: this.initUrl,
      headers: {
        token: getToken()
      }
    }
  },
  watch: {
    'initUrl': 'init'
  },
  methods: {
    // 獲取圖片地址
    getImgUrl(res) {
      if (res) {
        this.imgUrl = res.value
        this.$emit('imgUrl', res.value)
      }
    },
    // 移除文件
    removeFile(e) {
      e.stopPropagation()
      this.imgUrl = ''
      this.$emit('imgUrl', '')
    },
    // 上傳前的處理
    beforeAvatarUpload(file) {
      return new Promise((resolve, reject) => {
        const isLt3M = file.size / 1024 / 1024 < 3
        if (!isLt3M) {
          this.$message.error(`上傳圖片大小不能超過3M!`)
          file = null
          reject()
        }
        exif.getData(file, () => {
          const orient = exif.getTag(file, 'Orientation')
          if ([6, 3, 8].indexOf(orient) !== -1) {
            // need rotate
            const name = file.name

            const img = new Image()
            img.src = window.URL.createObjectURL(file)
            file = null
            img.onload = () => {
              const w = img.width
              const h = img.height
              const canvas = document.createElement('canvas')
              const ctx = canvas.getContext('2d')
              canvas.width = h
              canvas.height = w

              switch (orient) {
                // the bug from ios photos 拍攝照片的image-orientation
                case 6:
                  ctx.rotate((90 * Math.PI) / 180)
                  ctx.drawImage(img, 0, -h)
                  break
                // if got problems here to fixed
                // 可查阅image-orientation
                case 3:
                  break
                case 8:
                  break
              }
              file = this.toDataURL(canvas.toDataURL('image/jpeg'), name)
              canvas.remove()
              resolve(file)
            }
          } else {
            resolve(file)
          }
        })
      })
    },
    // 轉為文件
    toDataURL(dataurl, filename) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
    init() {
      this.imgUrl = this.initUrl
    }
  }
}
</script>

<style lang="scss" >
@import '~@/styles/function.scss';
.base-uploader-img {
  width: rem(210);
  display: inline-block;
}
 .avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    width: rem(200);
    height: rem(200);
    overflow: hidden;
  }
 .el-upload:hover {
    // border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: rem(196);
    height: rem(196);
    line-height: rem(196);
    text-align: center;
    background: #F6F6F6;
    border: 6px solid #fff
  }
  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
  .el-upload__tip{
    font-size: 12px;
    line-height: 12px;
  }
}
</style>
