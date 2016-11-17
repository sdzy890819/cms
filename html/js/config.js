require.config({
    baseUrl: 'js/',
    paths: {
        'jquery': 'plug/jquery-1.9.1.min',
        'angular': 'plug/angular',
        'angular-router': 'plug/angular-ui-router.min',
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
