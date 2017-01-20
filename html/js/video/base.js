define(["app",'./baseForm', '../data/getData','form','position','fixedNav'], function ( app , list, Data ) {
	app.directive('videoBase',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
        templateUrl : '../template/common/addAndEdit.html',
        controller : function($scope, $state){
        	$scope.title = "视频基础信息";
        	$scope.$parent.menu.push({name:$scope.title});

					$scope.save = function( obj, _detail ){ //保存
						if ($scope.data.id != undefined){
							Data.video.updateVideoBase({
								id : $scope.data.id,
								baseUrl : obj.baseUrl,
								basePath : obj.basePath,
								callback : function(_data){
									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);																							
									});										
								}
							})
						}else{
							Data.video.createVideoBase({
								baseUrl : obj.baseUrl,
								basePath : obj.basePath,
								callback : function(_data){
									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);																							
									});										
								}
							})
						}
					}

					Data.video.videoBase({
						callback : function(_data){							
							$scope.formdata = { //确认按钮
								title : $scope.title,
								list : list,								
								submit : [
									{
										name : '保存',
										evt : 'save',
										icon_cls : 'save'
									}
								]
							}
							$scope.data = _data.data;
						}
					})

        }
	    };
	});
});