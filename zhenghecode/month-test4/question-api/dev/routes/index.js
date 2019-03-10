var express = require('express');
var router = express.Router();
var Mongo = require('mongodb-curd');
var batabaseName = 'hyd';
var collcationName = "ms";

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/api/qs', function(req, res, next) {
    Mongo.find(batabaseName, collcationName, {}, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            res.send({
                code: 1,
                mes: "success",
                data: result
            })
        }
    }, {
        skip: 0,
        limit: 0
    })

})

module.exports = router;