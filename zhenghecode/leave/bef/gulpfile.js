var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var fs = require('fs');
var path = require('path');
var url = require('url');
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))
})
gulp.task('watch', function() {
        return gulp.watch('./src/scss/*scss', gulp.series('sass'))
    })
    //起服务
gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 2345,
            open: true,
            livereload: true,
            proxies: [{
                source: "/users",
                target: "http://localhost:3000/users"
            }],
            // middleware: function(req, res, next) {
            //     var pathname = url.parse(req.url).pathname;
            //     if (pathname === "/favicon.ico") {
            //         return res.end();
            //     }
            //     pathname = pathname === "/" ? "page/index.html" : pathname;
            //     res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            // }
        }))
})
gulp.task('dev', gulp.series('sass', 'webserver', 'watch'));