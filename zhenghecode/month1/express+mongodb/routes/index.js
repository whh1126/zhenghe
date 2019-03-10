var express = require('express');
var router = express.Router();
var mymongo1610 = require('mymongo1610');
/* GET home page. */
router.get('/list', function(req, res, next) {
    mymongo1610.find('success', function(err, result) {
        if (err) {
            res.json({ code: 1, msg: 'error' });
        } else {
            res.json({ code: 0, data: result });
        }
    })
});
//icon
router.get('/icons', function(req, res, next) {
    var data = req.query.type;
    mymongo1610.find('success', { type: data }, function(err, result) {
        if (err) {
            res.json({ code: 1, msg: 'error' });
        } else {
            res.json({ code: 0, data: result });
        }
    })
});
//收入
// router.get('/iconss', function(req, res, next) {
//     mymongo1610.find('iconss', function(err, result) {
//         if (err) {
//             res.json({ code: 1, msg: 'error' });
//         } else {
//             res.json({ code: 0, data: result });
//         }
//         console.log(result)
//     })
// });
//添加
router.post('/add', function(req, res, next) {
    var icon = req.body.icon;
    var cprice = req.body.cprice;
    var cname = req.body.cname;
    var type = req.body.type;
    console.log(cprice, cname, type)
    mymongo1610.insert('success', { cprice: cprice, cname: cname, type: type, icon: icon }, function(err, result) {
        if (err) {
            res.json({ code: 1, msg: 'error' });
        } else {
            res.json({ code: 0, msg: result });
        }
    })
});

//模糊查询
router.post('/search', function(req, res, next) {
    var cname = new RegExp(req.body.cname);
    console.log(cname);
    mymongo1610.find('success', { cname: cname }, function(err, result) {
        if (err) {
            res.json({ code: 0, msg: 'error' });
        } else {
            res.json({ code: 1, data: result })
        }
        console.log(result)
    })
})
module.exports = router;