define(["app",'./baseForm', '../data/getData','form','position','fixedNav'], function ( app , list, Data ) {
	app.directive('imageBase',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
        templateUrl : '../template/common/addAndEdit.html',
        controller : function($scope, $state){
        	$scope.title = "图片基础信息";
        	$scope.$parent.menu.push({name:$scope.title});

					$scope.save = function( obj, _detail ){ //保存
						if ($scope.data.id != undefined){
							Data.image.updateImageBase({
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
							Data.image.createImageBase({
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

					Data.image.imageBase({
						callback : function(_data){
							console.log(_data);
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