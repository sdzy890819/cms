define(['require',"app",'jquery','search','./searchForm'
	,'../data/getData' , './addForm'
	,'../common/editPop','../moduls/Tool'
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , search , searchForm  , getData , list , editPop , Tool ) {
	app.directive('topicList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList){
	        	$scope.title = "专题列表";
				$scope.$parent.menu.push({name:$scope.title}); //栏目
				angular.extend($scope,{
					add : function( id ){ //保存
						pop.alert({
							 text:'你的ID为：'+id
							,btn : ['确定','取消']
							,fn : function(index){//确定
								layer.close(index)
							}
						})
					},
					edit : function( obj ){ //保存
						function updateData(callback,formList){ //填充数据
							getData.topic.topicInfo({
								id : obj.id,
								callback : function(_data){
									_data.data.releaseTime = new Date(_data.data.releaseTime).format('yyyy-MM-dd h:m:s');
									if(formList){
										$.each(formList,function(i,obj){
											if(obj.type=='select'){//填充二级 三级栏目
												getData.channel.currentChannelList({
													categoryId : _data.categoryId,
													callback : function(_data){
														var arr = [obj.select[1][0]];
														obj.select[1] = arr;
														obj.select[1] = obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:'channelName',newName:'name'}]));
									
														$scope.$apply();
													}
												})
											}
										});
										callback(formList);
									}else{

										callback(_data);
									}
								}
							})
						}										

        				editPop.init({
        					obj : obj,
        					list : list,
        					updateData : updateData,
        					save : function(obj , _detail ){ //保存 新增 确认 等
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
								getData.topic.updateTopic({
									id : _detail.id,
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
											setTimeout(function(){
												location.reload();
											},300)
										});
									}
								});
        					},
        					callback : function( list , callback ){ //返回获取的数据 用于操作
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
								updateData(function( data){ //获取详情的数据，判断是否要新增字段，和更新二级，三级栏目 
									callback(data);
								},list)
        					},
        					$uibModal :$uibModal 
        				});
					},
					del : function( obj ){ //删除
						obj.callback = function(_data){//删除成功
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(_data.message);
								setTimeout(function(){
									location.reload();
								},300)
							});
						};
						pop.alert({
	 						 text:'您确定要删除"'+obj.topicTitle+'"吗'
	 						,btn : ['确定','取消']
	 						,fn : function(){
	 							getData.topic.delTopic(obj);
							}
	 					})
					}
				});
				function setList(_data){ //设置要显示的列表
					$.each(_data.data.list,function( i , obj){ //时间格示化
						obj.releaseTime = new Date(obj.releaseTime).format('yyyy-MM-dd h:m:s');
						if(obj.publish==1){//需要加链接 把topicUrl值 复制到 href 生成新的 href
							Tool.changeObjectName(_data.data.list,[{name:'topicUrl',newName:'href'}])
						}
					});
					var th = [
						{name:'专题标题' , key:'topicTitle' , changeObjectName : [{name:'topicUrl',newName:'href'}] , width : '200'},
						//{name:'专题内容' , key:'topicContent' },
						{name:'专题相对路径' , key:'topicPath' },
						{name:'专题文件名' , key:'topicFilename' },
						{name:'发布时间' , key:'releaseTime' },
						//{name:'关键字' , key:'keyword' },
						//{name:'描述、SEO标准' , key:'description' },
						//{name:'URL' , key:'topicUrl' },
						{name:'操作' , width : '120', class:'center'}
					];
					$scope.listdata = { //确认按钮
						title : $scope.title,
						table : {
							select : true,
							th : th,
							td : GenerateArrList.setArr(_data.data.list,th) ,
							edit : [
								{cls : 'edit' , name : '编辑',evt:$scope.edit},
								{cls : 'del' , name : '删除',evt:$scope.del}
							]
						}
					}
					// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
	        		GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');
	        		$scope.$apply();
				}
				//显示列表
				var page = 1;
				function getDataList(){
					getData.topic.listTopic({
						page : page,
						pageSize : 20,
						callback : function(_data){
							//分页
							$scope.page = _data.data.page;
							$scope.page.jump = function( obj ){
								if(page != obj.curr){
									page = obj.curr;
									getDataList();
								}
							}
							setList(_data);	
						}
					});
				};
				getDataList();
				//end 显示列表
				//搜索
				function search(){
					var searchPage = 1;
					searchForm(function(data){
						$.each(data,function( i , obj){
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
						});
						$scope.searchform = {
							list : data,
							return : function(){ //返回列表
								getDataList();
								$scope.searchform.search = null;
								page = 1;
								searchPage = 1;
								$scope.$$childHead.current = 1;
							},
							submit : function( obj , data ){
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
								function getSearchList(){
									getData.search.searchTopic({
										"condition":obj.condition,
										"topicClassifyId":topicClassifyId,//专题分类ID
										"categoryId":categoryId,//部门分类ID
										"channelId":channelId,//频道ID
										"topicColumnId":topicColumnId,//系列专题类型ID
										"releaseTime":obj.releaseTime, //发布时间,
										"startTime":obj.startTime,//创建时间
										"endTime":obj.endTime,//创建时间
										page : searchPage,
										pageSize : 20,
										callback : function(_data){
											//分页
											$scope.page = _data.data.page;
											$scope.page.jump = function( obj ){
												if(searchPage != obj.curr){
													searchPage = obj.curr;
													getSearchList();
												}
											}
											$scope.searchform.search = {
												count : _data.data.page.count , 
												name : obj.condition
											}
											setList(_data);
										}
									})
								};
								getSearchList();
							}
						}
						$scope.$apply();
					});
				}
				search();
				//end 搜索
				
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
