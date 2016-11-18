define(function (require, exports, module) {
    var app = require('ng-element');
    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);
   
    app.config(['$stateProvider', '$urlRouterProvider' , '$locationProvider' , function ($stateProvider, $urlRouterProvider , $locationProvider) {
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false,
          //rewriteLinks: false
        });
        //$locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/home');//mainwelcome maintradepasswdSet 
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'template/main.html',
                 // new attribute for ajax load controller
                controllerUrl: 'home/homeCtrl',
                controller: 'homeCtrl'
            })
            .state('users', {
                url: '/users',
                templateUrl: 'template/user.html',
                 // new attribute for ajax load controller
                controllerUrl: 'home/homeCtrl',
                controller: 'homeCtrl'
            })
            .state('components', {
                url: '/components',
                templateUrl: 'components/components.html',
                 // new attribute for ajax load controller
                controllerUrl: 'components/componentsCtrl',
                controller: 'componentsCtrl'
            });
    }]);
});
