define(['require',"app",'jquery','./moduls/Tool'
], function ( require , app , $ , Tool  ) {
	app.directive('search',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/search.html',
	        controller : function($scope,pop,$uibModal , $css , GenerateArrList, $state){

	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
