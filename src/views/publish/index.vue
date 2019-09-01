<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
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
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 选择封面的图片按钮 -->
            <my-image></my-image>
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
          type: 1
        },
        channel_id: null
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
