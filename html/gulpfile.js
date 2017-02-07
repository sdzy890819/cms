var gulp = require('gulp') , 
	requirejsOptimize = require('gulp-requirejs-optimize') , 
	rjs = require('gulp-requirejs'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),           //合并  
	jshint = require('gulp-jshint'),           //js规范验证  
	uglify = require('gulp-uglify'),           //压缩  
	rename = require('gulp-rename'),          //文件名命名  
	amdOptimize = require('gulp-amd-optimizer'),           //require优化  
	watch = require('gulp-watch'); 

var config = {
    baseUrl: 'js/',
    paths: {
        'jquery': 'plug/jquery-1.11.2.min',
        //'jquery-migrate': 'plug/jquery-migrate-3.0.0.min',
        'wangEditor' : '../wangEditor/dist/js/wangEditor',


        'angular': 'plug/angular.min',
        "angularAMD": "plug/angularAMD.min",
        "ngload": "plug/ngload",
        'angular-ui-router': 'plug/angular-ui-router.min',
        'angular-css':'plug/angular-css.min',
        'ui-bootstrap':'plug/ui-bootstrap-tpls-2.3.2.min',

        //upload img
        'ngFileUpload-shim' : 'plug/ng-file-upload/dist/ng-file-upload-shim.min',
        'ngFileUpload' : 'plug/ng-file-upload/dist/ng-file-upload.min',

        //upload video
        'uploadify' : 'upload/uploadify/jquery.uploadify.min',
        'angularFileUpload' : 'upload/angular-file-upload/dist/angular-file-upload.min',

        'layui' : 'plug/layui/layui',
        'jcrop' : 'plug/jcrop/jquery.Jcrop.min',

        'head' : 'common/header' , 
        'menu' : 'common/menu' , 
        'form' : 'common/form',        
        'search' : 'search/index',        
        'formlist' : 'common/formlist',
        'position' : 'common/position',
        'fixedNav' : 'common/positionNav',
    },
    shim: {
        'jquery': {exports: '$'},
        //'jquery-migrate': ['jquery'], 
        'jcrop': ['jquery'],
        "uploadify": ["jquery"],


        'angular': {exports: 'angular'},
        'angular-ui-router': {
            deps: ['angular'] , 
            exports: 'angular-ui-router'
        },
        'angular-css': {
            deps: ['angular'] , 
            exports: 'angular-css'
        },
        'ui-bootstrap': ["angular"],
        "angularAMD": ["angular"],
        "ngFileUpload-shim": ["angular"],
        "ngFileUpload": ["angular"],
        "angularFileUpload": ["angular"],
        "ngload": ["angularAMD"]
    },
    deps:['app']
    //urlArgs: "bust=" +  (new Date()).getTime()
}

gulp.task('build',function(){
	return gulp.src(["js/*.js",'js/**/*.js'])
		.pipe(requirejsOptimize(config))
    .pipe(gulp.dest('./deploy/')); // pipe it to the output DIR
});
gulp.task('require', function() {
    return rjs(config)
    .pipe(sourcemaps.init({loadMaps: true})) // initialize gulp-sourcemaps with the existing map 
    .pipe(sourcemaps.write()) // write the source maps 
    .pipe(gulp.dest('./newHtml/')); // pipe it to the output DIR
});

    //脚本检查  
    gulp.task('lint', function () {  
        gulp.src(["js/*.js",'js/**/*.js'])  
            .pipe(jshint())  
            .pipe(jshint.reporter('default'));  
    });  
      
      
    //require合并  
    gulp.task('rjs', function () { 
        debugger;
        gulp.src(["js/*.js",'js/**/*.js'],{base:config.baseUrl})  
            .pipe(amdOptimize(config))  
            .pipe(concat("index.js"))           //合并  
            .pipe(gulp.dest("dist/js"))          //输出保存  
            .pipe(rename("index.min.js"))          //重命名  
            .pipe(uglify())                        //压缩  
            .pipe(gulp.dest("dist/js"));         //输出保存  
    });  
      
    gulp.task('default', function () {  
        //监听js变化  
        gulp.watch(["js/*.js",'js/**/*.js'], function () {       //当js文件变化后，自动检验 压缩  
            //gulp.run('lint', 'scripts');  
            gulp.run('lint', 'rjs');  
        });
    });  