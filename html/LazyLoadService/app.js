require.config({
    paths: {
        // angular
        "angular": "bower_components/angular/angular",
        
        // angular-ui
        "angular-ui-router": "bower_components/angular-ui-router/release/angular-ui-router",
        
        // angularAMD
        "angularAMD": "bower_components/angularAMD/angularAMD",
        "ngload": "bower_components/angularAMD//ngload"
    },
    shim: {        
        // angular
		"angular": { exports: "angular" },
        
        // angular-ui
        "angular-ui-router": ["angular"],
        
        // angularAMD
        "angularAMD": ["angular"],
        "ngload": ["angularAMD"]
    }
});

// bootstrap
define(["angular", "angularAMD", "angular-ui-router"], function (angular, angularAMD) {
        
    // routes
    var registerRoutes = function($stateProvider, $urlRouterProvider) {
        	
        // default
        $urlRouterProvider.otherwise("/home");
        
        // route
        $stateProvider
        
            // home
            .state("home", angularAMD.route({
                url: "/home",
                templateUrl: "home.html",
                controllerUrl: "home.js"
            }))
			
			// home
            .state("about", angularAMD.route({
                url: "/about",
                templateUrl: "about.html",
                controllerUrl: "about.js"
            }))
        ;   		
    };        
        
    // module
    var app = angular.module("app", ["ui.router"]);

    // config
    app.config(["$stateProvider", "$urlRouterProvider", registerRoutes]);

    // bootstrap
    return angularAMD.bootstrap(app);
});