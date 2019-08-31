<template>
  <div>
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div class="btn_box">
        <el-radio-group @change="toggleCollect" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openDialog()" type="success" size="small" style="float:right">添加素材</el-button>
      </div>
      <!-- 列表 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="footer" v-if="!reqParams.collect">
            <span
              class="el-icon-star-off"
              @click="toggleStatus(item)"
              :class="{red:item.is_collected}"
            ></span>
            <span @click="delImage(item.id)" class="el-icon-delete"></span>
          </div>
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
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <!-- 上传组件 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        // 默认值 为false时 选择的是 全部 true为收藏
        collect: false,
        page: 1,
        per_page: 10
      },
      //   图片总数
      images: [],
      //   页码总条数
      total: 0,
      // 对话框显示隐藏数据
      dialogVisible: false,
      //   设置请求头
      headers: { Authorization: `Bearer ${store.getUser().token}` },
      //   预览图地址
      imageUrl: null
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    //   上传控件
    handleSuccess (res) {
      this.$message.success('上传素材成功')
      // 获取后台给的地址  给imageUrl赋值
      // res.data.url 才是地址  res叫响应主体
      this.imageUrl = res.data.url
      //   2s后，关闭对话框+更新列表
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
    //   添加素材
    openDialog () {
      this.dialogVisible = true
      // 其他业务  清空预览图
      this.imageUrl = null
    },
    // 删除素材
    delImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发请求
          await this.$http.delete(`user/images/${id}`)
          // 提示+更新列表
          this.$message.success('删除素材成功')
          this.getImages()
        })
        .catch(() => {})
    },
    //   添加收藏
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      //   成功
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      // 更新列表  重新获取数据---->按照后台的排序更新图片的顺序----->图片的位置改变---->体验不好
      // 只更新当图片的状态 即可。
      //   / 默认值 为false时 选择的是 全部 true为收藏
      item.is_collected = data.collect
    },
    // -全部与收藏切换
    toggleCollect () {
      // / 更换筛选条件 回到第一页进行预览
      this.reqParams.page = 1
      this.getImages()
    },
    // 页数显示
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 获取图片渲染
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      // 图片
      this.images = data.results
      // 全部页数
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      line-height: 30px;
      height: 30px;
      color: #fff;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
 .avatar-uploader{
     text-align: center;
     border: 1px dashed #ddd;
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
