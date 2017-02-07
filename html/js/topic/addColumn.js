define(["app",'./columnForm','../data/getData','form','position','fixedNav'], function ( app , list , getData ) {
	app.directive('topicAddColumn',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope, $state){
	        	$scope.title = "新建系列专题分类";
	        	$scope.$parent.menu.push({name:$scope.title})
				$scope.save = function( obj ){ //保存
					getData.topic.createTopicColumn({
						name : obj.name,
						callback : function(_data){
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(_data.message);
								if(_data.code == 0){
									$state.go('topic.columnList');
								}								
							});
						}
					})
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