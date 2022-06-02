const query = require("../dbconn.js");


/**
 * 何滔
 */
// 查询一条用户信息
exports.getuser = function (user,callback) {
  var arr = [];
  arr.push(user.number);  
  arr.push(user.password);
  query('SELECT * FROM `user` WHERE number=? and password = ?',arr, function (err, results, fields) {
    if (err) {
      console.log('数据查询失败');
      throw err;
    }
    callback(results);
  });
}
// 查询一条学生信息
exports.getstudent = function (student,callback) {
  var arr = [];
  arr.push(student.number);
  arr.push(student.password);
  // console.log(arr);
  query('SELECT * FROM `stu_info` WHERE number=? and password = ?',arr, function (err, results, fields) {
    if (err) {
      console.log('数据查询失败');
      throw err;
    }
    callback(results);
  });
}
// //添加一条用户信息
// exports.adduser = function (teacher, callback) {
//   var arr = [];
//   arr.push(teacher.number);
//   arr.push(teacher.password);
//   arr.push(teacher.power);
//   // console.log(arr);
//   query('INSERT INTO `user` (number,password,power) VALUES (?,?,?)', arr, function (err, results, fields) {
//     if (err) {
//       console.log('数据添加失败');
//       throw err;
//     }
//     callback(results);
//   });
// }

