var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var url = require("url");
var path = require("path");
var fs = require("fs");
var data = require('./data/data.json');
console.log(data);

//编译sass
gulp.task('sass', function() {
        return gulp.src('./src/scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./src/css/'))
    })
    //起服务
gulp.task('webserver', function() {
        return gulp.src('src')
            .pipe(webserver({
                port: 3456,
                open: true,
                livereload: true,
                middleware: function(req, res, next) {
                    var pathname = url.parse(req.url).pathname;
                    if (pathname === '/favicon.ico') {
                        res.end('');
                        return
                    }
                    if (pathname == '/api/list') {
                        var parmas = url.parse(req.url, true).query;
                        var inp = parmas.inp; //搜索的value值
                        var type = parmas.type;
                        var page = parmas.page;
                        var pageSize = parmas.pageSize;
                        //点击排序 循环遍历数组
                        var target = []; //查找值的数组
                        var newarr = [];
                        //便利数组找传过来的值
                        data.map(function(item) {
                                if (item.title.indexOf(inp) != -1) { //！=-1出现
                                    target.push(item);
                                }
                            })
                            //判断是那种类型的值
                        console.log(target)
                        if (type == "normal") { //综合排序
                            newarr = target;
                        } else if (type == "sales") { //销量排序
                            newarr = target.sort(function(a, b) {
                                return b.sales - a.sales;
                            })

                        } else if (type == "sx") { //升序排序
                            newarr = target.sort(function(a, b) {
                                return b.price - a.price;
                            })

                        } else if (type == "credit") { //信用排序
                            newarr = target.sort(function(a, b) {
                                return a.credit - b.credit;
                            })
                        } else if (type == "price") { //价格排序
                            newarr = target.sort(function(a, b) {
                                return a.price - b.price;
                            })
                        }
                        //scroll
                        var start = (page - 1) * page - 1;
                        var end = page * pageSize;
                        var endarr = newarr.slice(start, end);
                        var total = Math.ceil(newarr.length / pageSize);

                        res.end(JSON.stringify({
                            code: 0,
                            data: newarr,
                            msg: "请求成功"
                        }))
                    } else {
                        pathname = pathname === "/" ? "index1.html" : decodeURI(pathname);
                        res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                    }


                }
            }))
    })
    //监听sass!!!!!!
gulp.task('wacth', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})
gulp.task('dev', gulp.series('sass', 'webserver', 'wacth'));