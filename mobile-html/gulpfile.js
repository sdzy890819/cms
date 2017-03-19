var gulp = require('gulp') , 
	requirejsOptimize = require('gulp-requirejs-optimize') , 
	rjs = require('gulp-requirejs'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),    
	jshint = require('gulp-jshint'),           //js规范验证  
	uglify = require('gulp-uglify'),       
	rename = require('gulp-rename'),         
	amdOptimize = require('gulp-amd-optimizer'),      
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    webpack = require('webpack'),
    gulpWebpack = require('gulp-webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),
	watch = require('gulp-watch'); 

var config = {
    baseUrl: 'js/',
    paths: {
        'zepto': 'plug/zepto.min',
        'vue' : 'vue.min',
        'vue-router' : 'vue-router.min',
        'wangEditor' : 'plug/wangEditor/dist/js/wangEditor',
    },
    shim: {
        'zepto': {exports: '$'},
    }
}
//require合并  
gulp.task('rjs', function () { 
    gulp.src(["js/*.js",'js/**/*.js'],{base:config.baseUrl})  
        .pipe(amdOptimize(config)) 
        //.pipe(concat("index.js"))           //合并  
        .pipe(gulp.dest("dist/js"))          //输出保存  
        .pipe(rename("index.min.js"))          //重命名  
        .pipe(uglify())                        //压缩  
        .pipe(gulp.dest("dist/js"));         //输出保存  
});  


gulp.task('css',function(){
    gulp.src([
            'css/*.sass',
            'css/*.scss',
            'css/**/*.sass',
            'css/**/*.scss'
        ])
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
})
gulp.task('minify-css',function(){
    gulp.src([
            'dist/*.sass'
        ])
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
})

gulp.task('jsmin', function () {
    gulp.src([
            'js/*.js',
            'js/**/*.js',
            '!js/plug/{zepto.min,vue.min,vue-router.min}.js'
        ]) 
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('concat', function () {
    gulp.src([
            'js/plug/zepto.min.js',
            'js/plug/vue.min.js',
            'js/plug/vue-router.min.js'
        ])
        .pipe(uglify())
        .pipe(concat('global.js'))
        .pipe(gulp.dest('dist/js/plug'));
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
gulp.task('build',['css','jsmin','concat','testHtmlmin','minify-css'])

gulp.task('default', function () { 
    gulp.watch(["./js/*.js",'./js/**/*.js',
        './index.html',
        'css/*.sass',
        'css/*.scss',
        'css/**/*.sass',
        'css/**/*.scss'
    ], function () {
        gulp.run('build');  
    });
});