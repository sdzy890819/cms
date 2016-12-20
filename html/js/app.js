require.config({
    baseUrl: 'js/',
    paths: {
        'jquery': 'plug/jquery-3.0.0.min',
        'jquery-migrate': 'plug/jquery-migrate-3.0.0.min',
        'angular': 'plug/angular',
        "angularAMD": "plug/angularAMD.min",
        "ngload": "plug/ngload",
        'angular-ui-router': 'plug/angular-ui-router.min',
        'angular-css':'plug/angular-css.min',

        'page' : 'plug/pagination.min',
        'layui' : 'plug/layui/layui',

        'head' : 'common/header' , 
        'menu' : 'common/menu' , 
        'form' : 'common/form',
        'formlist' : 'common/formlist',
        'position' : 'common/position',
        'fixedNav' : 'common/positionNav',
    },
    shim: {
        'jquery': {exports: '$'},
        'jquery-migrate': ['jquery'],
        'page': ['jquery'],


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
define(["angular", "angularAMD", "angular-ui-router",'angular-css','jquery','layui'], function (angular, angularAMD) {
    // module
    var app = angular.module("app", ["ui.router",'angularCSS']);
    // config
    app.config(["$stateProvider", '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider){
        /*$locationProvider.html5Mode(true);*/
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state("home", angularAMD.route({
                url: "/home",
                templateUrl: "template/main.html",
                controllerUrl: "home/homeCtrl",
                css: {href: 'style/stylesheets/home.css'}
            }))

            //新闻
            .state('news', angularAMD.route({
                url: '/news',
                templateUrl: 'template/news/index.html',
                controllerUrl: 'news/index'
            }))
            .state('news.add', angularAMD.route({
                url: '/add',
                template : '<news-add></news-add>',
                controllerUrl: 'news/add'
            }))
            .state('news.edit', angularAMD.route({
                url: '/edit',
                template : '<news-edit></news-edit>',
                controllerUrl: 'news/edit'
            }))
            .state('news.list', angularAMD.route({
                url: '/list',
                template : '<news-list></news-list>',
                controllerUrl: 'news/list'
            }))
            .state('news.newslist', angularAMD.route({
                url: '/newslist',
                template : '<news-newslist></news-newslist>',
                controllerUrl: 'news/newslist'
            }))

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

    layui.config({
      dir: 'js/plug/layui/' //layui.js 所在路径（注意，如果是script单独引入layui.js，无需设定该参数。），一般情况下可以无视
      ,version: false //一般用于更新组件缓存，默认不开启。设为true即让浏览器不缓存。也可以设为一个固定的值，如：201610
      ,debug: false //用于开启调试模式，默认false，如果设为true，则JS模块的节点会保留在页面
      ,base: '' //设定扩展的Layui组件的所在目录，一般用于外部组件扩展
    });

    // bootstrap
    return angularAMD.bootstrap(app);
});