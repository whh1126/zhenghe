var express = require('express');
var router = express.Router();
var db = "hyd";
var col = "m";
var curd = require('mongodb-curd');

//查找所有数据
router.get('/api/findall', function(req, res, next) {
    //第一次查询
    curd.find(db, col, function(result) {
        var limit = 4; //页数
        var skip = (req.query.page - 1) * limit;
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            //数据总长度
            var total = Math.ceil(result.length / limit);
            //再次查询
            curd.find(db, col, function(data) {
                if (!data) {
                    res.send({
                        code: 0,
                        mes: "error"
                    })
                } else {
                    res.send({
                        code: 1,
                        mes: "success",
                        data: data,
                        total: total
                    })
                }
            }, {

                skip: skip,
                limit: limit
            })
        }
    })
});
//搜索
router.get('/api/search', function(req, res, next) {
        //title前端传来的值
        var title = req.query.title;
        //"title"数据库里的字段
        //匹配正则
        var reg = title ? { "title": { $regex: title } } : {};
        // var reg = title ? { 'title': { $regex: title } } : {}
        curd.find(db, col, reg, function(result) {
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
            limit: 0,
            sort: {
                "price": -1
            }
        })
    })
    //排序
router.get('/api/sort', function(req, res, next) {
    curd.find(db, col, {}, function(result) {
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
        limit: 0,
        sort: {
            "price": 1
        }
    })


})



module.exports = router;