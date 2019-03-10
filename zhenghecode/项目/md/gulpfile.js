var gulp = require('gulp');
var rev = require('gulp-rev');
var collector = require('gulp-rev-collector');
var uglify = require('gulp-uglify');
gulp.task("rev", function() {
        return gulp.src('./src/js/*.js')
            .pipe(rev())
            .pipe(rev.manifest()) //生成json
            .pipe(gulp.dest('./src/rev/js'))
    })
    //替换路径
gulp.task('collector', function() {
        return gulp.src(['./src/bulid/*.json', './src/index.html'])
            .pipe(collector({
                replaceReved: true
            }))
            .pipe(gulp.dest('./view/'))
    })
    //压缩js
gulp.task('uglify', function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./src/compress/js'))
})