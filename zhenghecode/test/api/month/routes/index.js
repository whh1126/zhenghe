var express = require('express');
var router = express.Router();
var Mongo = require("mongodb-curd");
var db = "hyd";
var col = "m";
//查找接口
router.get('/api/find', function(req, res, next) {
        var limit = 4;
        var skip = (req.query.page - 1) * limit;
        Mongo.find(db, col, function(result) {
            if (!result) {
                res.send({
                    code: 0,
                    mes: "error"
                })
            } else {
                var total = Math.ceil(result.length / limit);
                console.log(total);
                //再次查询
                Mongo.find(db, col, function(data) {
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
                })
            }
        }, {
            skip: skip,
            limit: limit
        })
    })
    //搜索接口

module.exports = router;