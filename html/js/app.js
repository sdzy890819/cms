require.config({
    baseUrl: 'js/',
    paths: {
        'jquery': 'plug/jquery-1.9.1.min',
        'angular': 'plug/angular',
        "angularAMD": "plug/angularAMD.min",
        "ngload": "plug/ngload",
        'angular-ui-router': 'plug/angular-ui-router.min',
        'angular-css':'plug/angular-css.min',
        'head' : 'common/header' , 
        'menu' : 'common/menu'
    },
    shim: {
        'jquery': {exports: '$'},
        'angular': {exports: 'angular'},
        'angular-ui-router': {
            deps: ['angular'] , 
            exports: 'angular-ui-router'
        },
        'angular-css': {
            deps: ['angular'] , 
            exports: 'angular-css'
        },
        "angularAMD": ["angular"],
        "ngload": ["angularAMD"]
    }//,
    //urlArgs: "bust=" +  (new Date()).getTime()
});

// bootstrap
define(["angular", "angularAMD", "angular-ui-router",'angular-css'], function (angular, angularAMD) {
        
    // routes
    var registerRoutes = function($stateProvider, $urlRouterProvider) {
        	
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state("home", angularAMD.route({
                url: "/home",
                templateUrl: "template/main.html",
                controllerUrl: "home/homeCtrl",
                css: {href: 'style/stylesheets/home.css'}
            }))

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
    };        
        
    // module
    var app = angular.module("app", ["ui.router",'angularCSS']);

    // config
    app.config(["$stateProvider", "$urlRouterProvider", registerRoutes]);

    // bootstrap
    return angularAMD.bootstrap(app);
});