const express = require('express');
const stumanagequery = require('./query/stu_manage_query');
const loginquery = require('./query/login_query')
const stuinfoquery = require('./query/stu_info_query');
const app = express();
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    //方便返回json
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == 'OPTIONS') {
        //让options请求快速返回
        res.sendStatus(200);
    } else {
        next();
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * 钟超
 */
//获取单个学生信息
app.get('/student', (req, res) => {
    let number =  req.query.number;
    stumanagequery.getstudent(number,function (rec) {
        res.json(rec).end();
    });
});
// //获取所有学生信息
// app.get('/students', (req, res) => {
//     stumanagequery.getstudents(function (rec) {
//         res.json(rec).end();
//     });
// });
//添加一条学生信息
app.post('/addStudent', (req, res) => {
    let student = req.body;
    stumanagequery.addstudent(student,function (rec) {
        res.json(rec).end();
    });
});
//删除一条学生信息
app.delete('/student', (req, res) => {
    let number =  req.query.number;
    stumanagequery.delStudent(number,function (rec) {
        res.json(rec).end();
    });
});
//修改一条学生信息
app.put('/student', (req, res) => {
    let student = req.body;
    stumanagequery.edistudent(student,function (rec) {
        res.json(rec).end();
    });
});



/**
 * 张正宇
 */
 app.get('/students', (req, res) => {
    stumanagequery.getall(function (rec) {
        res.json(rec).end();
    });
});
app.post('/students',(req,res)=>{
    let key = req.body.type
    let val = req.body.value
    stumanagequery.get(key,val,function (rec) {
        res.json(rec).end();
    })
})

//何滔
//获取单个用户信息
app.get('/loginadmin', (req, res) => {
    let number =  req.query.username;
    let password =req.query.password;
    let user ={number:number,password:password}
    loginquery.getuser(user,function (rec) {
        res.json(rec).end();
    });
});
//获取学生的number信息
app.get('/loginstudent', (req, res) => {
    let number =  req.query.username;
    let password =req.query.password;
    let user ={number:number,password:password}
    loginquery.getstudent(user,function (rec) {
        res.json(rec).end();
    });
});



/**
 * 陈冬生
 */
//学生信息页面获取学生的信息
app.get('/getstudentinfo', (req, res) => {
    let number = req.query.number;
    stuinfoquery.getstudentInfo(number, function (rec) {
        res.json(rec).end();
    });
});

//学生信息页面更新学生的信息
app.post('/updatestudentinfo', (req, res) => {
    stuinfoquery.updatestudentInfo(req.body, function (rec) {
        res.json(rec).end();
    });
});

//学生信息页面更新学生的密码
app.post('/updatestudentpwd', (req, res) => {
    stuinfoquery.updatestudentPwd(req.body, function (rec) {
        res.json(rec).end();
    });
});
const port = process.env.PORT || 5000;
app.listen(port, function () { console.log(`监听端口： ${port}`) });
