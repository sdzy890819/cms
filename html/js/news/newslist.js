define(['require',"app",'jquery'
	,'./addForm','../common/editPop','../data/getData','../moduls/Tool'
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , list , editPop ,getData , Tool  ) {
	app.directive('newsNewslist',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope,pop,$uibModal , $css , GenerateArrList){
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
																/*var _data = {
																	data : [{
																	      "categoryId": 10001,
																	      "channelDesc": "世界频道，带你看世界",
																	      "channelName": "世界频道",
																	      "channelPath": "/data/publish/",
																	      "channelUrl": "http://120.77.220.11/publish/",
																	      "delTag": 1,
																	      "id": 10001,
																	      "lastModifyUserId": "14840345528522311094",
																	      "templatePath": "/data/template/"
																	    }]											
																	}*/
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
								setTimeout(function(){
									location.reload();
								},300)
							});
						};
						pop.alert({
	 						 text:'您确定要删除"'+obj.title+'"吗'
	 						,btn : ['确定','取消']
	 						,fn : function(){
	 							getData.news.delNews(obj);
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
						pageSize : 5,
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
								{name:'撰稿人' , key:'writeUserName' , class: 'center'},
								{name:'平台名称',key:'platformStr'},
								{name:'操作' , width : '200' , class: 'center'}
							];
							
							$scope.listdata = { //确认按钮
								title : $scope.title,
								table : {
									select : true,
									th : th,
									td : GenerateArrList.setArr(_data.data.list,th) ,
									edit : [
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
