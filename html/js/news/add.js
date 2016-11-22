define(function (require, exports, module) {
	var app = require('../ng-element'),
		position = require('../common/position') , 
		fixedNav = require('../common/positionNav');

	position.init({
		app : app
	});
	fixedNav.init({app : app})

	app.directive('newsAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/news/add.html',
	        controller : function($scope){
				$scope.save = function(){
					alert(2)
				}
				$scope.edit = {
					nav : [{
						name : '保存',
						evt : $scope.save
					}]
				}
	        }
	    };
	});
});
