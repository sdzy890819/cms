define(["app", '../data/getData', './form','form','position','fixedNav'], function ( app , getData, getList ) {
	app.directive('channelAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope, $state){
	        	$scope.title = "新增专题";
	        	$scope.$parent.menu.push({name:$scope.title});

	        	$scope.save = function(obj){
							var categoryId;
							$.each(obj.selects,function(){
								if(this.title == 'categoryId'){
									categoryId = this.id;
								}
							})	        		
							getData.channel.createChannel({
								"categoryId"   : categoryId,
								"channelName"  : obj.channelName,
								"channelPath"  : obj.channelPath,
								"channelUrl"   : obj.channelUrl,
								"templatePath" : obj.templatePath,
								"channelDesc"  : obj.channelDesc,

								callback : function(_data){

									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);
										console.log(_data);
										if (_data.code == 0){
											$state.go('channel.list');										
										}
									});
								}
							});      		
	        	}

						getList(function(list){							
							$scope.formdata = { //确认按钮
								title : '新增频道',
								list : list,
								submit : [
									/*{
										name : '保存',
										evt : 'save',
										icon_cls : 'save'
									},
									{
										name:'预览',
										evt : 'view',
										icon_cls : 'view'
									},*/
									{
										name:'提交',
										evt : 'save',
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
							$scope.$apply();
						})
	        }
	    };
	});
});