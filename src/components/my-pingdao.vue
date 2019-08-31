<template>
  <el-select @change="changeChannel" clearable :value="value" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>
<script>
export default {
  name: 'my-channel',
  //   使用父传过来的数据   :value="value"  props: ['value'],
  props: ['value'],
  data () {
    return {
    //   value: null,
      channelOptions: []
    }
  },
  created () {
    this.getChannelOpetions()
  },
  methods: {
    changeChannel (channelId) {
      // 如果清空 值是“”  处理成null
      if (channelId === '') channelId = null
      // 将你选中的频道ID提交给父组件
      this.$emit('input', channelId)
    },
    // 获取频道内容信息  在组件初始化完毕
    // - 获取后台的数据
    // - 获取数据给channelOptions赋值
    async getChannelOpetions () {
      // 获取到后台数据
      const {
        data: { data }
      } = await this.$http.get('channels')
      // 数据赋值到channelOptions
      this.channelOptions = data.channels
    }
    // 在组件初始化完毕，根据默认筛选条件查询
    // data.results 才是文章列表
    // post 请求  post(url,数据)
    // get 请求 get(url,{params:数据})
  }
}
</script>

<style lang="less" scoped>
</style>
