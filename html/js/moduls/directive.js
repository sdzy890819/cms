define(['app'],function(app){
	app.directive('repeatFinish', function ($timeout) {
	  	return {
			restrict: 'A',
			link: function (scope, element, attr ) {
			  if (scope.$last === true) {
			    $timeout(function () {
               	 	scope.$eval( scope.$parent[attr.repeatFinish] )
               	 	scope.$emit(attr.repeatFinish, element, attr);
			    },200);
			  }
			}
		};
	});
});