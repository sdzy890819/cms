define(['require',"app",'jquery'
	,'./addForm','../common/editPop','../data/getData','../moduls/Tool'
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , list , editPop ,getData , Tool  ) {
	app.directive('newsList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope,pop,$uibModal , $css , GenerateArrList, $state){
				$scope.title = "新闻列表";
				$scope.$parent.menu.push({name:$scope.title}); //栏目
				angular.extend($scope,{
					edit : function( obj ){ //保存
						function getAddForm(callback){ //填充数据
							getData.news.newsdetail({
								id : obj.id,
								callback : function(_data){
									_data.data.writeTime = new Date(_data.data.writeTime).format('yyyy-MM-dd h:m:s');
									callback(_data);
								}
							})
						}													

        				editPop.init({
        					obj : obj,
        					list : list,
        					updateData : getAddForm,
        					save : function(obj , _detail ){ //保存 新增 确认 等
        						var channelId = _detail.channelId , 
        							columnId = _detail.columnId , 
        							categoryId = _detail.categoryId;
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

								getData.news.updateNews({
									"id":_detail.id,
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
									"timer":obj.writeTime, //定时发布。//可不传
									"field1":obj.field1,
									"field2":obj.field2,
									"field3":obj.field3,
									"field4":obj.field4,
									"field5":obj.field5,
									callback : function(_data){
										layui.use(['layer'], function(){
											var layer = layui.layer;
											layer.msg(_data.message);
											setTimeout(function(){
												location.reload();
											},300);
										});
									}
								});
        					},
        					callback : function( list , callback ){ //返回获取的数据 用于操作
								$.each(list,function( i , obj){
									if(obj.title == 'content'){
										obj.width = '650px';
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
								callback(list);
        					},
        					$uibModal :$uibModal 
        				});
					},

					recommend : function (obj) {
						var newsId = obj.id;
						require(['./recommendForm'], function(recommendFormList){
							function getAddForm(callback){
								getData.news.recommendNewsInfo({
									id : obj.id,
									callback : function(_data){										
										callback(_data);
									}
								})
							}
							editPop.init({
								obj : obj,
								$uibModal : $uibModal,
								list : recommendFormList,
								updateData : getAddForm,

								save : function(obj){		

									var 	recommendColumnId;									
									$.each(obj.selects,function(){										
										if(this.title == 'recommendColumnId'){
											recommendColumnId = this.id;
										}										
									})

									if(recommendColumnId == undefined) {											
										alert('请选择推荐栏目');
										return;
									}							
									
									getData.news.recommend({
										id : newsId,
										recommendTitle : obj.recommendTitle,
										recommendDescription : obj.recommendDescription,
										recommendImages : obj.recommendImages,
										recommendColumnId : recommendColumnId,
										sort : obj.sort,

										callback : function(_data){
											layui.use(['layer'], function(){
												var layer = layui.layer;
												layer.msg(_data.message);
												setTimeout(function(){
													location.reload();
												},300);
											});											
										}
									})						
								},

								callback : function(list, callback){									
									callback(list);
								}

							})
						})
					},

					info : function( obj ){ //详情
						pop.alert({
	 						 text:'去相关页面，因为还没有页面所以这样提示：<br>ID为：'+obj.id
	 						,btn : ['确定','取消']
	 					})
					},
					del : function( obj ){ //保存
						obj.callback = function(_data){//删除成功
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(_data.message);
																								
								if(_data.code == 0) {									
									$('table').find("tr[data-id=" + obj.id + "]").hide();
								}

							});
						};
						pop.alert({
	 						 text:'您确定要删除"'+obj.title+'"吗'
	 						,btn : ['确定','取消']
	 						,fn : function(){
	 							getData.news.delNews(obj);
							}
	 					})
					},

					publish : function(obj){
						obj.callback = function(_data){//删除成功
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(_data.message);
								$state.reload();
							});
						};
						pop.alert({
	 						 text:'您确定要删除"'+obj.title+'"吗'
	 						,btn : ['确定','取消']
	 						,fn : function(){
	 							getData.news.publish(obj);
							}
	 					})						
					}
				});
				/*$scope.navEdit = { //导航操作按钮
					//nav : [selectAll],
					list : [
						{
							name : '批量删除',
							event : function(id , scope , evt){
								scope.delAll(function( ids ){
									console.log(ids)
								});
							},
							cls :'red',
							icon_cls : 'remove'
						}
					]
				}*/


				var page = 1;

				function getDataList(){					

					getData.news.newslist({
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
							
							//end 分页

							var th = [
								{name:'标题' , key:'title' , width : '200'},
								{name:'来源' , key:'source', width : '100' , class: 'center'},
								{name:'作者' , key:'author' , class: 'center'},
								{name:'状态' , key:'publishStr' , class: 'center'},
								{name:'平台名称',key:'platformStr'},
								{name:'发布时间' , key:'buildTimeStr' , class: 'center'},
								{name:'更新时间' , key:'updateTimeStr' , class: 'center'},
								{name:'操作' , width : '300' , class: 'center'}
							];
							
					
							$scope.listdata = { //确认按钮
								title : $scope.title,
								table : {
									select : true,
									th : th,									
									td : GenerateArrList.setArr(_data.data.list, th) ,
									edit : [
										{cls : 'edit' , name : ' 推荐',evt:$scope.recommend},
										{cls : 'edit' , name : '发布',evt:$scope.publish},
										{cls : 'edit' , name : '编辑',evt:$scope.edit},
										{cls : 'del' , name : '删除',evt:$scope.del},
										{cls : '' , name : '详情',evt:$scope.info},
									]

								},
								/*submit : [
									selectAll,
									{
										name : '批量删除',
										evt : function(id , scope , evt){
											scope.delAll(function( ids ){
												console.log(ids)
											});
										},
										cls :'red',
										icon_cls : 'remove'
									}
								]*/
							}


							GenerateArrList.extendType($scope.listdata.table.td,th,['width','name','key']); //把TH 中的出name,key,width属性以外的属性合传给td
							
			        		GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');			        		
			        		$scope.$apply();			        		
						}
					});
				};
				getDataList();
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
