/*
 * @Author: vk 
 * @Date: 2019-03-07 10:50:32 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-07 22:44:24
 */
var gulp = require("gulp");
var webserver = require('gulp-webserver');
gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 9090,
            open: true,
            livereload: true,
            proxies: [{
                source: "/api/findall",
                target: "http://localhost:3000/api/findall"
            }, {
                source: "/api/search",
                target: "http://localhost:3000/api/search"
            }, {
                source: "/api/sort",
                target: "http://localhost:3000/api/sort"
            }]

        }))
})