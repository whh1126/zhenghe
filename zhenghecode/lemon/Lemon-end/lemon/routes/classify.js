var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
var dbBase = "lemon";
var dbColl = "iconlist";
//引入Api下的index.js
//classify.iconlist index下的某些方法
//classify.iconlist
var classify = require('./classifyApi/index.js');
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//查找所有icon接口
//路由接口随意命名
router.get('/classify/iconlist', classify.iconlist);
//添加分类接口
router.post('/classify/add', classify.addclassify);
//查询分类接口
router.get('/classify/search', classify.searchclassify);

module.exports = router;