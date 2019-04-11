var gulp = require('gulp');
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var imagemin = require("gulp-imagemin");
var cssmin = require('gulp-cssmin');
// var $ = require("gulp-load-plugins")();
var browserSync = require("browser-sync");
var uglify = require("gulp-uglify");

//编译sass
gulp.task("sass", function () {
    return gulp.src('./src/scss/detail.scss')
        // 编译
        .pipe(sass({
            outputStyle: 'expanded'           // 配置输出方式,默认为nested
            // outputStyle: 'compressed'           // 配置输出方式,默认为nested
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.reload({ stream: true }))
})

//处理html
gulp.task("html", function () {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({ stream: true }))
})
// 压缩图片
gulp.task("image", function () {
    return gulp.src('./src/images/**/*.{jpg,png,gif,ico}')
        // .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
        .pipe(browserSync.reload({ stream: true }))
})
// 压缩css
gulp.task("css", function () {
    return gulp.src('./src/css/**/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({ stream: true }))
})

//合并js
// gulp.task("js", function () {
//     return gulp.src('./src/js/**/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('./dist/js/'))
//         .pipe(browserSync.reload({ stream: true }))
// })

// 压缩js
gulp.task("js", function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('watch', function () {
    browserSync.init({
        port: 8000,
        server: {
            baseDir: ['dist'],
            index: "./detail.html"
        }
    });
    gulp.watch("./src/**/*.html", gulp.series('html'));
    gulp.watch("./src/scss/**/*.scss", gulp.series('sass')); 
    gulp.watch("./src/css/**/*.css", gulp.series('css'));
    gulp.watch("./src/js/**/*.js", gulp.series('js'));
    gulp.watch("./src/images/**/*.{jpg,png,gif,ico}", gulp.series('image'));
})


gulp.task("default", gulp.series('sass', 'html', 'js','css','image', 'watch'));


