(function(){
	var menu = angular.module("leftMenu", []);
	menu.directive("menuNav", function() {
	    return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/menu.html',
	        controller:function(){
	        	sdfasdf
	        },
	        scope : function(){

	        },
	        link : function(){
	        		
	        }
	    };
	});
})();