<template>
  <el-aside class="aside" width="200px">
        <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        
        <template slot="title" id="center" class="common bgc"><i class="el-icon-user"></i>个人中心</template>
        <el-menu-item index="2-1" class="common bgc"><router-link to="/home/userProfile">信息中心</router-link></el-menu-item>
        
      </el-submenu>
      <el-submenu index="2" v-show="show">
        <template slot="title" id="manage" class="common bgc"><i class="el-icon-edit"></i>学生管理</template>
        <el-menu-item index="2-1" class="common bgc"><router-link to="/home/studentManage">信息管理</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title" id="feedback" class="common bgc"><i class="el-icon-chat-line-round"></i>信息反馈</template>
        <el-menu-item index="2-1" class="common bgc"><router-link to="/home/feedBack">留言反馈</router-link></el-menu-item>

        
      </el-submenu>
      
    </el-menu>

      </el-aside>
</template>

<script>
export default {
  data(){
    return{
      show:this.$store.state.userinfo.power==0?true:false,
    }
  },
}
</script>
<style>
.common,.bgc,#feedback,#center,#manage{
  background-color: #3A4369;
}
</style>
