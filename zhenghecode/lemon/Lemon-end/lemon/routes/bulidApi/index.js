var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
var dbBase = "lemon";
var dbuser = "user";
var dbcollbulid = "bulid";
var bulid = require('../bulidApi/index.js');
var addBulid = function(req, res, next) {
        var parmas = req.body,
            type = parmas.type,
            time = new Date(parmas.time) * 1,
            icon = parmas.icon,
            money = parmas.money,
            uid = parmas.uid,
            cid = parmas.cid,
            name = parmas.name;
        if (!type || !time || !icon || !money || !uid || !cid || !name) {
            res.send({ code: 2, msg: "缺少参数" })
        } else {
            //判断用户是否存在
            getisUser();
        }
        //判断用户是否存在的函数
        function getisUser() {
            mongo.find(dbBase, dbuser, { _id: cid }, function(result) {
                console.log(result);
                if (result.length > 0) {
                    add();
                } else {
                    res.send({ code: 1, msg: "没有找到该用户" });
                }
            })
        }
        //添加用户
        function add() {
            parmas.time = new Date(parmas.time);
            mongo.insert(dbBase, dbcollbulid, parmas, function(result) {
                console.log(result);
                if (result) {
                    res.send({ code: 0, msg: "添加账单成功", data: result })
                } else {
                    res.send({ code: 1, msg: "添加失败" })
                }
            })
        }
    }
    //获取账单 
var getbulid = function(req, res, next) {
    var parmas = req.query,
        time = parmas.time,
        uid = parmas.uid,
        name = parmas.name.split(',');
    console.log(time);
    if (!time || !uid || !name) {
        res.send({ code: 2, msg: "缺少参数" });
    } else {
        if (time.indexOf('-') != -1) {
            var timeArr = time.split('-');
            if (timeArr[1] === "12") {
                maxtime = (timeArr[0] * 1 + 1) + "-01"
            } else {
                maxtime = (timeArr[0] + "-" + (timeArr[1] * 1 + 1))
            }
        } else {
            maxtime = time * 1 + 1;
        }
    }
    //查询账单
    mongo.find(dbBase, dbcollbulid, { time: { $lt: new Date(maxtime), $gte: new Date(time) }, uid: uid, name: { $in: name } }, function(result) {
        console.log(result);
        if (result.length > 0) {
            res.send({
                code: 0,
                data: result
            })
        } else {
            res.send({
                code: 1,
                msg: "查询失败"
            })
        }
    }, {
        sort: { time: 1 }
    })
}

module.exports = {
    addbulid: addBulid,
    getbulid: getbulid

}