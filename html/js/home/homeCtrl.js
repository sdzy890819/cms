define(["app",'head','menu'], function ( app ) {
	app.directive('contentRouter',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/home/index.html',
	        controller : function($uibModal){
	        	 
	        }
	    };
	});
	return ["$uibModal",function($uibModal){
		/*$uibModal.open({
	      animation: true,
	      ariaLabelledBy: 'modal-title',
	      ariaDescribedBy: 'modal-body',
	      template: 'myModalContent.html',
	    });*/
	}]
});