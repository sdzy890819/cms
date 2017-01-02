define(["app",'./addForm','form','position','fixedNav'], function ( app , list ) {
	app.directive('userEdit',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope){
				$scope.$parent.menu.push({name:"频道编辑"}); //栏目

				$.extend($scope,{
					save : function( arr ){ //保存
						alert(arr)
					},
					cancel : function( arr ){ //取消
						alert(arr)
					}
				})

				$scope.formdata = { //确认按钮
					title : '新增频道分类',
					list : list,
					submit : [
						{
							name : '确定',
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
