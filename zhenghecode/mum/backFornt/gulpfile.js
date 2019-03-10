var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

//编译sass
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
})

//监听sass
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'));
})

//起服务
gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 4576,
            proxies: [{
                source: '/bill/addBill',
                target: 'http://localhost:3000/bill/bill/addBill'
            }, {
                source: '/bill/getBill',
                target: 'http://localhost:3000/bill/bill/getBill'
            }]
        }))
})

//开发
gulp.task('dev', gulp.series('sass', 'webserver', 'watch'));