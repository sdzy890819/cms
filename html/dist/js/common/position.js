define(["app"], function ( app ) {
	app.directive('position',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/position.html',
			scope : {
	            menu : '=menu'
	        },
			controller : function($scope , $state){
				$scope.position = {
					name : '首页' , 
					link : 'home'
				}
			}
		}
	})
});