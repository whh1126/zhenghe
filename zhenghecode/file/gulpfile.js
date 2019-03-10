var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var fs = require('fs');
var path = require('path');
var url = require('url');

gulp.task('sass', function() {
    return gulp.src('./public/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./public/scss/*.scss', gulp.series('sass'))
})

gulp.task('webserver', function() {
    return gulp.src('./public')
        .pipe(webserver({
            port: 8888,
            open: true,
            livereload: true,
            host: '192.168.0.48',
            fallback: '11.22.html',
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return res.end('')
                } else if (pathname === '/render') {
                    var data = fs.readFileSync(path.join(__dirname, 'public', 'data.json'), 'utf8');
                    return res.end(data);
                } else {
                    return res.end(fs.readFileSync(path.join(__dirname, 'public', pathname === '/' ? '11.22.html' : decodeURI(pathname))));
                }
            }
        }))
})

gulp.task('default', gulp.series('sass', 'webserver', 'watch'));