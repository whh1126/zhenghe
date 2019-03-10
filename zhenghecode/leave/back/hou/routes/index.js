var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
//list接口
router.get('/api/list', function(req, res, next) {
    // res.end('90')
    var parmas = req.query,
        page = parmas.page, //页数
        pageSize = parmas.pageSize, //个数
        type = parmas.type * 1; //根据type进行判断
    // console.log(type);
    curd.find(dbname, collname, { type: type }, function(result) {
        // res.end("result");
        var len = result.length; //整个数据个数
        var total = Math.ceil(len / pageSize);
        // renderList(total);
        if (result.length > 0) {
            res.send({
                code: 1,
                data: result
            })
        } else {
            res.send({
                code: 0,
                msg: result
            })
        }
    })

    // function renderList(total) {
    //     var skip = (page - 1) * pageSize;
    //     curd.find(dbname, collname, { type: type }, function(result) {
    //         if (result.length > 0) {
    //             res.send({
    //                 code: 1,
    //                 data: result,
    //                 total: total
    //             })
    //         } else {
    //             res.send({
    //                 code: 0,
    //                 msg: "erro"
    //             })
    //         }
    //     }, {
    //         skip: skip,
    //         limit: pageSize
    //     })

    // }
})

module.exports = router;