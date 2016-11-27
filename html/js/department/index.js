define(function (require, exports, module) {
	var app = require('../ng-element')
		,head = require('../common/header')
		,menu = require('../common/menu');
	head.init({app : app});
	menu.init({app : app});
    app.controller('mainCtrl', ['$scope','$location', function($scope , $location) {
        var arr = [{name:"部门管理",link:"department.list"}];
    	$scope.$on('$viewContentLoaded',function(){
    		$scope.menu = arr;
    	});
    	$scope.menu = arr; //栏目
    }]);
});
