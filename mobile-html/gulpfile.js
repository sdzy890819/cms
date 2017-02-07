var gulp = require('gulp') , 
	requirejsOptimize = require('gulp-requirejs-optimize') , 
	rjs = require('gulp-requirejs'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),           //合并  
	jshint = require('gulp-jshint'),           //js规范验证  
	uglify = require('gulp-uglify'),           //压缩  
	rename = require('gulp-rename'),          //文件名命名  
	amdOptimize = require('gulp-amd-optimizer'),           //require优化  
    htmlmin = require('gulp-htmlmin'),
	watch = require('gulp-watch'); 

gulp.task('jsmin', function () {
    gulp.src([
            'js/*.js',
            'js/**/*.js',
            '!js/plug/{zepto.min,vue.min,vue-router.min}.js'
        ]) //多个文件以数组形式传入
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
gulp.task('concat', function () {
    gulp.src([
            'js/plug/zepto.min.js',
            'js/plug/vue.min.js',
            'js/plug/vue-router.min.js'
        ]) //多个文件以数组形式传入
        .pipe(uglify())
        .pipe(concat('global.js'))
        .pipe(gulp.dest('dist/plug'));
});
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('./*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});
gulp.task('build',['jsmin','concat','testHtmlmin'])

gulp.task('default', function () {  
    //监听js变化  
    gulp.watch(["./js/*.js",'./js/**/*.js'], function () {       //当js文件变化后，自动检验 压缩  
        //gulp.run('lint', 'scripts');  
        gulp.run('build');  
    });
}); 