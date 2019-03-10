var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
var dataBase = "month";
var collName = "info";

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//添加接口
router.get("/api/add", function(req, res, next) {
    var parmas = req.query,
        money = parmas.money,
        type = parmas.type;
    mongo.insert(dataBase, collName, { money: money, type: type }, function(result) {
        console.log(result);
        if (result) {
            res.send({
                code: 0,
                data: result,
                msg: "添加成功"

            })
        } else {
            res.send({
                code: 1,
                msg: "添加失败"
            })
        }
    })
})


module.exports = router;