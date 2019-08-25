<template>
  <div class="app">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- model="loginForm" 动态绑定model属性  loginForm属性指定当前所有表单元素的数据结合 -->
        <!-- 登录模块-添加校验    Form 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，
        并将 Form-Item 的 `prop` 属性设置为需校验的字段名即可
        el-form  属性 rules 指定校验规则
        -->
        <!-- status-icon属性为输入框添加了表示校验结果的反馈图标。 -->
    <el-form :model="loginForm"  status-icon :rules="loginRules" style="margin-top:15px;" ref="loginForm">
        <el-form-item  prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code"  placeholder="请输入验证码" style="width:236px;margin-right:10px"></el-input>
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
    // 自定义效验规则
    // 需要规则对象中，配置选项 validator 执行的自己定义的校验函数/* / */
    const checkMobile = (rule, value, callback) => {
      // !/^1[3-9]\d{9}$/
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号输入不合法'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      // 表单效验对象
      loginRules: {
        // 给字段添加效验规则
        mobile: [
          //  required: true, 必填选项   trigger: 'blur' 失去焦点以后
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证吗', trigger: 'blur' },
          //  len: 6, 长度为多少
          { len: 6, message: '验证码长度为6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    denglu () {
      // alert('王武清是啥掉')
      // -整体校验 调用 validate 对整体进行校验
      this.$refs.loginForm.validate((vali) => {
        if (vali) {
          // console.log(333) 333
          // 校验成功之后调用接口
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
              // 成功 跳转
              this.$router.push('App.vue')
            })
            .catch(() => {
              this.$message.error('手机号或验证码错误')
            })
        }
      })
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
