const query = require("../dbconn.js");

// 根据学生账号查询学生的信息
exports.getstudentInfo = function (number, callback) {
  var arr = [];
  console.log("studentinfo", number);
  arr.push(number);
  query('SELECT * FROM `stu_info` WHERE number=?', arr, function (err, results, fields) {
    if (err) {
      console.log('数据查询失败');
      throw err;
    }
    callback(results);
  });
}
//学生信息页面修改学生信息
exports.updatestudentInfo = function (student, callback) {
  console.log("修改学生信息", student);
  let arr = []
  arr.push(student.msg.number);
  arr.push(student.msg.name);
  arr.push(student.msg.sex);
  arr.push(student.msg.phone);
  arr.push(student.msg.academy);
  arr.push(student.msg.major);
  arr.push(student.msg.address);
  arr.push(student.id)
  // console.log(arr);
  let updatesql = "update `stu_info` set number=?,name=?,sex=?,phone=?,academy=?,major=?,address=? where id = ?"
  query(updatesql, arr, function (err, results, fields) {
    if (err) {
      console.log('学生信息修改失败');
      throw err;
    }
    callback(results);
  });
}

//学生信息页面修改学生密码
exports.updatestudentPwd = function (student, callback) {
  console.log("修改学生密码", student);
  let arr = []
  arr.push(student.pwd.pwd2q);
  arr.push(student.id)
  console.log(arr);
  let updatesql = "update `stu_info` set password=? where id = ?"
  query(updatesql, arr, function (err, results, fields) {
    if (err) {
      console.log('学生密码修改失败');
      throw err;
    }
    callback(results);
  });
}