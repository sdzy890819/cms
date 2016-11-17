define(['header','menu','angular'],function( header , menu  , angular ){
	angular.directive('contentRouter',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/home/index.html',
	        controller : function(){

	        }
	    };
	});
})