//定义连接池
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: '120.27.2.122',
  user: 'fifth_group',
  password: '3sEzbyPS2tJ4S7D6',
  database: 'stu_info_manage',
  dateStrings: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
//定义通用的查询接口并将其导出
var query=function(sql,values,callback){
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err);
            callback(err,null,null);
        }else{
            conn.query(sql,values,function(qerr,results,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,results,fields);
            });
        }
    });
}; 
module.exports=query;
