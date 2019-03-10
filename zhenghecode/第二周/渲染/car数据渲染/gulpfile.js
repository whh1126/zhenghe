//起服务

var gulp = require('gulp');

var server = require('gulp-webserver');

var sass = require('gulp-sass');

var path = require('path');

var fs = require('fs');

var url = require('url');

var data = require('./src/data/data.json');

//编译sass

gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
})

//监听sass的变化

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'));
})

gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9999,
            middleware: [function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname == '/favicon.ico') {
                    res.end('');

                } else if (pathname == '/') {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')));
                } else if (pathname == '/car') {
                    res.end(JSON.stringify({ code: 1, msg: data }));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }]
        }))
})


gulp.task('dev', gulp.series('sass', 'server', 'watch'));