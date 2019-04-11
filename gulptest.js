/* 以下是热刷新案例 */
var gulp = require('gulp');
var sass = require("gulp-sass");
var concat = require("gulp-concat");
// var $ = require("gulp-load-plugins")();
var browserSync = require("browser-sync");

//编译sass
gulp.task("sass",function(){
    return gulp.src('./src2/sass/dm.scss')
    // 编译
        .pipe(sass({
            outputStyle: 'expanded'           // 配置输出方式,默认为nested
            // outputStyle: 'compressed'           // 配置输出方式,默认为nested
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.reload({stream:true}))
})

//处理html
gulp.task("html",function(){
    return gulp.src('./src2/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({stream:true}))
})

//合并js
gulp.task("js",function(){
    return gulp.src('./src2/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.reload({stream:true}))
})

gulp.task('watch',function(){
    browserSync.init({  
        port: 8000,  
        server: {  
            baseDir: ['dist']  
        }  
    }); 
    gulp.watch("./src2/**/*.html",gulp.series('html'));
    gulp.watch("./src2/sass/**/*.scss",gulp.series('sass'));
})


gulp.task("default",gulp.series('sass','html','watch'));

/* 以上是热刷新案例 */



