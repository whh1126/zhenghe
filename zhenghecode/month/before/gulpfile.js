//引入
var gulp = require('gulp');
//服务
var server = require('gulp-webserver');
var sass = require('gulp-sass');

//监听scss
gulp.task('sass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
});
//监听
gulp.task('watch', function() {
    return gulp.watch('./scss/*.scss', gulp.series('sass'))
});

gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true,
            proxies: [{
                source: '/api/list',
                target: 'http://localhost:3000/api/list'
            }, {
                source: '/api/search',
                target: 'http://localhost:3000/api/search'
            }, {
                source: '/api/sortmoney',
                target: 'http://localhost:3000/api/sortmoney'
            }, {
                source: '/api/sortnum',
                target: 'http://localhost:3000/api/sortnum'
            }]
        }))
})

//开发任务
gulp.task('default', gulp.series('sass', 'webserver', 'watch'));