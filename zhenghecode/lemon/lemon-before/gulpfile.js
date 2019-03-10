var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
gulp.task('sass', function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))
})
gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: "3456",
            open: true,
            livereload: true,
            proxies: [{
                source: "/classify/iconlist",
                target: "http://localhost:3000/classify/classify/iconlist"
            }]
        }))
})
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', gulp.series('sass'))

});
gulp.task('dev', gulp.series('sass', 'webserver', 'watch'))