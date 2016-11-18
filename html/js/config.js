require.config({
    baseUrl: 'js/',
    paths: {
        'jquery': 'plug/jquery-1.9.1.min',
        'angular': 'plug/angular',
        'angular-router': 'plug/angular-ui-router.min',
        'angular-async-loader': 'plug/angular-async-loader.min',
        'header': 'common/header',
        'menu': 'common/header',
        'app' : 'ng-element'
    },
    shim: {
        'jquery': {exports: '$'},
        'angular': {exports: 'angular'},
        'angular-router': {
        	deps: ['angular'] , 
        	exports: 'angular-router'
    	}
    },
    urlArgs: "bust=" +  (new Date()).getTime()
});

require(['angular', './routers'], function (angular) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['ngbody']);
    });
});
