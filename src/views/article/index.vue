<template>
  <div class="container">
    <!-- 删选项 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <!-- 使用封装的组件 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单、 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <!-- clearable 清空功能 -->
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道:" >
          <my-channel v-model="reqParams.channel_id"></my-channel >
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="shijan"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 删选结果 -->
    <el-card>
      <div>根据筛选条件共查询到 {{total}} 条结果：</div>
      <el-table :data="articles">
        <el-table-column prop="date" label="封面">
          <!-- 使用作用域插槽 -->
          <template slot-scope="scope">
            <el-image
              :src="scope.row.cover.images[0]"
              style="width:160px;height:100px;border:1px solid #ddd"
              fit="contain"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click="$router.push('/publish?id='+scope.row.id)" type="primary" icon="el-icon-edit" plain circle></el-button>
            <el-button
              type="danger"
              @click="delArticle(scope.row.id)"
              icon="el-icon-delete"
              plain
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        lass="pager"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      ></el-pagination>
      <!--每页显示条目个数  :page-size="reqParams.per_page" -->
      <!--当前页码   :current-page="page" -->
    </el-card>
  </div>
</template>
<script>

export default {
  data () {
    return {
      // 提交给后台的参数对象
      // 通过axios提交给后台，字段的值为null，这项数据不会提交。
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1, // 页数
        per_page: 20 // 每页显示多少数据
      },
      // 频道的下拉选项数据
      // channelOptions: [],
      // 时间管理
      shijan: [],
      // 文章管理
      articles: [],
      // 文章总数
      total: 0
    }
  },
  created () {
    // 调用函数
    // this.getChannelOpetions()
    // 获取文章列表数据`
    this.getArticles()

    this.changePager()
  },

  methods: {
    // / 选择日期范围后触发的函数
    changeDate (valueArr) {
      // valueArr 选中的日期范围值  [起始日期，结束日期]
      // 清空功能 valueArr === null
      if (valueArr) {
        this.reqParams.begin_pubdate = valueArr[0]
        this.reqParams.end_pubdate = valueArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },

    // - 获取文章列表数据`
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // - 获取数据给 articles 赋值
      this.articles = data.results
      // 获取到文章总数
      this.total = data.total_count
    },

    // 改变页码
    changePager (newPage) {
      // 它自带新页码 在赋值给 page
      this.reqParams.page = newPage
      // 在重新调用文章 渲染页面
      this.getArticles()
    },
    // 筛选
    search () {
      // 页码重置到 1
      this.reqParams.page = 1
      // 当点击清空频道时 channel_id 变成了空/*  */
      // 严谨处理 channel_id === "" 改成 null
      // if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      //  获取数据npm i json-bigint
      this.getArticles()
    },
    delArticle (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击确认后 发送接口 删除数据
          // get 获取数据 post 添加数据 delete 删除属性 put 完整修改数据 patch 局部修改数据
          await this.$http.delete(`articles/${id}`)
          this.$message.success('删除成功')
          this.getArticles()
        })
        .catch(() => {

        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
