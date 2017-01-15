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

        'layui' : 'plug/layui/layui',
        'jcrop' : 'plug/jcrop/jquery.Jcrop.min',

        'head' : 'common/header' , 
        'menu' : 'common/menu' , 
        'form' : 'common/form',
        'formlist' : 'common/formlist',
        'position' : 'common/position',
        'fixedNav' : 'common/positionNav',
    },
    shim: {
        'jquery': {exports: '$'},
        //'jquery-migrate': ['jquery'],
        'jcrop': ['jquery'],


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
        "ngload": ["angularAMD"]
    }
    ,urlArgs: "bust=" +  (new Date()).getTime()
});

// bootstrap
define(["angular", "angularAMD","angular-ui-router",'angular-css','jquery','ui-bootstrap','layui','moduls/prototype'], function ( angular, angularAMD) {

    //临时登录 需要删除
    // module
    var app = angular.module("app", ["ui.router",'angularCSS','ui.bootstrap']);
    // config
    app.config(["$stateProvider", '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider){
        /*$locationProvider.html5Mode(true);*/
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state("home", angularAMD.route({
                url: "/home",
                templateUrl: "template/main.html",
                controllerUrl: "home/homeCtrl",
                css: {href: 'js/stylesheets/home.css'}
            }))

            //登录
            .state('login', angularAMD.route({
                url: '/login',
                templateUrl: 'template/login/index.html',
                controllerUrl: 'login/index',
                css: {href: 'js/plug/layui/css/layui.css'}
            }))

            //新闻
            .state('news', angularAMD.route({
                url: '/news',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'news/index'
            }))
            .state('news.add', angularAMD.route({
                url: '/add',
                template : '<news-add></news-add>',
                controllerUrl: 'news/add'
            }))
            .state('news.list', angularAMD.route({
                url: '/list',
                template : '<news-list></news-list>',
                controllerUrl: 'news/list'
            }))
            .state('news.edit', angularAMD.route({
                url: '/edit',
                template : '<news-edit></news-edit>',
                controllerUrl: 'news/edit'
            }))
            .state('news.newslist', angularAMD.route({
                url: '/newslist',
                template : '<news-newslist></news-newslist>',
                controllerUrl: 'news/newslist'
            }))

            //部门
            .state('category', angularAMD.route({
                url: '/category',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'category/index'
            }))
            .state('category.list', angularAMD.route({
                url: '/list',
                template : '<category-list></category-list>',
                controllerUrl: 'category/list'
            }))
            .state('category.add', angularAMD.route({
                url: '/add',
                template : '<category-add></category-add>',
                controllerUrl: 'category/add'
            }))            

            //频道管理
            .state('column', angularAMD.route({
                url: '/column',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'column/index'
            }))
            .state('column.list', angularAMD.route({
                url: '/list',
                template: '<column-list></column-list>',
                controllerUrl: 'column/list'
            }))
            .state('column.edit', angularAMD.route({
                url: '/edit',
                template: '<column-edit></column-edit>',
                controllerUrl: 'column/edit'
            }))

            //用户管理系统
            .state('user', angularAMD.route({
                url: '/user',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'user/index'
            }))
            .state('user.add', angularAMD.route({ //新增
                url: '/add',
                template: '<user-add></user-add>',
                controllerUrl: 'user/add'
            }))
            .state('user.list', angularAMD.route({ // list
                url: '/list',
                template: '<user-list></user-list>',
                controllerUrl: 'user/list'
            }))

            //权限管理系统
            .state('jurisdiction', angularAMD.route({
                url: '/jurisdiction',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'jurisdiction/index'
            }))
            .state('jurisdiction.add', angularAMD.route({ //新增
                url: '/add',
                template: '<jurisdiction-add></jurisdiction-add>',
                controllerUrl: 'jurisdiction/add'
            }))
            .state('jurisdiction.list', angularAMD.route({ //list
                url: '/list',
                template: '<jurisdiction-list></jurisdiction-list>',
                controllerUrl: 'jurisdiction/list'
            }))

            //图片管理系统
            .state('image', angularAMD.route({
                url: '/image',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'image/index'
            }))
            .state('image.list', angularAMD.route({ 
                url: '/list',
                template: '<image-list></image-list>',
                controllerUrl: 'image/list'
            }))
            .state('image.add', angularAMD.route({ 
                url: '/add',
                template: '<image-add></image-add>',
                controllerUrl: 'image/add'
            }))

            //视频上传功能
            .state('video', angularAMD.route({
                url: '/video',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'video/index'
            }))
            .state('video.list', angularAMD.route({ 
                url: '/list',
                template: '<video-list></video-list>',
                controllerUrl: 'video/list'
            }))
            .state('video.add', angularAMD.route({ 
                url: '/add',
                template: '<video-add></video-add>',
                controllerUrl: 'video/add'
            }))

            //模版管理
            .state('template', angularAMD.route({
                url: '/template',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'template/index'
            }))
            .state('template.list', angularAMD.route({ 
                url: '/list',
                template: '<template-list></template-list>',
                controllerUrl: 'template/list'
            }))
            .state('template.add', angularAMD.route({ 
                url: '/add',
                template: '<template-add></template-add>',
                controllerUrl: 'template/add'
            }))

            //专题管理
            .state('topic', angularAMD.route({
                url: '/topic',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'topic/index'
            }))
            .state('topic.list', angularAMD.route({ 
                url: '/list',
                template: '<topic-list></topic-list>',
                controllerUrl: 'topic/list'
            }))
            .state('topic.add', angularAMD.route({ 
                url: '/add',
                template: '<topic-add></topic-add>',
                controllerUrl: 'topic/add'
            }))
            .state('topic.addClass', angularAMD.route({ 
                url: '/addClass',
                template: '<topic-add-class></topic-add-class>',
                controllerUrl: 'topic/addClass'
            }))
            .state('topic.classList', angularAMD.route({ 
                url: '/classList',
                template: '<topic-class-list></topic-class-list>',
                controllerUrl: 'topic/classList'
            }))

            //频道管理
            .state('userchannel', angularAMD.route({
                url: '/userchannel',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'userchannel/index'
            }))
            .state('userchannel.list', angularAMD.route({ 
                url: '/userchannel',
                template: '<userchannel-list></userchannel-list>',
                controllerUrl: 'userchannel/list'
            }))
            .state('userchannel.add', angularAMD.route({ 
                url: '/add',
                template: '<userchannel-add></userchannel-add>',
                controllerUrl: 'userchannel/add'
            }))
            .state('userchannel.userList', angularAMD.route({ 
                url: '/userList',
                template: '<userchannel-user-list></userchannel-user-list>',
                controllerUrl: 'userchannel/userList'
            }))
            .state('userchannel.addUser', angularAMD.route({ 
                url: '/addUser',
                template: '<userchannel-add-user></userchannel-add-user>',
                controllerUrl: 'userchannel/addUser'
            }))

            //碎片管理
            .state('fragment', angularAMD.route({
                url: '/fragment',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'fragment/index'
            }))
            .state('fragment.list', angularAMD.route({ 
                url: '/list',
                template: '<fragment-list></fragment-list>',
                controllerUrl: 'fragment/list'
            }))
            .state('fragment.add', angularAMD.route({ 
                url: '/add',
                template: '<fragment-add></fragment-add>',
                controllerUrl: 'fragment/add'
            }))
            .state('fragment.addClass', angularAMD.route({ 
                url: '/addClass',
                template: '<fragment-add-class></fragment-add-class>',
                controllerUrl: 'fragment/addClass'
            }))
            .state('fragment.classList', angularAMD.route({ 
                url: '/classList',
                template: '<fragment-class-list></fragment-class-list>',
                controllerUrl: 'fragment/classList'
            }))
            .state('fragment.listHistory', angularAMD.route({ 
                url: '/listHistory',
                template: '<fragment-list-history></fragment-list-history>',
                controllerUrl: 'fragment/listHistory'
            }))
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
