<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改':'发布'}}文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <!-- 富文本 -->
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group @change="changeType" v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 选择封面的图片按钮 -->
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <!-- 通过提交不同的参数（draft  false 发表  true 存入草稿 在url?后传参），区分不的业务。 -->
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <!-- 通过提交不同的参数（draft  false 发表  true 存入草稿 在url?后传参），区分不的业务。 -->
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },

  data () {
    return {
      // 富文本配置
      editorOption: {
        placeholder: '', // 占位符 默认不需要
        modules: {
          toolbar: [
            // 加粗    斜体。    下划线           删除线
            ['bold', 'italic', 'underline', 'strike'],
            // 双引号       代码文本
            ['blockquote', 'code-block'],
            // 标题1        标题2
            [{ header: 1 }, { header: 2 }],
            //    有序列表        无序列表
            [{ list: 'ordered' }, { list: 'bullet' }],
            //  向后缩进                 向前缩进
            [{ indent: '-1' }, { indent: '+1' }],
            // 图片
            ['image']
          ]
        }
      },
      articleForm: {
        //   文章标题
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      // 申明编辑的时候才会有的文章ID
      articleId: null
    }
  },
  // 监听 $route.query.id 变化 重置表单数据  清空文章id数据
  watch: {
    '$route.query.id': function (newVal, oldVla) {
      // 当发布文章改成修改文章   ‘回退历史’
      if (newVal) {
        // 判断业务articleId 存在修改  不存在 发表
        this.articleId = this.$route.query.id
        if (this.articleId) {
          /// 获取数据 填充表单
          this.getArticle()
        }
        return false
      }
      // 当编辑文章改成发布文章时。
      this.articleForm = {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
      this.articleId = null
    }
  },
  created () {
    // 判断业务articleId 存在修改  不存在 发表
    this.articleId = this.$route.query.id
    if (this.articleId) {
      // 获取数据 填充表单
      this.getArticle()
    }
  },
  methods: {
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    // 当点击 '单图 或 三图'  切换类型的时候 重置数据
    changeType () {
      this.articleForm.cover.images = []
    },
    // <!-- 通过提交不同的参数（draft  false 发表  true 存入草稿 在url?后传参），区分不的业务。 -->
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // 成功
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    async update (draft) {
      // / 地址多了ID  请求方式put  其他不变
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      // 成功
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      this.$router.push('/article')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
