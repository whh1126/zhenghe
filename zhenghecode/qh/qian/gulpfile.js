var gulp = require('gulp');
var webserver = require('gulp-webserver');
gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 9090,
            open: true,
            livereload: true,
            proxies: [{
                source: '/api/list',
                target: 'http://192.168.43.162/api/list'
            }, {
                source: '/api/add',
                target: 'http://192.168.43.162/api/add'
            }, {
                source: '/api/del',
                target: 'http://192.168.43.162/api/del'
            }, {
                source: '/api/detail',
                target: 'http://192.168.43.162/api/detail'
            }, {
                source: '/api/update',
                target: 'http://192.168.43.162/api/detail'
            }]
        }));
});