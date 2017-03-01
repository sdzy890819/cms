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
    requirejsOptimize = require('gulp-requirejs-optimize'),
    amdOptimize = require("amd-optimize"),
    cache = require('gulp-cache'),
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
    gulp.src(['./*.html','./**/*.html','!./dist/*.html','!./dist/**/*.html'])
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
    gulp.src(['./*.css','./**/*.css','!./dist/*.css','!./dist/**/*.css'])
        .pipe(autoprefixer(options))
        .pipe(gulp.dest('dist'));
    
});
gulp.task('testfont',function () {
    gulp.src(['*.html','*.css','./**/*.html','./**/*.css'])
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
        mangle: false,//类型：Boolean 默认：true 是否修改变量名
        compress: true,//类型：Boolean 默认：true 是否完全压缩
        preserveComments: 'license',//'license', //保留所有注释
        /*mangle: {except: [//排除混淆关键字
            'require' ,'exports' ,'module' ,'$','layui',
            'layer','define','angular','angularAMD','jquery',
            'jcrop','uploadify','angular-ui-router','angular-css',
            'ui-bootstrap','ngFileUpload-shim','ngFileUpload',
            'angularFileUpload','ngload','Upload','upload',
            '$scope' , '$state' , '$element' , '$rootScope','$uibModal','$css','$timeout',
            'ngModel','$state','repeatFinish','GenerateArrList','pop','Tool',
            'form', 'layedit', 'laydate',
            '$uibModalInstance','$css','file',
            'animation','ariaLabelledBy','ariaDescribedBy','templateUrl',
            'size','controller','wangEditor',
            'restrict','replace','transclude','uploadify'
        ]}*/
    };
    gulp.src([
            'js/*.js', 'js/**/*.js',

            '!js/**/gulpfile.js',
            '!js/**/WebpackConfig.js',
            
            '!js/upload/angular-file-upload/src/*.js',
            '!js/upload/angular-file-upload/src/**/*.js',

            
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
gulp.task('build', ['testHtmlmin','testAutoFx','testImagemin','jsmin']);

gulp.task('scripts', function () {
/* appDir  应用程序的目录（即<root>）。在这个文件夹下的所有文件将会被复制到dir参数标注的文件夹下。
baseUrl 相对于appDir，代表查找文件的锚点（that represents the anchor path for finding files）。
dir 这是一个输出目录，所有的应用程序文件将会被复制到该文件夹下。
modules

　　定义要被优化的模块数组。每一项是模块优化的配置，常用的几个参数如下：

　　　　name：模块名；

　　　　create：如果不存在，是否创建。默认 false；

　　　　include：额外引入的模块，和 name 定义的模块一起压缩合并；

　　　　exclude：要排除的模块。有些模块有公共的依赖模块，在合并的时候每个都会压缩进去，例如一些基础库。使用 exclude 就可以把这些模块在压缩在一个更早之前加载的模块中，其它模块不用重复引入。

fileExclusionRegExp 任何与此规则匹配的文件或文件夹都将不会被复制到输出目录。由于我们把r.js和build.js放置在应用程序目录下，我们希望优化器（optimizer）排除这两个文件。 因此我们可以这样设置/^(r|build)\.js$/。
optimizeCss RequireJS Optimizer会自动优化应用程序下的CSS文件。这个参数控制CSS最优化设置。允许的值： “none”, “standard”, “standard.keepLines”, “standard.keepComments”, “standard.keepComments.keepLines”。
removeCombined  如果为true，优化器（optimizer）将从输出目录中删除已合并的文件。
paths   模块（modules）的相对目录。
shim    为那些没有使用define()声名依赖关系及设置模块值的模块，配置依赖关系与“浏览器全局”出口的脚本。*/
//https://github.com/jrburke/r.js/blob/master/build/example.build.js
    var options = {
        appDir: './',
        baseUrl: './js',
        dir: './dist',
        modules: [
            {
                name: 'main'
            }
        ],
        //fileExclusionRegExp: /^(r|build)\.js$/,
        optimize: 'none',
        optimizeCss: 'none',
        removeCombined: true,
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
        }
    }
    return gulp.src([
            'js/*.js', 'js/**/*.js',
            '!js/plug/ng-file-upload/*.js',
            '!js/plug/ng-file-upload/**/*.js',

            '!js/upload/*.js',
            '!js/upload/**/*.js',

            '!js/plug/upload/*.js',
            '!js/plug/upload/**/*.js',

            '!js/plug/layui/*.js',
            '!js/plug/layui/**/*.js',
        ])
        .pipe(requirejsOptimize(options))
        .pipe(gulp.dest('dist'));
});
gulp.task("scripts:index", function () {
    const options = {
        //baseUrl: 'js/',
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
            'jcrop': {
                deps: ['jquery'] , 
                exports: 'ajcrop'
            },
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
            'ui-bootstrap': {
                deps: ['angular'] , 
                exports: 'ui-bootstrap'
            },
            "angularAMD": {
                deps: ['angular'] , 
                exports: 'angularAMD'
            },
            "ngFileUpload-shim": {
                deps: ['angular'] , 
                exports: 'ngFileUpload-shim'
            },
            "ngFileUpload": {
                deps: ['angular'] , 
                exports: 'ngFileUpload'
            },
            "angularFileUpload": {
                deps: ['angular'] , 
                exports: 'angularFileUpload'
            },
            "ngload": {
                deps: ['angularAMD'] , 
                exports: 'ngload'
            }
        },
        exclude : [
            'jquery',
            //'jcrop',
            'angularAMD',
            'angularFileUpload',
        ]
    }
    return gulp.src(
        [
            'js/*.js', 'js/**/*.js',
            '!js/upload/angular-file-upload/src/*.js','!js/upload/angular-file-upload/src/**/*.js',
            //'!js/plug/**/*.js'
        ]/*
        {base : options.baseUrl}*/
    )
    // Traces all modules and outputs them in the correct order. 
    .pipe(amdOptimize("./js/app",options))
    //.pipe(concat("index.js"))
    .pipe(gulp.dest("dist/js"));
 
});

gulp.task('run', ['scripts:index']);