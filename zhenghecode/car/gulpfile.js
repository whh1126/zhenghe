var gulp = require('gulp');
var sass = require("gulp-sass");
var webserver = require('gulp-webserver');
var fs = require("fs");
var path = require("path");
var url = require("url");

gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))

})
gulp.task("wath", function() {
    return gulp.src('./src/scss/*.scss', gulp.series('sass'));
    // return gulp.series('sass')
})
gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 7890,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === "/favicon.ico") {
                    return res.end('');
                }
                pathname = pathname === "/" ? "index.html" : pathname;
                if (pathname === "/api/list") {
                    res.send({
                        code: 0,
                        data: data,
                        msg: "数据请求成功"
                    })
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }

        }))
})
gulp.task('dev', gulp.series('sass', 'webserver', 'wath'));