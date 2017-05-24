define(["app",'./addForm','../data/getData','../moduls/Tool','form','position','fixedNav'], function ( app , getList , getData , Tool ) {
	app.directive('newsAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope, $state){
	        	$scope.$parent.menu.push({name:"新增新闻"});
	        	var categoryId,channelId,columnId;
	        	function addNews( obj ){
					$.each(obj.selects,function(){
						if(this.title == 'channelId'){
							channelId = this.id;
						}
						if(this.title == 'columnId'){
							columnId = this.id;
						}
						if(this.title == 'categoryId'){
							categoryId = this.id;
						}
					})

					var now = new Date().valueOf();

					if (new Date(obj.writeTime).valueOf() < now ) {
						alert("发布时间必须大于当前时间");
						return;
					}
					getData.news.createNews({
						"title":obj.title,
						"subTitle":obj.subTitle,
						"keyword":obj.keyword,
						"description":obj.description,
						"source":obj.source,
						"author":obj.author,
						"channelId":channelId,//频道ID
						"columnId":columnId,//栏目ID
						"categoryId": categoryId, //部门分类ID
						"content":obj.html,
						"autoPublish":(obj.show=='yes'?1:0), //1 是自动发布。0是不自动发布.默认不自动发布
						"editPublishTime":obj.editPublishTime, //发布时间。//可不传
						"timer":obj.writeTime, //定时发布。//可不传
						"field1":obj.field1,
						"field2":obj.field2,
						"field3":obj.field3,
						"field4":obj.field4,
						"field5":obj.field5,
						publish : obj.publish,
						callback : function(_data){
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(_data.message);

								if(_data.code == 0) {
									$state.reload();
								}
							});
						}
					});
	        	}
	        	angular.extend($scope,{
					rlease : function( obj ){ //发布
						if(obj.html.length<10){
							layui.use('layer', function(){
								layui.layer.msg('内容不能小于10位数!',{icon: 2,anim:6});
							}); 
							return;
						}
						obj.publish = 0;
						addNews(obj);
					},
					draft : function( obj ){ //保存草稿
						obj.publish = 2;
						addNews(obj);
					}
	        	});
				
				// $scope.edit = { //导航操作按钮
				// 	nav : [{
				// 		name : '保存',
				// 		evt : $scope.save,
				// 		cls : 'save'
				// 	}],
				// 	list : [
				// 		{
				// 			name:'发布',
				// 			evt : $scope.rlease,
				// 			cls : 'add'
				// 		}
				// 	]
				// }

				getList(function(list){
					$.each(list,function( i , obj){
						if(obj.title == 'content'){
							obj.width = '1100px';
						}
						if(obj.type=='select'){
							getData.news.previousColumn({ //默认显示 1级2级3级栏目
								callback : function( data ){
									categoryId = data.data.categoryId;
									channelId = data.data.channelId;
									columnId = data.data.columnId;
									getData.channel.currentChannelList({
										categoryId : categoryId,
										callback : function(_data){
											var arr = [obj.select[1][0]];
											obj.select[1] = arr;
											obj.select[1] = obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:'channelName',newName:'name'}]));
						
											$scope.$apply();
										}
									});
									getData.news.newscolumnlist({
										channelId : channelId,
										callback : function(_data){
											var arr = [obj.select[2][0]];
											obj.select[2] = arr;
											obj.select[2] = obj.select[2].concat(Tool.changeObjectName(_data.data,[{name:'columnName',newName:'name'}]));
											$scope.$apply();
										}
									});
									$scope.data = { //默认显示 1级2级3级栏目
										categoryId : categoryId , 
										channelId : channelId , 
										columnId : columnId , 
										source : data.data.source || '',
									}
									$scope.$apply();
								}
							});

							obj.callback = function( _object ){
								/*if(_object.obj.name.indexOf('请选择')>-1){
									return;
								}*/
								if(_object.title == 'categoryId'){
									getData.channel.currentChannelList({
										categoryId : _object.obj.id,
										callback : function(_data){
											var arr = [obj.select[1][0]];
											obj.select[1] = arr;
											obj.select[1] = obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:'channelName',newName:'name'}]));
											
											obj.select[2] = [obj.select[2][0]]; //第三个select清空

											$scope.$apply();
											_object.callback();
										}
									})
								}else if(_object.title == 'channelId'){
									getData.news.newscolumnlist({
										channelId : _object.obj.id,
										callback : function(_data){
											var arr = [obj.select[2][0]];
											obj.select[2] = arr;
											obj.select[2] = obj.select[2].concat(Tool.changeObjectName(_data.data,[{name:'columnName',newName:'name'}]));
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
							/*{
								name : '保存',
								evt : 'save',
								icon_cls : 'save'
							},*/
							{
								name:'提交',
								evt : 'rlease',
								icon_cls : 'ok'
							},
							{
								name:'保存草稿',
								evt : 'draft',
								icon_cls : 'view'
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