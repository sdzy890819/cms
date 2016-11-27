define(function (require, exports, module) {
	var app = require('../ng-element')
		,head = require('../common/header')
		,menu = require('../common/menu');
	head.init({app : app});
	menu.init({app : app});
    app.controller('mainCtrl', ['$scope','$location', function($scope , $location) {
    	$scope.$on('$viewContentLoaded',function(){
    		$scope.menu = [{name:"新闻管理",link:"news.list"}];
    	});
    	$scope.menu = [{name:"新闻管理",link:"news.list"}]; //栏目
    }]);
});
