<template>
  <div class="heightFull">
    <my-header id="header"></my-header>
  <el-container class="heightFull">
    <el-container class="heightFull">
      <my-aside id="aside"></my-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    
  </el-container>
  </div>
  
</template>

<script>
import MyHeader from '../components/Header'
import MyAside from '../components/Aside'

export default {
  
  name: "Home",
  components: {
    MyHeader,
    MyAside
  },
  methods: {
    methodName() {
      this.$axios
        .get("/books")
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  // 组件创建之前
    created() {
      //在页面加载时读取sessionStorage里的状态信息 如果有的话就存进vuex里面
      if (sessionStorage.getItem("storedata") ) {
          this.$store.replaceState(Object.assign({},             
          this.$store.state,JSON.parse(sessionStorage.getItem("storedata"))))
      }
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
          sessionStorage.setItem("storedata",JSON.stringify(this.$store.state))
      });
      // 兼容iphone手机
      window.addEventListener("pagehide",()=>{
          sessionStorage.setItem("storedata",JSON.stringify(this.$store.state))
      });
      //如果页面加载的时候sessionstorage没有的话 就从vuex中取
      sessionStorage.setItem("userinfo",this.$store.state.userinfo)
    }
}
    
</script>
<style>
.header a{
  color: #fff;
  text-decoration: none;
}
.header a:hover{
  /* color: #333; */
  text-decoration: underline;
}
.el-header,
.el-footer {
  width: 100%;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /* background-color: #3A4369; */
  color: #848BAD;
  text-align: center;
  /* line-height: 200px; */
  height: 100%;
}
.el-aside a{
  text-decoration: none;
  color: #848BAD;
}
.el-aside a:hover{
  text-decoration: underline;
  color: #fff;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
  height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
  /* display: block; */
  width: 100%;
}
.heightFull {
  height: 100%;
}

.headerRight{
  width: 300px;
  float: right;
}
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
    margin-bottom: 0;
  } */
}


.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
}
.el-container{
  width: 100%;
}
#header,#aside{
  background-color: #3A4369;
  color: #848BAD;

}
#header{
  color: #fff;
}
li .el-submenu__title{
  color: #848BAD;

}
li .el-submenu__title:hover {
  color: #fff;
  background-color: #5575E3;
}
.el-submenu{
  background-color: #3A4369;
}
.el-submenu .el-menu-item:hover{
  background-color: #5575E3;
  text-decoration: underline;

}
.el-submenu .el-menu-item:hover a{
  color: #fff;

}
.el-submenu [class^=el-icon-]{
    color: #848BAD;

}

li .el-submenu__title:hover [class^=el-icon-],.el-icon-arrow-down{
  color: #fff;
}
</style>