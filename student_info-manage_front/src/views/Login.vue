<template>
  <div class="container loginOutside">
    <div class="login">
      <h1>欢迎登录学生信息系统</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名：" prop="name" class="user">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="身份：" prop="resource">
          <el-radio-group
            v-model="ruleForm.resource"
            class="select"
            @change="change"
          >
            <el-radio label="1">学生</el-radio>
            <el-radio label="2">管理员</el-radio>
          </el-radio-group>
          <!-- <router-link to="/register" class="reg" v-show="ruleForm.show">点击注册</router-link> -->
        </el-form-item>

        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <!-- <button @click="login">登录</button> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      // var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      }  else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        show: false,
        name: "",
        pass: "",
        number: "",
        checkPass: "",
        resource: "",
      },

      rules: {
        name: [{ validator: validateUser, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }],
        resource: [
          { required: true, message: "请选择身份", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    change: function (value) {
      // console.log(11);
      this.ruleForm.show = value === "1" ? true : false;
      console.log(this.ruleForm.show);
      // this.ruleForm.show = value === "1" ? true : false; // 选择老师按钮时出现点击注册
    },
    submitForm(formName) {
      let valid1 = true;
      this.$refs[formName].validate(function (valid) {
        if (valid) {
          valid1 = valid;
        } else {
          valid1 = valid;
        }
      });
      if (valid1) {
        if (this.ruleForm.show == true) {
          // console.log(this.ruleForm.show);
          this.$axios
            .get("/loginstudent", {
              params: {
                username: this.ruleForm.name,
                password: this.ruleForm.pass,
              },
            })
            .then((res) => {
              console.log(res);
              if (res) {
                if (res.data.length > 0) {
                  console.log(res.data[0]);
                  let thisInfo = {};
                  ({name:thisInfo.username,power:thisInfo.power,number:thisInfo.number} = res.data[0]);
                  this.$store.commit('getUser',thisInfo);
                  sessionStorage.setItem("storedata",JSON.stringify(this.$store.state))
                  sessionStorage.setItem('isLogin',true)
                  // alert("submit!");
                  this.$router.push("/home/userProfile");
                } else {
                  this.$message.error("账号密码错误！");
                }
              }
            })
            .catch((error) => {
              if (error) {
                this.$message.error("系统出错！");
              }
            });
        }else{
          this.$axios
            .get("/loginadmin", {
              params: {
                username: this.ruleForm.name,
                password: this.ruleForm.pass,
              },
            })
            .then((res) => {
              console.log(res);
              if (res) {
                if (res.data.length > 0) {
                  console.log(res.data[0]);
                  let thisInfo = {};
                  ({number:thisInfo.username,power:thisInfo.power,number:thisInfo.number} = res.data[0]);
                  // this.$store.state.isLogin = true
                  this.$store.commit('getUser',thisInfo);
                  sessionStorage.setItem("storedata",JSON.stringify(this.$store.state))
                  sessionStorage.setItem('isLogin',true)
                  // if(this.$router.params.redirect){
                  //   this.$router.push(this.$router.params.redirect)
                  // }
                  // alert("submit!");
                  this.$router.push("/home/studentManage");
                } else {
                  this.$message.error("账号密码错误！");
                }
              }
            })
            .catch((error) => {
              if (error) {
                this.$message.error("系统出错！");
              }
            });
        }
      } else {
        console.log("error submit!!");
        return false;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.loginOutside {
  background-image: url("../assets/login.jpg");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.container .login h1 {
  /* margin-top: 20px; */
  padding-top: 30px;
  /* color: #409EFF; */

  text-align: center;
  font-size: 24px;
}
.container .login .demo-ruleForm {
  margin: 0 auto;
  margin-top: 20px;
  /* margin-left: 10px; */
}
.container .login {
  position: absolute;
  width: 500px;
  height: 420px;
  background-color: white;
  border-radius: 16px;
  /* margin-top: 150px; */
  top: 50%;
  margin-top: -250px;
  left: 50%;
  margin-left: -250px;
}
.demo-ruleForm {
  width: 360px;
}
.demo-ruleForm .user {
  margin-top: 60px;
}
/* .el-radio-group .select{
  margin-top: 2px;
  margin-left: -84px;
  width: 200px;
} */
.login .demo-ruleForm .select {
  margin-top: 2px;
  margin-left: 2px;
  width: 200px;
}
.login .demo-ruleForm .reg {
  text-decoration: none;
  color: #606266;
  font-size: 14px;
  margin-left: 30px;
}
.demo-ruleForm .submit {
  margin-top: 30px;
}
.container .login .demo-ruleForm .submit button {
  width: 290px;
}
</style>