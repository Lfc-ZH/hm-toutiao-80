<template>
  <div class="app">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt />

    </el-card>
  </div>
</template>

<script>
export default {}
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
