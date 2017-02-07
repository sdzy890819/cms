require.config({
    baseUrl: 'js/',
    paths: {
        'zepto': 'plug/zepto.min',
        'wangEditor' : 'plug/wangEditor/dist/js/wangEditor',


        'angular': 'plug/angular.min',
        
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