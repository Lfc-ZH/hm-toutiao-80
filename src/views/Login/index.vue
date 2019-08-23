<template>
  <div class="app">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- model="loginForm" 动态绑定model属性  loginForm属性指定当前所有表单元素的数据结合 -->
    <el-form :model="loginForm" style="margin-top:15px;">
        <el-form-item>
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:236px;margin-right:10px"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
            <el-checkbox :value="true"> 我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button type="primary"  style="width:100%" @click="denglu">登录</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    denglu () {
      alert('王武清是啥掉')
    }
  }
}
</script>

<style lang="less" scoped>
.app {
  background: url(../../assets/images/login_bg.jpg) no-repeat center/ cover;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.box-card {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  img {
    width: 200px;
    display: block;
    margin: 0 auto;
  }
}
</style>
