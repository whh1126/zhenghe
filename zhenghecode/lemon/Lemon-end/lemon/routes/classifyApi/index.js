var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
var dbBase = "lemon";
var dbColl = "iconlist";
var dbuser = "user";
var classify = require('../classifyApi/index.js');
//查找icon
var iconlist = function(req, res, next) {
    mongo.find(dbBase, dbColl, function(result) {
        console.log(result);
        if (result.length > 0) {
            res.send({
                code: 1,
                msg: "查询成功",
                data: result
            })
        } else {
            res.send({
                code: 0,
                msg: "erro"
            })
        }
    })
};
//分类添加
var addclassify = function(req, res, next) {
    var parmas = req.body,
        iname = parmas.iname,
        cname = parmas.cname,
        type = parmas.type,
        uid = parmas.uid;
    if (!iname || !cname || !type || !uid) {
        res.send({
            code: 2,
            msg: "缺少参数"
        })
    } else {
        getIsclass();

    }

    function getIsclass() {
        mongo.find(dbBase, dbuser, { cname: cname, type: type, uid: { $in: ["*", uid] } }, function(result) {
            if (result.length > 0) {
                res.send({
                    code: 0,
                    msg: "分类已存在"
                })
            } else {
                add();
            }

        })

        function add() {
            mongo.insert(dbBase, dbuser, { iname: iname, cname: cname, type: type, uid: uid }, function(result) {
                if (result) {
                    res.send({
                        code: 0,
                        msg: "分类添加成功"
                    })
                } else {
                    res.send({
                        code: 1,
                        msg: "添加分类失败"
                    })
                }
            })
        }
    }
};
//搜索查询分类
var searchclassify = function(req, res, next) {
    var parmas = req.query,
        type = parmas.type,
        uid = parmas.uid;
    mongo.find(dbBase, dbuser, { type: type, uid: { $in: ["*", uid] } }, function(result) {
        if (result.length > 0) {
            res.send({
                code: 0,
                data: result
            })
        } else {
            res.send({
                code: 1,
                msg: "查找失败"
            })
        }

    })
}
module.exports = {
    //  键名随意键值是函数名
    iconlist: iconlist,
    addclassify: addclassify,
    searchclassify: searchclassify
}