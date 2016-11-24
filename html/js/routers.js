define(function (require, exports, module) {
    var app = require('ng-element');
    require('./plug/jquery-1.9.1.min')
    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope ) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
       // console.log($ngRouteProvider )
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

            //新闻
            .state('news', {
                url: '/news',
                templateUrl: 'template/news/index.html',
                controllerUrl: 'news/index',
                controller: 'mainCtrl'
            })
            .state('news.add', {
                url: '/add',
                template : '<news-add></news-add>',
                controllerUrl: 'news/add'
            })
            .state('news.edit', {
                url: '/edit',
                template : '<news-edit></news-edit>',
                controllerUrl: 'news/edit'
            })
            .state('news.list', {
                url: '/list',
                template : '<news-list></news-list>',
                controllerUrl: 'news/list'
            })
            .state('news.newslist', {
                url: '/newslist',
                template : '<news-newslist></news-newslist>',
                controllerUrl: 'news/newslist'
            })

            //部门
            .state('department', {
                url: '/department',
                templateUrl: 'template/department/index.html',
                controllerUrl: 'department/index',
                controller: 'mainCtrl'
            })
            .state('department.edit', {
                url: '/edit',
                template : '<department-edit></department-edit>',
                controllerUrl: 'department/edit'
            })
            .state('department.list', {
                url: '/list',
                template : '<department-list></department-list>',
                controllerUrl: 'department/list'
            })

            //栏目
            .state('column', {
                url: '/column',
                templateUrl: 'template/column/index.html',
                controllerUrl: 'column/index',
                controller: 'mainCtrl'
            })
            .state('column.edit', {
                url: '/edit',
                template : '<column-edit></column-edit>',
                controllerUrl: 'column/edit'
            })
            .state('column.list', {
                url: '/list',
                template : '<column-list></column-list>',
                controllerUrl: 'column/list'
            })
            
    }]);
});
