<template>
  <el-header class="header">
    <div class="headerRight">
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">欢迎你</div></el-col
        >

        <el-col :span="6">
          <div width="30%" class="grid-content bg-purple">
            <span class="el-icon-user-solid"></span>
            <span id="username">{{ this.$store.state.userinfo.username }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple exit">
            <router-link to="/login" @click.native="exit">退出</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-header>
</template>

<script>
export default {
  methods: {
    exit() {
      let eUserinfo = {
        username: "",
        power: "",
        number: "",
      };
      // this.$store.state.isLogin = true
      this.$store.commit("getUser", eUserinfo);
      // this.$store.commit("getIsLogin");
      sessionStorage.clear();
      // sessionStorage.setItem("isLogin",false)
      // console.log(this.$store.state.userinfo)
    },
  },
};
</script>
<style>
.name {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#username {
  display: block;
  /* width: 130px; */
}
.el-icon-user-solid {
  display: block;
  float: left;
}
.grid-content {
  width: 120px;
  /* border-radius: 4px;
    min-height: 36px; */
  height: 60px;
  /* padding-top: 0px; */
  display: flex;
  align-items: center;
}
.exit {
  margin-left: 62px;
}
</style>