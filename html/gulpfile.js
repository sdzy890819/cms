var gulp = require('gulp') , 
	requirejsOptimize = require('gulp-requirejs-optimize') , 
	rjs = require('gulp-requirejs');

gulp.task('build',function(){
	return gulp.src(["js/*.js",'js/**/*.js'])
		.pipe(requirejsOptimize({
			//appDir : './js/',

	        baseUrl: './js/',
	        //out: 'newHtml',
	        //generateSourceMaps: true,
	        optimize: "uglify",
	        paths: {
		        'jquery': 'plug/jquery-1.11.2.min',
		        'wangEditor' : '../wangEditor/dist/js/wangEditor',

		        'angular': 'plug/angular.min',
		        "angularAMD": "plug/angularAMD.min",
		        "ngload": "plug/ngload",
		        'angular-ui-router': 'plug/angular-ui-router.min',
		        'angular-css':'plug/angular-css.min',
		        'ui-bootstrap':'plug/ui-bootstrap-tpls-2.3.2.min',

		        'ngFileUpload-shim' : 'plug/ng-file-upload/dist/ng-file-upload-shim.min',
		        'ngFileUpload' : 'plug/ng-file-upload/dist/ng-file-upload.min',

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
		}))
    .pipe(gulp.dest('./deploy/')); // pipe it to the output DIR
})