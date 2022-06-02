<template>
  <div class="Adminstuinfo">
    <div class="container">
      <div class="operation">
        <el-button
          type="primary"
          class="add-but"
          @click="addStuDialogFormVisible = true"
          >添加</el-button
        >
        <el-dialog
          title="信息填写"
          :visible.sync="addStuDialogFormVisible"
          width="50%"
        >
          <el-form :model="addstuform">
            <el-form-item label="学号" :label-width="formLabelWidth">
              <el-col :span="11">
                <el-input
                  v-model="addstuform.number"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-col :span="11">
                <el-input
                  v-model="addstuform.password"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-col :span="11">
                <el-input
                  v-model="addstuform.name"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-col :span="11">
                <el-input
                  v-model="addstuform.sex"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="电话号码" :label-width="formLabelWidth">
              <el-col :span="11">
                <el-input
                  v-model="addstuform.phone"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="学院" :label-width="formLabelWidth">
              <el-col :span="11">
                <el-input
                  v-model="addstuform.academy"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="专业" :label-width="formLabelWidth">
              <el-col :span="11">
                <el-input
                  v-model="addstuform.major"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
              <el-col :span="11">
                <el-input
                  v-model="addstuform.address"
                  autocomplete="off"
                ></el-input>
              </el-col>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addStuDialogFormVisible = false"
              >取 消</el-button
            >
            <el-button
              type="primary"
              :disabled="addBoolean"
              @click="addStudent()"
              >确 定</el-button
            >
          </div>
        </el-dialog>
        <div class="select-div">
          <el-form :inline="true" :model="secletline" class="demo-form-inline">
            <el-form-item label="查询字段">
              <el-select v-model="secletline.info" placeholder="字段名">
                <el-option label="学号" value="number"></el-option>
                <el-option label="姓名" value="name"></el-option>
                <el-option label="性别" value="sex"></el-option>
                <el-option label="电话号码" value="pgone"></el-option>
                <el-option label="学院" value="academy"></el-option>
                <el-option label="专业" value="major"></el-option>
                <el-option label="地址" value="address"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="查询值">
              <el-input
                v-model="secletline.value"
                placeholder="查询值"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="line"></div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="学号" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="密码" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.password }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话号码" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学院" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.academy }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专业" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.major }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" width="320">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="这是一条学生信息确定删除吗？"
              @confirm="deleteStudent(scope.$index, scope.row)"
            >
              <el-button slot="reference" size="mini" type="danger"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 学生信息修改弹出框 -->
      <el-dialog
        title="学生信息修改"
        :visible.sync="putStuDialogFormVisible"
        width="50%"
      >
        <el-form :model="putstuform">
          <el-form-item label="学号" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input
                v-model="putstuform.number"
                autocomplete="off"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input
                v-model="putstuform.password"
                autocomplete="off"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input v-model="putstuform.name" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input v-model="putstuform.sex" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input
                v-model="putstuform.phone"
                autocomplete="off"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="学院" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input
                v-model="putstuform.academy"
                autocomplete="off"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="专业" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-input
                v-model="putstuform.major"
                autocomplete="off"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-col :span="15">
              <el-input
                v-model="putstuform.address"
                autocomplete="off"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="putStuDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" :disabled="putBoolean" @click="ediStudent()"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6"></el-col>
        <el-col :span="6">
        <el-pagination
                background
                :page-size="pageSize"
                :current-page="currentpage"
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="total_page"
              >
        </el-pagination>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Adminstuinfo",
  data() {
    return {
      //是否显示添加学生表单弹出框
      addStuDialogFormVisible: false,
      //添加学生表单数据
      addstuform: {
        number: "",
        name: "",
        password: "",
        sex: "",
        phone: "",
        academy: "",
        major: "",
        address: "",
        power: 1,
      },
      //添加学生表单提交按钮是否禁用
      addBoolean: true,
      //添加学生表单组件宽度
      formLabelWidth: "120px",

      //学生信息展示数组
      tableData: [],

      //学生修改表单是否弹出属性
      putStuDialogFormVisible: false,
      //修改学生表单数据
      putstuform: {
        id: "",
        number: "",
        password: "",
        name: "",
        sex: "",
        phone: "",
        academy: "",
        major: "",
        address: "",
      },
      //修改学生表单确认按钮是否禁用
      putBoolean: true,

      secletline: {
        info: "",
        value: ""
      },

      //zzy
      total_page: 0,
      currentpage: 1,
      pageSize: 8,
      formatdate: []
    };
  },
  components: {},
  //钩子函数
  created() {
    // if(!sessionStorage.getItem("isLogin")){
    //   alert("请先登录！");
    //    this.$router.push("/login");
    // }
    console.log(sessionStorage.getItem("storedata"));
    this.getStudents();
    this.handleCurrentChange(this.currentpage - 1);
  },
  methods: {
    //获取全部学生信息
    getStudents() {
      this.$axios
        .get("/students")
        .then(response => {
          this.total_page = response.data.length;
          this.formatdate = this.dataFormat(response.data, this.pageSize);
          //获取到的数据直接给到学生信息数组
          // console.log(this.formatdate)
          // console.log(this.currentpage);
          // console.log(this.formatdate[0]);
          if (this.currentpage == 0) {
            this.tableData = this.formatdate[this.currentpage];
          } else {
            this.tableData = this.formatdate[this.currentpage - 1];
          }
          // this.tableData = this.formatdate[0];
          // if (response) {
          //   //获取到的数据直接给到学生信息数组
          //   this.tableData = response.data;
          // }
        })
        .catch(error => {
          if (error) {
            this.$message.error("系统出错！");
          }
        });
    },
    //添加一个学生
    addStudent() {
      this.$axios
        .get("/student", { params: { number: this.addstuform.number } })
        .then(response => {
          if (response.data.length == 0) {
            this.addStuDialogFormVisible = false;
            this.$axios
              .post("/addStudent", this.addstuform)
              .then(response => {
                if (response) {
                  this.$message({
                    message: "添加学生成功！",
                    type: "success"
                  });
                  this.getStudents();
                  console.log(response);
                }
              })
              .catch(error => {
                if (error) {
                  this.$message.error("添加学生出错！");
                }
              });
          } else {
            this.$message({
              message: "你输入的学号已存在！请重新输入",
              type: "warning"
            });
          }
        })
        .catch(error => {
          if (error) {
            this.$message.error("系统出错！");
          }
        });
    },
    //删除一个学生
    deleteStudent(index, row) {
      this.$axios
        .delete("/student", { params: { number: row.number } })
        .then(response => {
          if (response) {
            this.$message({
              message: "删除学生信息成功！",
              type: "success"
            });
            this.getStudents();
          }
        })
        .catch(error => {
          if (error) {
            this.$message.error("删除学生信息出错！");
          }
        });
    },
    //修改按钮数据传输方法
    handleEdit(index, row) {
      this.putStuDialogFormVisible = true;
      let fromkeys = Object.keys(row);
      fromkeys.forEach(item => (this.putstuform[item] = row[item]));
    },
    //修改学生数据
    ediStudent() {
      //判断是否有相同的学号的学生记录
      this.$axios
        .get("/student", { params: { number: this.putstuform.number } })
        .then(response => {
          //如果返回的学生记录（长度为0）则直接进行添加添加请求
          if (!response.data.length) {
            this.putStuDialogFormVisible = false;
            this.$axios
              .put("/student", this.putstuform)
              .then(response => {
                if (response) {
                  this.$message({
                    message: "修改学生信息成功！",
                    type: "success"
                  });
                  this.getStudents();
                  console.log(response);
                }
              })
              .catch(error => {
                if (error) {
                  this.$message.error("修改学生信息出错！");
                }
              });
          } else {
            //如果返回的学生记录（长度不为0）则判断是否与本条数据的id值一致
            //一致则表示正在修改本条数据
            if (response.data[0].id == this.putstuform.id) {
              this.putStuDialogFormVisible = false;
              this.$axios
                .put("/student", this.putstuform)
                .then(response => {
                  if (response) {
                    this.$message({
                      message: "修改学生信息成功！",
                      type: "success"
                    });
                    this.getStudents();
                    console.log(response);
                  }
                })
                .catch(error => {
                  if (error) {
                    this.$message.error("修改学生信息出错！");
                  }
                });
            } else {
              this.$message({
                message: "你输入的学号已存在！请重新输入",
                type: "warning"
              });
            }
          }
        })
        .catch(error => {
          if (error) {
            this.$message.error("系统出错！");
          }
        });
    },
    onSubmit() {
      console.log("submit!");
      this.$axios
        .post("/students", {
          type: this.secletline.info,
          value: this.secletline.value
        })
        .then(res => {
          console.log(res);
          this.total_page = res.data.length;
          this.formatdate = this.dataFormat(res.data, this.pageSize);
          //获取到的数据直接给到学生信息数组
          // console.log(this.formatdate)
          this.tableData = this.formatdate[0];
          this.secletline.info = "";
          this.secletline.value = "";
        });
    },

    // 页面改变时
    handleCurrentChange(val) {
      // console.log(val);
      this.currentpage = val;
      this.tableData = this.formatdate[val - 1];
    },
    // 数据分组
    dataFormat(arr, size = 1) {
      let index = 0;
      let res = [];
      while (index < arr.length) {
        res.push(arr.slice(index, index + size));
        index += size;
      }
      return res;
    }
  },
  watch: {
    //监听添加学生数据的变化只要一个为空则不能提交
    addstuform: {
      handler: function() {
        let formkeys = Object.keys(this.addstuform);
        this.addBoolean = true;
        for (let i of formkeys) {
          if (this.addstuform[i] == "") {
            this.addBoolean = true;
            return;
          }
        }
        this.addBoolean = false;
      },
      deep: true
    },
    //监听修改学生数据的变化只要一个为空则不能提交
    putstuform: {
      handler: function() {
        let formkeys = Object.keys(this.putstuform);
        this.putBoolean = true;
        for (let i of formkeys) {
          if (this.putstuform[i] == "") {
            this.putBoolean = true;
            return;
          }
        }
        this.putBoolean = false;
      },
      deep: true
    }
  }
};
</script>
<style>
.Adminstuinfo {
  text-align: left;
}
/* .Adminstuinfo .container {
   width: 80%; 
} */
.Adminstuinfo .container .operation {
  overflow: hidden;
}
.Adminstuinfo .container .operation .add-but {
  float: left;
}
.Adminstuinfo .container .operation .select-div {
  float: right;
}
.Adminstuinfo .container .operation .select-div .el-form {
  height: 40px !important;
}
.Adminstuinfo .container .operation .select-div .el-form-item {
  margin-bottom: 0px !important;
  line-height: 40px;
  height: 40px !important;
}
/* .Adminstuinfo .container .operation .select-div .select-sel {
  display: inline;
} */
.Adminstuinfo .container .operation .select-div .select-sel,
.elect-inp {
  display: inline !important;
}
.Adminstuinfo .container .operation .select-div .select-but {
  margin-left: 5px;
}
.Adminstuinfo .container .line {
  height: 2px;
  border: none;
  background-color: #e4e7ed;
  margin: 5px 0px;
}
</style>
