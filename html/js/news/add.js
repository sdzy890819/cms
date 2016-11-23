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
				$scope.menu = [{name:"新闻管理",link:"news.add"},{name:"新增新闻",link:"news.add",show:"true"}];
				$scope.edit = {
					nav : [{
						name : '保存',
						evt : $scope.save,
						cls : 'plus'
					}]
				}
	        }
	    };
	});
});
