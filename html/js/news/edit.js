define(["app",'./columnForm','form','position','fixedNav'], function ( app , list ) {
	app.directive('newsEdit',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope){
				$scope.$parent.menu.push({name:"新闻栏目编辑"}); //栏目

				$scope.save = function( obj ){ //保存
					alert(obj)
				}
				$scope.formdata = { //确认按钮
					title : '新闻栏目编辑',
					list : list,
					submit : [
						{
							name : '保存',
							evt : 'save',
							icon_cls : 'save'
						}
					]
				}

	        }
	    };
	});
});
