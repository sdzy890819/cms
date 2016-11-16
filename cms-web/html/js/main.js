(function(){
	var ngbody = angular.module("ngbody", []);
	ngbody.directive("main", function() {
	    return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/main.html',
	        controller : function(){

	        }
	    };
	});
	ngbody.directive("headerNav", function() {
	    return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/header.html',
	        controller : function(){

	        }
	    };
	});
	ngbody.directive("menuNav", function() {
	    return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/menu.html',
	        controller:function(){
	        	
	        },
	        scope : function(){

	        },
	        link : function(){

	        }
	    };
	});
})();