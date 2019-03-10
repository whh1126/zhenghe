var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var clean = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var imgmin = require('gulp-imagemin');
var webserver = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
var list = require('./src/list.json');

gulp.task('copyfile', function() {
        return gulp.src('./src/js/**/*.js')
            .pipe(gulp.dest('./src/build/js'));
    })
    //编译sass
gulp.task('sass', function() {
        return gulp.src('./src/scss/*.scss')
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
            .pipe(concat('all.css'))
            .pipe(clean())
            .pipe(gulp.dest('./src/build/css/'))
    })
    //监听事件sass
gulp.task('watch', function() {
        return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
    })
    //压缩html
gulp.task('htmlmin', function() {
        return gulp.src('./src/*.html')
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest('./src/build/'))
    })
    //压缩img
gulp.task('imgmin', function() {
        return gulp.src('./src/img/*.{png,jpg,gif}')
            .pipe(imgmin())
            .pipe(gulp.dest('./src/build/img/'))
    })
    //起服务
gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 8080,
            open: true,
            livereload: true,
            host: "192.168.0.48",
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return res.end();
                } else if (pathname === '/api/list') {
                    res.end(JSON.stringify({
                        code: 1,
                        data: list
                    }))
                } else {
                    pathname = pathname === '/' ? "index.html" : pathname
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})