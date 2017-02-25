var gulp = require('gulp') , 
	concat = require('gulp-concat'),           //合并  
	jshint = require('gulp-jshint'),           //js规范验证  
	uglify = require('gulp-uglify'),           //压缩  
	rename = require('gulp-rename'),          //文件名命名  
	autoprefixer = require('gulp-autoprefixer'), 
    fontSpider = require( 'gulp-font-spider' ),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache');
	watch = require('gulp-watch');   

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
    gulp.src(['./*.html','./**/*.html'])
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});
gulp.task('testAutoFx', function () {
    const options = {
        browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
        remove:true //是否去掉不必要的前缀 默认：true 
    };
    gulp.src(['./*.css','./**/*.css'])
        .pipe(autoprefixer(options))
        .pipe(gulp.dest('dist'));
    
});
gulp.task('testfont',function () {
    gulp.src('*.html')
        .pipe(fontSpider());
});
gulp.task('testImagemin', function () {
    gulp.src('images/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/images'));
});
gulp.task('jsmin', function () {
    const options = {
        mangle: true,//类型：Boolean 默认：true 是否修改变量名
        compress: true,//类型：Boolean 默认：true 是否完全压缩
        preserveComments: 'all' //保留所有注释
    };
    gulp.src([
            'js/*.js', 'js/**/*.js',
            '!js/upload/angular-file-upload/src/*.js','!js/upload/angular-file-upload/src/**/*.js',
            //'!js/plug/**/*.js'
        ])
        .pipe(uglify(options))
        .pipe(gulp.dest('dist/js'));
    gulp.src([
            'wangEditor/*.js', 'wangEditor/**/*.js',
            '!wangEditor/src/js/parts/*.js'
        ])
        .pipe(uglify(options))
        .pipe(gulp.dest('dist/wangEditor'))
});


gulp.task('default', function () {  
    //监听js变化  
    gulp.watch(["js/*.js",'js/**/*.js'], function () {       //当js文件变化后，自动检验 压缩  
        //gulp.run('lint', 'scripts');  
        gulp.run('lint', 'rjs');  
    });
});
gulp.task('build', ['testHtmlmin','testAutoFx','testImagemin','jsmin','testfont']);