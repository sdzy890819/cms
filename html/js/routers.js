define(function (require, exports, module) {
    var app = require('ng-element');
    require('./plug/jquery-1.9.1.min');
    app.run(['$state', '$stateParams', '$rootScope','$log', function ($state, $stateParams, $rootScope,$log) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        //通过$on为$rootScope添加路由事件
       /* $rootScope.$on('$stateChangeSuccess',function(event, current, previous){
            $log.debug('successfully changed routes');
            
            $log.debug(event);
            $log.debug(current);
            $log.debug(previous);
            $log.debug($rootScope.$state);
            $log.debug($stateParams);
        });*/
    }]);
   
    app.config(['$stateProvider', '$urlRouterProvider' , '$locationProvider' , function ($stateProvider, $urlRouterProvider , $locationProvider) {
        /*$locationProvider.html5Mode({
          enabled: true,
          requireBase: false,
          //rewriteLinks: false
        });*/
        //$locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'template/main.html',
                 // new attribute for ajax load controller
                controllerUrl: 'home/homeCtrl',
                controller: 'mainCtrl',
                css: {
                    href: 'style/stylesheets/home.css',
                    //bustCache: true
                }
            })
            .state('news', {
                url: '/news',
                templateUrl: 'template/main.html',
                controllerUrl: 'news/index',
                controller: 'mainCtrl'
                /*views : {
                    'add1' :{
                        url: '/add',
                        controllerUrl: 'news/add'
                    }
                }*/
            })
            .state('news.add', {
                url: '/add',
                controllerUrl: 'news/add',
                css: {href: 'style/stylesheets/news/index.css'}
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
