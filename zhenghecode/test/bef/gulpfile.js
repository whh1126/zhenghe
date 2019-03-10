var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
//编译scss
gulp.task('sass', function() {
        return gulp.src('./src/scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./src/css/'))
    })
    //监听事件
gulp.task('watch', function() {
        return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
    })
    //起服务
gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 9090,
            open: true,
            livereload: true,
            proxies: [{
                source: "/api/find",
                target: "http://localhost:3000/api/find"
            }]

        }))
})
gulp.task('dev', gulp.series('sass', 'webserver', 'watch'));