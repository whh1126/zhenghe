var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var url = require('url');
var path = require('path');
var bodyParser = require("body-parser");
var fs = require('fs');
gulp.task('webserver', function() {
    return gulp.src('./src')
        .pipe(webserver({
            port: 8080,
            open: true,
            livereload: true,
            middleware: [bodyParser.urlencoded({ extended: false }), function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === "/favicion.ico") {
                    return res.end('');
                }
                if (pathname === "/api/login") {
                    var username = req.body.username;
                    var pwd = req.body.pwd;
                    //判断不能为空
                    if (!username || !pwd) {
                        res.end(JSON.stringify({ code: 0, msg: "密码或用户名不能为空" }))
                    } else {
                        //否则的话就比较用户名和密码
                        data.forEach(function(item) {
                            if (item.name == username && item.pwd == pwd) {
                                return res.ens(JSON.stringify({
                                    code: 1,
                                    data: item,
                                    id: item.id
                                }))
                            } else {
                                return res.end(JSON.stringify({
                                    code: 0,
                                    msg: "密码或用户名有误"
                                }))
                            }
                        })

                    }

                } else if (pathname === "/api/list") {
                    //如果是list接口 
                    //获取参数
                    var id = req.body.id;
                    data.forEach(function(item) {
                        if (item.id === id) {
                            return res.end(JSON.stringify({ code: 1, data: item, id: item.id }))
                        }
                    })
                } else {
                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }

            }]
        }))
})