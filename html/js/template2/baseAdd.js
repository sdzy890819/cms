define(["app",'./baseForm','../data/getData','../moduls/Tool','form','position','fixedNav'], function ( app , list , getData , Tool ) {
	app.directive('template2baseAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope){
	        	$scope.title = '第二模板基础信息';
	        	$scope.$parent.menu.push({name:$scope.title});
	        	$scope.save = function( obj ){ //发布	  	        		
							getData.template.updateTemplate2base({
								id : $scope.data.id,
								basePath : obj.basePath,
								callback : function(_data){
									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);
									});
								}
							});
						}
						
						getData.template.template2base({
							callback : function(_data){									
								$scope.formdata = { //确认按钮
									title : $scope.title,
									list : list,				
									submit : [
										{
											name:'提交',
											evt : 'save',
											icon_cls : 'ok'
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