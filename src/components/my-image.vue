<template>
  <div class="img-container">
    <!-- 图片按钮 -->
    <div class="img_btn" @click="openDialog">
      <img src="../assets/images/default.png" alt />
    </div>
    <!-- 点击以后出现的对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group @change="toggleCollect" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 图片列表 -->
          <div class="img_list">
            <div
              class="img_item"
              :class="{selected:item.url===selectedImageUrl}"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
            hide-on-single-page
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传图片内容 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
          >
            <!-- 预览效果 -->
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store/index'
export default {
  name: 'my-image',
  data () {
    return {
      // 获取图片素材请求参数
      reqParams: {
        collect: false, // boolean 是否收藏，false-取消收藏，true-添加收藏
        page: 1,
        per_page: 8
      },
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 当前激活的选项卡的name属性的值
      activeName: 'image',
      //   图片列表数据
      images: [],
      // 图片总数
      total: 0,
      //   记录图片的地址、
      selectedImageUrl: null,
      //   设置请// 上传图片需要的头 携带的token'、
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 上传成功后的图片地址
      uploadImageUrl: null
    }
  },
  methods: {
    //   上传成功
    handleSuccess (res) {
    //   console.log(666)
      this.$message.success('上传图片成功')
      //   預覽地址设置成上传的地址实现预览
      this.uploadImageUrl = res.data.url
    },
    // 选中图片
    selectedImage (url) {
      // 记录当前你点击的图片地址
      this.selectedImageUrl = url
      //   console.log(this.selectedImageUrl)
    },
    openDialog () {
      // 控制对话框显示
      this.dialogVisible = true
      this.getImages()
    },
    // 点击切换全部与收藏
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页、
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 获取素材列表
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.img_list {
  margin-top: 10px;
  .img_item {
    width: 160px;
    height: 120px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    &.selected {
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
          no-repeat center/ 50px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      //   新的属性 设置图片平铺方式
      object-fit: contain;
    }
  }
}
.img_btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  display: block;
  width: 100%;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
