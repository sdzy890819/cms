define(function (require, exports, module) {
    var angular = require('angular');
    var asyncLoader = require('plug/angular-async-loader.min');

    require('angular-router');
    require('angular-css');

    var app = angular.module('ngbody', ['ui.router','angularCSS']);

    asyncLoader.configure(app);

    module.exports = app;
});
