var mysql = require('mysql');
var pool = mysql.createPool({
    database: 'massage',
    user: 'root',
    password: 'root'
})

function task(sql, arr, ck) {
    pool.getConnection(function(err, con) {
        if (err) {
            return ck && ck(err);
        } else {
            con.query(sql, arr, function(err, result) {
                if (err) {
                    return ck && ck(err);
                } else {
                    ck && ck(null, result);
                }
            })
        }
    })
}

module.exports = task;