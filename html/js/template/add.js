define(["app",'./addForm','form','position','fixedNav'], function ( app , list ) {
	app.directive('templateAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope){
	        	$scope.title = '新增模版';
	        	$scope.$parent.menu.push({name:$scope.title});
	        	angular.extend($scope,{
					save : function( arr ){ //保存
						alert(arr)
					},
					cancel : function( arr ){ //取消
						alert(arr)
					}
				});
				$scope.edit = { //导航操作按钮
					list : [
						{
							name:'保存',
							evt : $scope.save,
							cls : 'add'
						}
					]
				}
				$scope.formdata = { //确认按钮
					title : $scope.title,
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