define(["app",'./addForm','../data/getData','../moduls/Tool','form','position','fixedNav'], function ( app , getList , getData , Tool ) {
	app.directive('templateAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope){
	        	$scope.title = '新增模版';
	        	$scope.$parent.menu.push({name:$scope.title});
	        	$scope.rlease = function( obj ){ //发布
					var templateClassify  , channelId;
					console.log(obj.selects);
					$.each(obj.selects,function(){
						if(this.title == 'templateClassify'){
							templateClassify = this.type;
						}

						if(this.title == 'channelId'){
							channelId = this.id;
						}
					});
					getData.template.createTemplate({
						"templateName":obj.templateName,
						"templateDesc":obj.templateDesc,
						"filename":obj.filename,
						"path":obj.path,
						"templateClassify":templateClassify,
						"job":(obj.job=='定时生成'?1:0), //是否定时生成。1是定时生成。0是触发生成
						"encoded":obj.encoded,
						"channelId":channelId,//频道ID
						"sortNum":obj.sortNum,//排序值
						callback : function(_data){
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(_data.message);
							});
						}
					});
				}

				getList(function(list){
					$scope.data = {
						sortNum : 1000 //排序默认为 1000
					}
					//debugger;
					$scope.formdata = { //确认按钮
						title : $scope.title,
						list : list,
						submit : [
							{
								name:'确认发布',
								evt : 'rlease',
								icon_cls : 'ok'
							},
							{
								name:'清空',
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