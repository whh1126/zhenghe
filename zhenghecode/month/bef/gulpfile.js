var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
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
                proxies: [{
                    source: "/api/add",
                    target: "http://localhost:3000/users/api/add"
                }]
            }))
    })
    //监听sass!!!!!!
gulp.task('wacth', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})
gulp.task('dev', gulp.series('sass', 'webserver', 'wacth'));