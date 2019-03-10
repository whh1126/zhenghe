var gulp = require('gulp');

var webserver = require('gulp-webserver');

var sass = require('gulp-sass');

var path = require('path');

var fs = require('fs');

var url = require('url');

var data = require('./data/data.json');
//编译sass

gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
})

//监听变化
gulp.task('change', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'));
})

//起服务
gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(webserver({
            port: '8888',
            middleware: [function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end();
                    return;
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    if (pathname === '/') {
                        res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')));
                    } else if (pathname === '/api/getDate') {
                        res.end(JSON.stringify(data));
                    } else {
                        res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                    }
                }
            }]
        }))
})

//合并
gulp.task('dev', gulp.series('sass', 'server', 'change'));