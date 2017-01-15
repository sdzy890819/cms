define(["app",'./addForm','../data/getData','../moduls/Tool','form','position','fixedNav'], function ( app , getList , getData , Tool ) {
	app.directive('topicAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope){
	        	$scope.title = "新增专题";
	        	$scope.$parent.menu.push({name:$scope.title})
				$scope.rlease = function( obj ){ //发布
					var channelId , topicColumnId , categoryId , topicClassifyId;
					$.each(obj.selects,function(){
						if(this.title == 'channelId'){
							channelId = this.id;
						}
						if(this.title == 'topicColumnId'){
							topicColumnId = this.id;
						}
						if(this.title == 'categoryId'){
							categoryId = this.id;
						}
						if(this.title == 'topicClassifyId'){
							topicClassifyId = this.id;
						}
					});
					getData.topic.createTopic({
						"topicTitle":obj.topicTitle,
						"topicContent":obj.topicContent,
						"topicPath":obj.topicPath,
						"topicFilename":obj.topicFilename,
						"topicClassifyId":topicClassifyId,//专题分类ID
						"categoryId":categoryId,//部门类别ID
						"channelId":channelId, //频道ID
						"releaseTime":obj.releaseTime, //发布时间
						"keyword":obj.keyword,
						"description":obj.description,
						"topicColumnId":topicColumnId, //专题栏目ID(做系列专题使用)
						callback : function(_data){
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(_data.message);
							});
						}
					});
				}

				getList(function(list){
					$.each(list,function( i , obj){
						if(obj.title == 'content'){
							obj.width = '800px';
						}
						if(obj.type=='select'){
							obj.callback = function( _object ){
								if(_object.title == 'categoryId'){
									getData.channel.currentChannelList({
										categoryId : _object.obj.id,
										callback : function(_data){
											var arr = [obj.select[1][0]];
											obj.select[1] = arr;
											obj.select[1] = obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:'channelName',newName:'name'}]));
						
											$scope.$apply();
											_object.callback();
										}
									})
								}
							}
						}
					});
					//debugger;
					$scope.formdata = { //确认按钮
						title : '新增新闻',
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