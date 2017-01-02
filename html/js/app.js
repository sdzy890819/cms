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
        'jquery-migrate': ['jquery'],
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
    }//,
    //urlArgs: "bust=" +  (new Date()).getTime()
});

// bootstrap
define(["angular", "angularAMD","angular-ui-router",'angular-css','jquery','ui-bootstrap','layui'], function (angular, angularAMD) {
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
                css: {href: 'style/stylesheets/home.css'}
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
            .state('department', angularAMD.route({
                url: '/department',
                templateUrl: 'template/common/index.html',
                controllerUrl: 'department/index'
            }))
            .state('department.list', angularAMD.route({
                url: '/list',
                template : '<department-list></department-list>',
                controllerUrl: 'department/list'
            }))
            .state('department.edit', angularAMD.route({
                url: '/edit',
                template : '<department-edit></department-edit>',
                controllerUrl: 'department/edit'
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
            .state('user.clear', angularAMD.route({ // 清理
                url: '/clear',
                template: '<user-clear></user-clear>',
                controllerUrl: 'user/clear'
            }))
            .state('user.randomPassword', angularAMD.route({ // 密码
                url: '/randomPassword',
                template: '<user-random-password></user-random-password>',
                controllerUrl: 'user/randomPassword'
            }))
            .state('user.password', angularAMD.route({ // 密码管理
                url: '/password',
                template: '<user-password></user-password>',
                controllerUrl: 'user/password'
            }))
            .state('user.identity', angularAMD.route({ // 身份
                url: '/identity',
                template: '<user-identity></user-identity>',
                controllerUrl: 'user/identity'
            }))
            .state('user.function', angularAMD.route({ // 指定功能
                url: '/function',
                template: '<user-function></user-function>',
                controllerUrl: 'user/function'
            }))
            .state('user.login', angularAMD.route({ // 登录
                url: '/login',
                template: '<user-login></user-login>',
                controllerUrl: 'user/login'
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
            .state('jurisdiction.del', angularAMD.route({ //新增
                url: '/del',
                template: '<jurisdiction-del></jurisdiction-del>',
                controllerUrl: 'jurisdiction/del'
            }))
            .state('jurisdiction.edit', angularAMD.route({ //新增
                url: '/edit',
                template: '<jurisdiction-edit></jurisdiction-edit>',
                controllerUrl: 'jurisdiction/edit'
            }))
            .state('jurisdiction.list', angularAMD.route({ //list
                url: '/list',
                template: '<jurisdiction-list></jurisdiction-list>',
                controllerUrl: 'jurisdiction/list'
            }))
            .state('jurisdiction.administrator', angularAMD.route({ //list
                url: '/administrator',
                template: '<jurisdiction-administrator></jurisdiction-administrator>',
                controllerUrl: 'jurisdiction/administrator'
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
            .state('image.upload', angularAMD.route({ 
                url: '/upload',
                template: '<image-upload></image-upload>',
                controllerUrl: 'image/upload'
            }))
            .state('image.edit', angularAMD.route({ 
                url: '/edit',
                template: '<image-edit></image-edit>',
                controllerUrl: 'image/edit'
            }))
            .state('image.select', angularAMD.route({ 
                url: '/select',
                template: '<image-select></image-select>',
                controllerUrl: 'image/select'
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
            .state('video.upload', angularAMD.route({ 
                url: '/upload',
                template: '<video-upload></video-upload>',
                controllerUrl: 'video/upload'
            }))
            .state('video.select', angularAMD.route({ 
                url: '/select',
                template: '<video-select></video-select>',
                controllerUrl: 'video/select'
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