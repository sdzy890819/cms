define(['app'],function(app){
	app.directive('repeatFinish', function ($timeout) {
	  	return {
			restrict: 'A',
			link: function (scope, element, attr , controller,$parse,$parse,$parse) {
			  if (scope.$last === true) {
			    $timeout(function () {
               	 	scope.$eval( scope.$parent[attr.repeatFinish] )
               	 	scope.$emit(attr.repeatFinish);
			    });
			  }
			}
		};
	});
});