<template>
  <div id="userProfile">
    <el-container>
      <el-header>个人信息管理</el-header>
      <el-main>
        <el-table :data="stuData">
          <el-table-column label="学号">
            <template slot-scope="scope">
              <span>{{ scope.row.number }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="性别">
            <template slot-scope="scope">
              <span>{{ scope.row.sex }}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话号码">
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="学院">
            <template slot-scope="scope">
              <span>{{ scope.row.academy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="专业">
            <template slot-scope="scope">
              <span>{{ scope.row.major }}</span>
            </template>
          </el-table-column>
          <el-table-column label="地址">
            <template slot-scope="scope">
              <span>{{ scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="updatemsg = true"
                class="cbtn1"
                >修改信息</el-button
              >
            </template>
            <template>
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="updatepwd = true"
                class="cbtn2"
                >修改密码</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <el-dialog title="信息修改" :visible.sync="updatemsg" width="50%">
      <el-form :model="msgform" label-width="80px">
        <el-form-item label="姓名">
          <el-input
            v-model="msgform.name"
            maxlength="6"
            minlength="2"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="msgform.number" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="msgform.sex" class="select">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话">
          <el-input
            v-model="msgform.phone"
            maxlength="11"
            minlength="7"
            show-word-limit
            oninput="value=value.replace(/[^\d]/g,'')"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input
            v-model="msgform.address"
            maxlength="20"
            minlength="2"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-select v-model="msgform.academy" placeholder="请选择学院">
            <el-option
              label="计算机与软件学院"
              value="计算机与软件学院"
            ></el-option>
            <el-option label="电子信息学院" value="电子信息学院"></el-option>
            <el-option label="机械工程学院" value="机械工程学院"></el-option>
            <el-option label="建筑学院" value="建筑学院"></el-option>
            <el-option
              label="土木与环境工程学院"
              value="土木与环境工程学院"
            ></el-option>
            <el-option
              label="文学与传媒学院"
              value="文学与传媒学院"
            ></el-option>
            <el-option label="工商管理学院" value="工商管理学院"></el-option>
            <el-option label="艺术学院" value="艺术学院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="msgform.major" placeholder="请选择专业">
            <el-option label="软件工程" value="软件工程"></el-option>
            <el-option label="通信工程" value="通信工程"></el-option>
            <el-option label="机械电子工程" value="机械电子工程"></el-option>
            <el-option label="工程造价" value="工程造价"></el-option>
            <el-option label="土木工程" value="土木工程"></el-option>
            <el-option label="网络与新媒体" value="网络与新媒体"></el-option>
            <el-option label="人力资源管理" value="人力资源管理"></el-option>
            <el-option
              label="播音与主持艺术"
              value="播音与主持艺术"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="updateStudentInfo(this)"
          >提交</el-button
        >
      </el-form>
    </el-dialog>

    <el-dialog title="密码修改" :visible.sync="updatepwd" width="50%">
      <el-form ref="form" :model="pwdform" label-width="80px">
        <el-form-item label="原始密码">
          <el-input
            v-model="pwdform.pwd1"
            type="password"
            maxlength="15"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input
            v-model="pwdform.pwd2"
            type="password"
            maxlength="15"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            v-model="pwdform.pwd2q"
            type="password"
            maxlength="15"
            show-password
          ></el-input>
        </el-form-item>
        <el-button @click="updatepwd = false">取 消</el-button>
        <el-button type="primary" @click="updateStudentPwd(this)"
          >确 定</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "userProfile",
  data() {
    return {
      updatemsg: false,
      updatepwd: false,
      stuData: [],
      stuId: "",
      msgform: {
        name: "",
        number:"",
        sex: "",
        phone: "",
        address: "",
        academy: "",
        major: "",
      },
      pwdform: {
        pwd1: "",
        pwd2: "",
        pwd2q: "",
      },
    };
  },
  created() {
    this.getStudentInfo();
  },
  methods: {
    getStudentInfo() {
      // console.log("更新的数据number", this.$store.state.userinfo.number);
      this.$axios
        .get("/getstudentinfo", {
          params: { number: this.$store.state.userinfo.number },
        })
        .then((response) => {
          this.stuData = response.data;
          this.msgform.number = this.stuData[0].number
          // console.log(response);
          this.stuId = this.stuData[0].id;

        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateStudentInfo() {
      console.log("stuId", this.stuId);
      this.$confirm("确认提交表单?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "提交成功!",
          });
          this.updatemsg = false;
          let stuobj = {
            id: this.stuId,
            msg: this.msgform,
          };
          this.$axios
            .post("/updatestudentInfo", stuobj)
            .then((response) => {
              // alert("更新数据成功");
              this.getStudentInfo();
              console.log("更新成功", response);
            })
            .catch((error) => {
              console.log("数据失败", error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },

    updateStudentPwd() {
      // console.log("stuId", this.stuId);
      this.updatepwd = false;
      // console.log(this.pwdform.pwd1, this.stuData[0].password);
      // console.log(typeof this.pwdform.pwd1, typeof this.stuData.password);
      if (this.pwdform.pwd1 != this.stuData[0].password) {
        alert("你输入的原始密码不正确，请重新输入！");
        this.updatepwd = true;
        return;
      }
      if (this.pwdform.pwd2 == "" || this.pwdform.pwd2q == "") {
        alert("请输入更改密码！");
        this.updatepwd = true;
        return;
      }
      if (
        this.pwdform.pwd1 == this.pwdform.pwd2q ||
        this.pwdform.pwd1 == this.pwdform.pwd2
      ) {
        alert("新密码不能和旧密码相同");
        this.updatepwd = true;
        return;
      }
      if (this.pwdform.pwd2 != this.pwdform.pwd2q) {
        alert("密码不一致");
        this.updatepwd = true;
        return;
      }

      let stuobj = {
        id: this.stuId,
        pwd: this.pwdform,
      };
      this.$axios
        .post("/updatestudentpwd", stuobj)
        .then((response) => {
          console.log(response);
          alert("密码更换成功");
          this.getStudentInfo();
          console.log("更新数据", response);
        })
        .catch((error) => {
          console.log("数据更新出错", error);
        });
    },
  },
};
</script>

<style>
#Studentinfo {
  width: 100%;
  margin: 0 auto;
}
.el-header,
.el-main,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.cell th {
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-select {
  width: 100%;
}
.el-table .cell {
  text-align: center;
}
.cbtn1 {
  margin-left: 0 !important;
  padding: 10px !important;
}
.cbtn2 {
  margin-top: 5px !important;
  margin-left: 0 !important;
  padding: 10px !important;
}
.el-radio-group {
  display: block !important;
}
.select {
  width: 300px !important;
  margin-left: -30% !important;
  margin-top: 12px !important;
}
</style>