var express = require('express');
var router = express.Router();
var sqls = require('../mysql/index');
var sql = require('../mysql/sql');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({ code: 1 });
});
router.post('/api/getDate', function(req, res, next) {
    // var val = req.body;
    // task(sql.ADD_SELECT, [], function(err, result) {
    //     if (err) {
    //         throw err;
    //     } else {
    //         res.json({ code: 1, msg: "写入成功" })
    //     }
    // })

    res.end("wsdweq")
});
module.exports = router;