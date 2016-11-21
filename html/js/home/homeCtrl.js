define(function (require, exports, module) {
	var app = require('../ng-element')
		,head = require('../common/header')
		,menu = require('../common/menu');
		
	head.init({app : app});
	menu.init({app : app});
	app.directive('contentRouter',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/home/index.html',
	        controller : function(){

	        }
	    };
	});
    app.controller('mainCtrl', ['$scope', function($scope) {}]);
});
