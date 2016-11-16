(function(){
	angular.module('ngbody',[]).config(function($provide ,$compileProvider){
		$compileProvider.directive('headerNav', function() {
	        return {
		    	restrict : 'E',
		    	replace : true,
		    	transclude : true,
		        templateUrl : '../template/header.html',
		        controller : function(){

		        }
		    };
	    });
	})


	return;
	angular.module('ngbody.directive',['headerNav','menuNav'], function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/header.html',
	        controller : function(){

	        }
	    };
	});

	return;
	angular.module('ngbody', ['xmpl.service', 'xmpl.directive', 'xmpl.filter']).
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