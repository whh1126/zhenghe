var express = require('express');
var router = express.Router();
//引入
var mymongo1610 = require('mymongo1610');

/* GET home page. */
router.get('/userlist', function(req, res, next) {
    mymongo1610.find('billData', function(err, result) {
        // console.log(result)
        if (err) {
            res.json({ code: 0, msg: err })
        } else {
            res.json({ code: 1, msg: result })
        }
    })
});
//新增
router.post('/addBillList', function(req, res, next) {
    var icon = req.body.icon;
    var name = req.body.name;
    var money = req.body.money;
    var timer = req.body.timer;
    var billMethod = req.body.billMethod;
    if (money.length === 0) {
        alert('金额不能为空')
    } else {
        mymongo1610.insert('billData', { icon: icon, name: name, money: money, time: timer, billMethod: billMethod }, function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                res.json({ code: 1, msg: '添加成功' })
            }
        });
    }

});
module.exports = router;