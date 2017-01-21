require.config({
    baseUrl: 'js/',
    paths: {
        'jquery': 'plug/jquery-1.11.2.min',
        //'jquery-migrate': 'plug/jquery-migrate-3.0.0.min',
        'wangEditor' : '../wangEditor/dist/js/wangEditor.min',


        'angular': 'plug/angular',
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
        'form' : 'search/index',        
        'search' : 'common/form',        
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
    deps:['app'],
    urlArgs: "bust=" +  (new Date()).getTime()
});