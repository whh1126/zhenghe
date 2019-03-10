var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
var dbBase = "lemon";
var dbColl = "iconlist";
//引入Api下的index.js
var bulid = require('./bulidApi/index.js');
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//路由接口随意命名
//bulid.addbulid 是抛出的函数的键名
//获取账单
router.post('/bulid/addbulid', bulid.addbulid);
//查询账单
router.get('/bulid/getbulid', bulid.getbulid);


module.exports = router;