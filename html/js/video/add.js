define(["app",'./addForm','form','position','fixedNav'], function ( app , list ) {
	app.directive('videoAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope){
	        	$scope.title = "上传视频";
	        	$scope.$parent.menu.push({name:$scope.title})
				$scope.save = function( obj ){ //保存
					alert(obj)
				}
				$scope.cancel = function( obj ){ //取消
					alert(obj)
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