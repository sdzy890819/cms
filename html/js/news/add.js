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
				$scope.save = function(){ //保存
					alert('保存')
				}
				$scope.rlease = function(){ //发布
					alert('发布')
				}
				$scope.menu = [{name:"新闻管理",link:"news.add"},{name:"新增新闻",link:"news.add",show:"true"}];
				$scope.edit = {
					nav : [{
						name : '保存',
						evt : $scope.save,
						cls : 'save'
					}],
					list : [
						{
							name:'发布',
							evt : $scope.rlease,
							cls : 'add'
						}
					]
				}
	        }
	    };
	});
});
