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
        'angularFileUpload':'plug/angular-file-upload.min',

        //upload img
        'ngFileUpload-shim' : 'plug/ng-file-upload/dist/ng-file-upload-shim.min',
        'ngFileUpload' : 'plug/ng-file-upload/dist/ng-file-upload.min',

        //upload video
        'uploadify' : 'upload/uploadify/jquery.uploadify.min',

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
        "ngload": ["angularAMD"]
    }
    ,urlArgs: "bust=" +  (new Date()).getTime()
});

// bootstrap
define(["angular", "angularAMD","angular-ui-router",'angular-css','jquery','ui-bootstrap','layui','ngFileUpload-shim','ngFileUpload','moduls/prototype'], function ( angular, angularAMD) {

    //临时登录 需要删除
    // module
    var app = angular.module("app", ["ui.router",'angularCSS','ui.bootstrap','ngFileUpload']);
    // config
    app.config(["$stateProvider", '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider){
        /*$locationProvider.html5Mode(true);*/
        $urlRouterProvider.otherwise('/home/main');

        $stateProvider
            .state("home", angularAMD.route({
                url: "/home",
                templateUrl: "template/main.html",
                css: {href: 'js/stylesheets/home.css'}
            }))
            .state('home.main', angularAMD.route({
                url: '/main',
                template : '<home-main></home-main>',
                controllerUrl: 'home/index'
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
            .state('news.newslist', angularAMD.route({
                url: '/newslist',
                template : '<news-list></news-list>',
                controllerUrl: 'news/newslist'
            }))
            .state('news.mynewslist', angularAMD.route({
                url: '/mynewslist',
                template : '<mynews-list></mynews-list>',
                controllerUrl: 'news/mynewslist'
            }))     
            .state('news.recommendcolumnlist', angularAMD.route({
                url: '/recommendcolumnlist',
                template : '<recommendcolumn-list></recommendcolumn-list>',
                controllerUrl: 'news/recommendcolumnlist'
            }))     
            .state('news.recommendcolumnadd', angularAMD.route({
                url: '/recommendcolumnadd',
                template : '<recommendcolumn-add></recommendcolumn-add>',
                controllerUrl: 'news/recommendcolumnadd'
            }))                          

            //新闻栏目
            .state('newscolumn', angularAMD.route({
                url: '/newscolumn',
                templateUrl : 'template/common/index.html',
                controllerUrl: 'newscolumn/index'
            }))
            .state('newscolumn.add', angularAMD.route({
                url: '/add',
                template : '<newscolumn-add></newscolumn-add>',
                controllerUrl: 'newscolumn/add'
            }))
            .state('newscolumn.list', angularAMD.route({
                url: '/list',
                template : '<newscolumn-list></newscolumn-list>',
                controllerUrl: 'newscolumn/list'
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
            .state('channel', angularAMD.route({
                url: '/channel',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'channel/index'
            }))
            .state('channel.list', angularAMD.route({
                url: '/list',
                template: '<channel-list></channel-list>',
                controllerUrl: 'channel/list'
            }))
            .state('channel.add', angularAMD.route({
                url: '/add',
                template: '<channel-add></channel-add>',
                controllerUrl: 'channel/add'
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
            .state('permission', angularAMD.route({
                url: '/permission',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'permission/index'
            }))
            .state('permission.add', angularAMD.route({ //新增
                url: '/add',
                template: '<permission-add></permission-add>',
                controllerUrl: 'permission/add'
            }))
            .state('permission.list', angularAMD.route({ //list
                url: '/list',
                template: '<permission-list></permission-list>',
                controllerUrl: 'permission/list'
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
            .state('image.imageBase', angularAMD.route({
                url: '/imageBase',   
                template: '<image-base></image-base>',         
                controllerUrl: 'image/imageBase'
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
            .state('video.base.add', angularAMD.route({
                url: '/base/add',
                template: '<video-base-add></video-base-add>',
                controllerUrl: 'video/base/add'
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

            //模版管理 2
            .state('template2', angularAMD.route({
                url: '/template2',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'template2/index'
            }))
            .state('template2.list', angularAMD.route({
                url: '/list',
                template: '<template2-list></template2-list>',
                controllerUrl: 'template2/list'
            }))
            .state('template2.add', angularAMD.route({
                url: '/add',
                template: '<template2-add></template2-add>',
                controllerUrl: 'template2/add'
            }))
            .state('template2.baseAdd', angularAMD.route({
                url: '/baseAdd',
                template: '<template2base-add></template2base-add>',
                controllerUrl: 'template2/baseAdd'
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
            .state('topic.addColumn', angularAMD.route({
                url: '/addColumn',
                template: '<topic-add-column></topic-add-column>',
                controllerUrl: 'topic/addColumn'
            }))
            .state('topic.columnList', angularAMD.route({
                url: '/columnList',
                template: '<topic-column-list></topic-column-list>',
                controllerUrl: 'topic/columnList'
            }))

            //用户组
            .state('userposition', angularAMD.route({
                url: '/userposition',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'userposition/index'
            }))
            .state('userposition.list', angularAMD.route({
                url: '/list',
                template: '<userposition-list></userposition-list>',
                controllerUrl: 'userposition/list'
            }))
            .state('userposition.add', angularAMD.route({
                url: '/add',
                template: '<userposition-add></userposition-add>',
                controllerUrl: 'userposition/add'
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

            //统计管理
            .state('statistics', angularAMD.route({
                url: '/statistics',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'statistics/index'
            }))
            .state('statistics.list', angularAMD.route({
                url: '/list',
                template: '<statistics-list></statistics-list>',
                controllerUrl: 'statistics/list'
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
