<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">富文本</el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        <!-- 选择封面的图片按钮 -->
        <div class="img_btn"><img src="../../assets/images/default.png" alt=""></div>
        </el-form-item>
        <el-form-item label="频道：">
            <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">发表</el-button>
            <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articleForm: {
        //   文章标题
        title: '',
        cover: {
          type: 1
        },
        channel_id: null
      }
    }
  }
}
</script>

<style lang="less" scoped>
.img_btn{
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
