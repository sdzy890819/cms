define(["app",'require', '../data/getData' ,'head','menu'], function ( app , require, getData ) {
	app.directive('homeWelcome',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/home/welcome.html',
	        controller : function($scope, $uibModal, $css){	        	
	        
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
	}];

	
});