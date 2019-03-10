var express = require('express');
var router = express.Router();
var Mongo = require('mongodb-curd');
var batabaseName = "exam";
var collcationName = "user";
//查找用户
router.get('/api/findUser', function(req, res, next) {
    Mongo.find(batabaseName, collcationName, function(result) {
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
});
//查找分类
router.get('/api/findClassify', function(req, res, next) {
    Mongo.find(batabaseName, collcationName, function(result) {
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
});
//查看账单
router.get('/api/findbill', function() {
    Mongo.find(batabaseName, "bill", function(result) {
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


router.post('/api/addbill', function(req, res, next) {
        var opt = req.body,
            money = opt.money,
            uid = opt.uid,
            icon = opt.icon,
            cname = opt.cname;
        if (!money || !uid || !icon || cname) {
            res.send({
                code: 3,
                msg: "缺少参数"
            })
            return
        }
        Mongo.insert(batabaseName, "bill", opt, function(result) {
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
    //添加账单
module.exports = router;