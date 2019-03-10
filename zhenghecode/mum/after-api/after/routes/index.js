var express = require('express');
var router = express.Router();
var curd = require("mongodb-curd");
var dbName = "exam";
var collName = "study";
var mongos = require('mongodb');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
//查找
router.get('/api/find', function(req, res, next) {
        curd.find(dbName, collName, {}, function(result) {
            if (!result) {
                res.send({
                    code: 0,
                    mes: "error"
                })
            } else {
                res.send({
                    code: 1,
                    mes: "success",
                    data: result
                })
            }
        }, {
            skip: 0,
            limit: 0
        })
    })
    //更改
router.post('/api/update', function(req, res, next) {
        var parms = req.body,
            username = parms.username,
            age = parms.age,
            address = parms.address,
            card = parms.card,
            id = parms.id;
        var datas = {
            "username": username,
            "age": age,
            "address": address,
            "card": card
        }
        curd.update(dbName, collName, [{ "_id": id }, datas], function(result) {
            if (!result) {
                res.send({
                    code: 0,
                    mes: "error"
                })
            } else {
                res.send({
                    code: 1,
                    mes: "success",
                    data: result
                })
            }
        })

    })
    //删除
router.get('/api/remove', function(req, res, next) {
        var id = req.query.id;
        curd.remove(dbName, collName, { "_id": id }, function(result) {
            if (!result) {
                res.send({
                    code: 0,
                    mes: "error"
                })
            } else {
                res.send({
                    code: 1,
                    mes: "success",
                    data: result
                })
            }
        })


    })
    //添加
router.post('/api/add', function(req, res, next) {
        var parmas = req.body,
            username = parmas.username,
            age = parmas.age,
            card = parmas.card,
            address = parmas.address;
        curd.insert(dbName, collName, { "username": username, "age": age, "card": card, "address": address }, function(result) {
            if (!result) {
                res.send({
                    code: 0,
                    mes: "error"
                })
            } else {
                res.send({
                    code: 1,
                    mes: "success",
                    data: result
                })
            }
        })
    })
    //搜索接口
router.get('/api/search', function(req, res, next) {
        var serVal = req.query.username;
        var query = serVal ? { "username": { $regex: serVal } } : {};
        curd.find(dbName, collName, query, function(result) {
            if (!result) {
                res.send({
                    code: 0,
                    mes: "error"
                })
            } else {
                res.send({
                    code: 1,
                    mes: "success",
                    data: result
                })
            }
        }, {
            skip: 0,
            limit: 0
        })
    })
    //上拉接口

router.post('/api/pull', function(req, res, next) {
    var page = req.body.page;
    var pageSize = req.body.pageSize;
    curd.find(db, col, function(result) {
        if (!result) {
            res.send({ code: 0, msg: "erro！" })
        } else {
            res.send({ code: 1, data: result })
        }
    }, {
        skip: (page - 1) * pageSize,
        limit: pageSize
    })
});





module.exports = router;