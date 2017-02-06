define(["app",'./classForm','../data/getData','form','position','fixedNav'], function ( app , list , getData ) {
	app.directive('topicAddClass',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope){
	        	$scope.title = "新增分类";
	        	$scope.$parent.menu.push({name:$scope.title})
				$scope.save = function( obj ){ //保存
					console.log(11);
					getData.topic.createTopicClassify({
						name : obj.name,
						callback : function(_data){
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(_data.message);
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