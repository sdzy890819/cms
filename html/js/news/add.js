define(["app",'./addForm','form','position','fixedNav'], function ( app , list ) {
	app.directive('newsAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/news/add.html',
	        controller : function($scope){
	        	$scope.$parent.menu.push({name:"新增新闻"})
				$scope.save = function( obj ){ //保存
					alert(obj)
				}
				$scope.rlease = function( obj ){ //发布
					alert(obj)
				}
				$scope.view = function( obj ){ //预览
					alert(obj)
				}
				$scope.cancel = function( obj ){ //取消
					alert(obj)
				}
				
				$scope.edit = { //导航操作按钮
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
				$scope.formdata = { //确认按钮
					title : '新增新闻',
					list : list,
					submit : [
						{
							name : '保存',
							evt : 'save',
							icon_cls : 'save'
						},
						{
							name:'预览',
							evt : 'view',
							icon_cls : 'view'
						},
						{
							name:'确认发布',
							evt : 'rlease',
							icon_cls : 'ok'
						},
						{
							name:'取消',
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