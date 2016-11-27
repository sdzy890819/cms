define(function (require, exports, module) {
	var app = require('../ng-element')
		,head = require('../common/header')
		,menu = require('../common/menu');
	head.init({app : app});
	menu.init({app : app});
    app.controller('mainCtrl', ['$scope','$location', function($scope , $location) {
        var arr = [{name:"频道管理",link:"column.list"}];
    	$scope.$on('$viewContentLoaded',function(){
    		$scope.menu = arr;
    	});
    	$scope.menu = arr; //栏目
    }]);
});
