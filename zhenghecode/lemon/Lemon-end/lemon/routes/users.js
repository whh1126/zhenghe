var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
var dbBase = "lemon";
var dbColl = "lencont";
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/users/adduser', function(req, res, next) {
    var user = req.body.user;
    mongo.insert(dbBase, dbColl, { user: user }, function(result) {
        console.log(result);
        if (result) {
            res.send({
                code: 1,
                data: result
            })
        } else {
            res.send({
                code: 0,
                msg: "erro"
            })
        }
    })
})

module.exports = router;