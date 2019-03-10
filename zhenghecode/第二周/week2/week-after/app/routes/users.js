var express = require('express');
var router = express.Router();
var sqls = require('../mysql/index');
var sql = require('../mysql/sql');
/* GET users listing. */
router.post('/', function(req, res, next) {
    var params = req.body;
    var users = params.user,
        emiles = params.emile,
        pwds = params.pwd,
        wr1s = params.wr1,
        wr2s = params.wr2,
        wr3s = params.wr3

    sqls(sql.SELECT, [users], function(err, result) {
        if (err) {
            res.json({ code: 3, msg: err })
        } else if (result.length > 0) {
            res.json({ code: 0, msg: "该用户已存在" })
        } else {
            sqls(sql.ADD_SELECT, [users, emiles, pwds, wr1s, wr2s, wr3s], function(err, result) {
                if (err) {
                    res.json({ code: 0, msg: err })
                } else {
                    res.json({ code: 1, msg: '添加成功' })
                }

            });
        }
    })

    //删除
    // sqls(sql.DELETED, [23], function(err, result) {
    //     if (err) {
    //         res.json({ code: 4, msg: err })
    //     } else {
    //         res.json({ code: 2, msg: '删除成功' })
    //     }
    // })
    //修改
    // sqls(sql.UPDATE, ["小明1", 26], function(err, result) {
    //     if (err) {
    //         res.json({ code: 4, msg: err })
    //     } else {
    //         res.json({ code: 2, msg: '修改成功' })
    //     }
    // })
})

module.exports = router;