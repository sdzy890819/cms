define(["app",'./addForm','form','position','fixedNav'], function ( app , list ) {
	app.directive('departmentEdit',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/news/add.html',
	        controller : function($scope){
	        	$scope.$parent.menu.push({name:"部门分类编辑"})
				$scope.save = function( obj ){ //保存
					alert(obj)
				}
				$scope.cancel = function( obj ){ //取消
					alert(obj)
				}
				$scope.formdata = { //确认按钮
					title : '部门分类编辑',
					list : list,
					submit : [
						{
							name : '保存',
							evt : 'save',
							icon_cls : 'save'
						},
						{
							name:'清空',
							evt : 'cancel',
							icon_cls : 'cancel',
							cls : 'cancel'
						}
					]
				}
	        }
	    };
	});
});