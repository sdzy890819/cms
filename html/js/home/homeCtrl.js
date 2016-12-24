define(["app",'head','menu'], function ( app ) {
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
});