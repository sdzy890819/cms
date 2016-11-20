define(function (require, exports, module) {
	var app = require('../ng-element'),
		position = require('../common/position');

	position.init({
		app : app
	});

	app.directive('contentRouter',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/news/add.html',
	        controller : function($state){
	        	
	        }
	    };
	});
});
