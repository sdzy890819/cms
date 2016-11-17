define(['angular'],function(angular ){

	return;
	var ngbody = angular.module("ngbody", []);
	ngbody.directive("headerNav", function() {
	    return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/header.html',
	        controller: function () {
	            this.name = 'Pascal';
	        },
	        link : function(scope,element){
	        	var b;
	        }
	    };
	});
});