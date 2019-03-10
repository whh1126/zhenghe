var express = require('express');
var router = express.Router();
var curd = require('mongodb-curd');
var dbName = "exam";
var col = "study";

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/api/add', function(req, res, next) {
    var params = req.body;
    user = params.user,
        age = params.age,
        phone = params.phone,
        address = params.address,
        card = params.card;
    //添加接口
    if (!user || !card) {
        res.send({
            code: 2,
            msg: "身份证或姓名不能为空"
        })
    } else {
        curd.insert(dbName, col, params, function(err, result) {
            res.send({
                code: 1,
                msg: "success"
            });
            return;
        })
    }
});
//     //删除接口
router.get('/api/del', function(req, res, next) {
        var id = req.query.id;
        curd.remove(dbName, col, { _id: id }, function(result) {
            console.log(result);
            if (result.deletedCount === 1) {
                res.send({
                    code: 0,
                    msg: "删除成功"
                })
            } else if (result.deletedCount === 0) {
                res.send({
                    code: 1,
                    msg: "删除失败"
                })
            }
        })
    })
    //查找
router.get('/api/detail', function(req, res, next) {
    var id = req.query.id;
    curd.find(dbName, col, { _id: id }, function(result) {

        console.log(result);
        if (result.length > 0) {
            res.send({
                code: 0,
                data: result
            })
        } else {
            res.send({
                code: 1,
                data: "查询失败"
            })
        }

    })
})

//修改
router.post('/api/update', function(req, res, next) {
    var params = req.body,
        user = params.user,
        age = params.age,
        phone = params.phone,
        address = params.address,
        card = params.card,
        id = params.id;
    delete params.id;
    curd.update(dbName, col, [{ _id: id }, params], function(result) {
        console.log(result);
        if (result) {
            res.send({
                code: 0,
                data: "修改成功"
            })
        } else {
            res.send({
                code: 1,
                data: "修改失败"
            })
        }

    })

})

//查找列表
router.get('/api/list', function(req, res, next) {
    var id = req.query.id;
    curd.find(dbName, col, {}, function(result) {
        console.log(result);
        if (result.length > 0) {
            res.send({
                code: 0,
                data: result
            })
        } else {
            res.send({
                code: 1,
                data: "查询失败"
            })
        }
    })
})
module.exports = router;