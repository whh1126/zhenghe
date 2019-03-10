var gulp = require('gulp');
var webserver = require("gulp-webserver");
gulp.task('webserver', function() {
    return gulp.src("src").pipe(webserver({
        port: 9090,
        open: true,
        livereload: true,
        proxies: [{
            source: "/api/find",
            target: "http://localhost:3000/api/find"
        }, {
            source: "/api/add",
            target: "http://localhost:3000/api/add"
        }, {
            source: "/api/update",
            target: "http://localhost:3000/api/update"
        }, {

            source: "/api/remove",
            target: "http://localhost:3000/api/remove"

        }, {
            source: "/api/search",
            target: "http://localhost:3000/api/search"
        }, {
            source: "/api/pull",
            target: "http://localhost:3000/api/pull"
        }]
    }))


})