(function(){
	var menu = angular.module("header", []);
	menu.directive("headerNav", function() {
	    return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/header.html',
	        controller : function(){
	        	
	        }
	    };
	});
})();