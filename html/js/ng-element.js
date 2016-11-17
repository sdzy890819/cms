define(function (require, exports, module) {
    var angular = require('angular');
    //var asyncLoader = require('plug/2/angular-async-loader');

    require('angular-router');

    var app = angular.module('ngbody', ['ui.router']);

    //asyncLoader.configure(app);

    module.exports = app;
});
