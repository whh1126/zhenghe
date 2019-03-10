var express = require('express');
var router = express.Router();

var Mongo = require('Mongodb-curd');
var batabaseName = "month";
var collcationName = "listmonth";
/* GET home page. */
router.get('/api/list', function(req, res, next) {
    var limit = req.query.limit;
    var skip = req.query.skip;
    var inp = req.query.inpt;
    var price = req.query.price;
    console.log(inp)

    var inpt = inp ? { "title": { $regex: inp } } : {};
    console.log(inpt)
    Mongo.find(batabaseName, collcationName, inpt, function(result) {

        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            var page = Math.ceil(result.length / limit)
            Mongo.find(batabaseName, collcationName, inpt, function(result) {
                if (!result) {
                    res.send({
                        code: 0,
                        mes: "error"
                    })
                } else {
                    res.send({
                        code: 1,
                        mes: "success",
                        data: result,
                        page: page
                    })
                }
            }, {
                sort: { "price": 1 },
                skip: (skip - 1) * limit,
                limit: limit
            })
        }
    })

});





//渲染主页面数据
// router.get('/api/userlist', function(req, res, next) {
//     var skip = req.query.skip || 1;
//     var limit = req.query.limit || 0;
//     Mongo.find(batabaseName, collcationName, function(result) {
//         if (!result) {
//             res.send({
//                 code: 0,
//                 mes: "error"
//             })
//         } else {
//             var length = Math.ceil(result.length / limit);
//             Mongo.find(batabaseName, collcationName, function(result) {
//                 if (!result) {
//                     res.send({
//                         code: 0,
//                         mes: "error"
//                     })
//                 } else {
//                     res.send({
//                         code: 1,
//                         mes: "success",
//                         data: result,
//                         len: length
//                     })
//                 }
//             }, {
//                 skip: (skip - 1) * limit,
//                 limit: limit
//             })
//         }
//     })
// });


// //模糊搜索
// router.get('/api/search', function(req, res, next) {
//     var sea = req.query.sea;
//     console.log(sea)
//     Mongo.find(batabaseName, collcationName, { "title": { $regex: sea } }, function(result) {
//         if (!result) {
//             res.send({
//                 code: 0,
//                 mes: "error"
//             })
//         } else {
//             res.send({
//                 code: 1,
//                 mes: "success",
//                 data: result
//             })
//         }
//     }, {
//         skip: 0,
//         limit: 0
//     })
// });


// router.get('/api/sortmoney', function(req, res, next) {

//     Mongo.find(batabaseName, collcationName, function(result) {
//         if (!result) {
//             res.send({
//                 code: 0,
//                 mes: "error"
//             })
//         } else {
//             res.send({
//                 code: 1,
//                 mes: "success",
//                 data: result
//             })
//         }
//     }, {
//         skip: 0,
//         limit: 0,
//         sort: { 'money': 1 }
//     })
// });

// //排序
// router.get('/api/sortnum', function(req, res, next) {

//     var peo = req.query.peple;
//     console.log(peo)
//     Mongo.find(batabaseName, collcationName, function(result) {
//         if (!result) {
//             res.send({
//                 code: 0,
//                 mes: "error"
//             })
//         } else {
//             res.send({
//                 code: 1,
//                 mes: "success",
//                 data: result
//             })
//         }
//     }, {
//         skip: 0,
//         limit: 0,
//         sort: { 'peo': 1 }
//     })
// });
module.exports = router;