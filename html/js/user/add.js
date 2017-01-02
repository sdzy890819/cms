define(["app",'./addForm','form','position','fixedNav'], function ( app , list ) {
	app.directive('userAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope){
	        	$scope.$parent.menu.push({name:"新增用户"});
	        	angular.extend($scope,{
					save : function( arr ){ //保存
						alert(arr)
					},
					cancel : function( arr ){ //取消
						alert(arr)
					},
					edit : { //导航操作按钮
						list : [
							{
								name:'保存',
								evt : $scope.save,
								cls : 'add'
							}
						]
					},
					formdata : { //确认按钮
						title : '新增新闻',
						list : list,
						submit : [
							{
								name : '保存',
								evt : 'save',
								icon_cls : 'save'
							},
							{
								name:'取消',
								evt : 'cancel',
								icon_cls : 'cancel',
								cls : 'cancel'
							}
						]
					}
				});
	        }
	    };
	});
});