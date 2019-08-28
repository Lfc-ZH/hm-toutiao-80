<template>
  <el-container class="my-container">
    <el-aside :width="!isCollapse ? '200px':'64px'" height="100%">
      <div class="logo" :class="{minlogo:isCollapse}"></div>
      <el-menu
        default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <!--
            第三学到的知识点
           1 防止用户恶意访问后台  使用路由守卫
           2 防止恶意调用服务器接口

           加 router 属性，把index的值当作路径进行跳转。
            default-active="2" 当前激活index属性的值
                background-color="#545c64" 背景颜色
        text-color="#fff" 文字颜色-->

        <!-- active-text-color="#ffd04b" 激活菜单文字颜色
           :collapse="isCollapse"  动态属性绑定 默认展开
            :collapse-transition="false" 取消组件的默认动画
        -->
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="icon el-icon-s-fold" @click="toggle()"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 组件是提供了监听点击过选项操作。
        - dropdown组件 command 事件  回调参数   选项的指令
         - dropdown-item组件，command属性的值 指令。
        command 事件  回调参数   选项的指令-->
        <el-dropdown class="my-dropdown " @command="clickItem">
          <span class="el-dropdown-link">
            <img class="avatar" :src="photo" alt />
            <span class="name">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!--   // 事件修饰符：@click.native 给组件绑定原生的事件 -->
            <el-dropdown-item icon="el-icon-setting" command="shezhi">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import store from '@/store'
export default {
  //   导航菜单  是通过属性 collapse 来控制展开与收起
  // - collapse  对应的数据值  false  展开
  // - collapse  对应的数据值  true  收起
  // 通过数据来控制状态：isCollapse  布尔类型
  created () {
    // 获取用户信息
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  methods: {
    clickItem (command) {
      // 判断值  setting 还是 logout
      // 如果 command === setting 调用  this.setting()
      // 如果 command === logout 调用  this.logout()
      this[command]()
    },
    toggle () {
      // 切换两个形态
      // vue 操作样式 ：style ：class
      // console.log(666)
      this.isCollapse = !this.isCollapse
    },
    shezhi () {
      this.$router.push('/setting')
    },
    logout () {
      // 删除本地用户信息
      store.delUser()
      // 2. 跳转到登录
      this.$router.push('/lg')
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;

    .logo {
      width: 100%;
      height: 60px;
      background: url(../../assets/images/logo_admin.png) no-repeat center/
        140px auto;
    }
    .minlogo {
      background: url(../../assets/images/logo_admin_01.png) no-repeat center;
      background-size: 36px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
    }
    .my-dropdown {
      float: right;
      .avatar {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .name {
        color: #333;
        font-weight: bold;
        vertical-align: middle;
      }
    }
  }
}
</style>
