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
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <router-link to="/login"><el-button class="back">返回登录</el-button></router-link>
        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data () {
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
      var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入6到18位的密码,并且包含数字和字母"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        power: 1,
        name : "",
        pass : "",
        checkPass : "",
      },
      rules: {
        name: [{ validator: validateUser, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
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
        const formData = {
          number:this.ruleForm.name,
          password:this.ruleForm.pass,
          power:this.ruleForm.power
        }
        this.$axios.post('/register',formData)
        .then(res =>{
          this.$message.success("注册成功!");
          this.$router.push("/login");
          console.log(res);
        }).catch((error) => {
            if (error) {
              this.$message.error("系统出错！");
            }
          });
        
      } else {
        console.log("error submit!!");
        return false;
      }
    },
  },
};
</script>
<style>
.loginOutside {
  background-image: url("../assets/login.jpg");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.container .login h1 {
  font-size: 24px;
}
.container .login .demo-ruleForm {
  margin: 0 auto;
  /* margin-top: -10px; */
}
el-form-item .user {
  margin-top: 40px;
}

.demo-ruleForm .submit {
  margin-top: 4px;
}
.demo-ruleForm .back {
  width: 290px;
  margin-left: 70px;
  margin-top: 10px;
}
.container .login .demo-ruleForm .submit button{
  width: 290px;
}
</style>