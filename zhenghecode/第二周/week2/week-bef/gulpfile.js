var gulp = require('gulp');
var server = require('gulp-webserver');
var scss = require('gulp-sass');
//编译sass
gulp.task('sass', function() {
        return gulp.src('./src/scss/*.scss')
            .pipe(scss())
            .pipe(gulp.dest('./src/css'));
    })
    //监听变化
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'));
});

gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 8888,
            open: true,
            livereload: true,
            proxies: [
                { source: "/users", target: 'http://localhost:3000/users' }
            ]
        }))
})

gulp.task('dev', gulp.series('sass', 'server', 'watch'));