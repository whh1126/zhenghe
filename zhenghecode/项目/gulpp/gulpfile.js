var gulp = require('gulp');
var sass = require('gulp-sass'); //编译sass
var clear = require('gulp-clean-css'); //压缩css
var concat = require('gulp-concat'); //合并文件
var webserver = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');

//编译sass
gulp.task('sass', function() {
        return gulp.src('./gulps/src/scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./gulps/src/css'))
    })
    //压缩css
gulp.task('cssmin', function() {
        return gulp.src('./gulps/src/css/*.css')
            .pipe(clear()) //调用压缩的插件
            .pipe(gulp.dest('./gulps/src/css'))
    })
    //合并文件
gulp.task('concat', function() {
        return gulp.src('./gulps/src/css/*.css')
            .pipe(concat('all.css'))
            .pipe(clear()) //调用压缩的插件
            .pipe(gulp.dest('./gulps/src/css'))
    })
    //起服务
gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 1213,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favico.icon') {
                    return res.end();
                    // res.end('');
                    // return;
                }
                pathname = pathname === '/' ? "index.html" : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));

            }
        }))
})