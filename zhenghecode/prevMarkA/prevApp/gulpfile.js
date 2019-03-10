//引入
var gulp=require('gulp');
//服务
var server=require('gulp-webserver');
var sass=require('gulp-sass');

//监听scss
gulp.task('sass',function(){
	return gulp.src('./scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./css/'))
});
//监听
gulp.task('watch',function(){
	return gulp.watch('./scss/*.scss',gulp.series('sass'))
});

gulp.task('webserver',function(){
	return gulp.src('./')
	.pipe(server({
		port:3696,
		open:true,
		livereload:true,
		proxies:[
			{
				source:'/userlist',target:'http://localhost:3000/userlist'
			},
			{
				source:'/addBillList',target:'http://localhost:3000/addBillList'
			}
		]
	}))
})

//开发任务
gulp.task('dev',gulp.parallel('sass','watch','webserver'));