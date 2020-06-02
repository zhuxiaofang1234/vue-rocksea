<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>显示普通全局变量{{ msgValue }}</p>
    <p>显示开发环境变量{{ url }}</p>
    <p>显示生产环境变量{{ baseUrl }}</p>
    <el-button type="info" @click="logout">退出</el-button>
    <el-button type="info" @click="handleData">点击</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      msgValue: process.env.VUE_APP_MSG,
      url: process.env.VUE_APP_URL,
      baseUrl: process.env.VUE_APP_BASEURL
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    handleData() {
      console.log(this.msgValue)
      console.log(this.url)
      console.log(this.baseUrl)
    }
  }
}
</script>
