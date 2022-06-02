const query = require("../dbconn.js");



//钟超
// 查询一条学生信息
exports.getstudent = function (number,callback) {
  var arr = [];
  arr.push(number);  
  query('SELECT * FROM `stu_info` WHERE number=?',arr, function (err, results, fields) {
    if (err) {
      console.log('数据查询失败');
      throw err;
    }
    callback(results);
  });
}

// 查询所有的学生信息
exports.getstudents = function (callback) {
  query('SELECT * FROM `stu_info`', function (err, results, fields) {
    if (err) {
      console.log('数据查询失败');
      throw err;
    }
    callback(results);
  });
}

//添加一条学生信息
exports.addstudent = function (student, callback) {
  var arr = [];
  arr.push(student.number);
  arr.push(student.password);
  arr.push(student.name);
  arr.push(student.sex);
  arr.push(student.phone);
  arr.push(student.academy);
  arr.push(student.major);
  arr.push(student.address);
  arr.push(student.power);
  console.log(arr);
  query('INSERT INTO `stu_info` ( number,password,name,sex,phone,academy,major,address,power) VALUES (?,?,?,?,?,?,?,?,?)', arr, function (err, results, fields) {
    if (err) {
      console.log('数据添加失败');
      throw err;
    }
    callback(results);
  });
}
// 删除一条学生信息
exports.delStudent = function(number,callback){
  var arr = [];
  arr.push(number);   
  query('delete FROM `stu_info` WHERE `number` = ?', arr,function (err, results, fields) {
      if(err){
          console.log('数据删除失败');
          throw err;
      }        
      callback(results);
  });
}
//修改一条学生信息
exports.edistudent = function (student, callback) {
  var arr = [];
  arr.push(student.number);
  arr.push(student.password);
  arr.push(student.name);
  arr.push(student.sex);
  arr.push(student.phone);
  arr.push(student.academy);
  arr.push(student.major);
  arr.push(student.address);
  arr.push(student.id);
  console.log(arr);
  query(`UPDATE stu_info SET number=?,password=?,name=?,sex=?,phone=?,academy=?,major=?,address=? WHERE id=?`, arr, function (err, results, fields) {
    if (err) {
      console.log('修改添加失败');
      throw err;
    }
    callback(results);
  });
}

//张正宇
// 返回所有记录
exports.getall =  function(callback){
  let sql = 'SELECT * FROM `stu_info`'
  query(sql,function (err, results, fields) {
    if(err){
        console.log('数据查询失败');
        throw err;
    }    
    callback(results);
  });
}
// 返回指定记录
exports.get = function(key,val,callback){
  var arr = []
  arr.push(val)
  console.log(key,val)
    let sql = "SELECT * FROM `stu_info` WHERE "+key+" = ?"
    // console.log(sql)
    query(sql,arr,function (err, results, fields) {
        if(err){
            console.log('数据查询失败');
            throw err;
        }        
        callback(results);
    });
}
