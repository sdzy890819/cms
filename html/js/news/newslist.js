define(['require',"app",'jquery','search','./searchForm'
	,'./addForm','../common/editPop','../data/getData','../moduls/Tool'
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , search , searchForm , list , editPop ,getData , Tool  ) {
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
					isSearch : false, //是否是执行搜索
					getNewList : function(){
						if($scope.isSearch){
							$scope.getSearchList();
						}else{
							getDataList();
						}
					},
					edit : function( obj ){ //保存
						obj.size = 'news';
						function getAddForm(callback , formList){ //填充数据
							getData.news.newsdetail({
								id : obj.id,
								callback : function(_data){
									if (_data.data.timer) {
										_data.data.writeTime = new Date(_data.data.timer).format('yyyy-MM-dd h:m:s');										
									}else {
										_data.data.writeTime = '';
									}

									if (_data.data.editPublishTime) {
										_data.data.editPublishTime = new Date(_data.data.editPublishTime).format('yyyy-MM-dd h:m:s');
									}
									if (_data.data.timer) {
										_data.data.timer = new Date(_data.data.timer).format('yyyy-MM-dd h:m:s');
									}
									if(formList){ //如果有1条以上的字段则显示
										var maxNum , index = 2 , 
											title , name, inputMaxNum,type,
											firstArr, lastArr;

										function setSelect(obj){ //推送处理
											if(obj.type=='selectSize' && _data.data.columnIds && _data.data.columnIds.length){
												obj.toSelect = Tool.changeObjectName(_data.data.columnIds,[{name:'val',newName:'id'},{name:'title',newName:'name'}]);
												var arrs = obj.toSelect.slice(0) , 
												b = true,
												oldarr = [];
												if(arrs.length){
													$.each(obj.fromSelect , function( i , _obj ){
														b = true;
														for( var j=0;j<arrs.length;j++){
															if(arrs[j].id == _obj.id ){
																b = false;
																break;
															}
														}
														if(b==true){
															oldarr.push(_obj);
														}
													});
													obj.fromSelect = oldarr;
												}
											}
										}
										$.each(formList,function(i,obj){
											if(obj.title=='field1'){ //填充多个字段
												title = obj.title.replace(obj.title.match(/\d+$/)[0],'');
												name = obj.name.match(/\d+$/);
												if(name){
													name = obj.name.replace(name[0],'');
												}else{
													name = obj.name;
												}
												inputMaxNum = obj.inputMaxNum;
												type = obj.type;
												firstArr = formList.slice(0,i+1) 
												lastArr = formList.slice(i+1) 
												maxNum = obj.inputMaxNum+1;
											}else if(obj.type=='select'){//填充二级 三级栏目
												getData.channel.currentChannelList({
													categoryId : _data.data.categoryId,
													callback : function(_data){
														var arr = [obj.select[1][0]];
														obj.select[1] = arr;
														obj.select[1] = obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:'channelName',newName:'name'}]));
														
														$scope.$apply();																
													}
												})

												getData.news.newscolumnlist({
													channelId : _data.data.channelId,
													callback : function(_data){
														var arr = [obj.select[2][0]];
														obj.select[2] = arr;
														obj.select[2] = obj.select[2].concat(Tool.changeObjectName(_data.data,[{name:'columnName',newName:'name'}]));
														$scope.$apply();																
													}
												})
											}


											if($.type(obj)=='array'){
												$.each(obj,function( j , _obj ){
													setSelect(_obj);
												})
											}else{
												setSelect(obj);
											}
										});
										for(;index<maxNum;index++){
											var value = _data.data['field'+index];
											if(value){
												firstArr.push({
													title : title+index,
													name : name+index,
													placeholder : '请输入扩展字段内容',
													num : index, //当前为第1条
													inputMaxNum : inputMaxNum,
													type : type
												})
											}
										}
										callback(firstArr.concat(lastArr));
									}else{
										callback(_data);
									}

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
        							categoryId = _detail.categoryId ,
        							columnIds = '[';

        						if(obj.selectSizeChoose){
					        		obj.selectSizeChoose = Tool.changeObjectName(obj.selectSizeChoose,[{name:'id',newName:'val'},{name:'name',newName:'title'}]);
					        		
					        		$.each(obj.selectSizeChoose,function( i , obj ){
					        			columnIds += "{\"title\":\""+obj.title+"\",\"val\":\""+obj.val+"\"},";
					        		});
					        		columnIds = columnIds.substr(0,columnIds.length-1);
					        		columnIds += ']';
				        		}else{
				        			if(_detail.columnIds){
					        			$.each(_detail.columnIds,function( i , obj ){
						        			columnIds += "{\"title\":\""+obj.title+"\",\"val\":\""+obj.val+"\"},";
						        		});
						        		columnIds = columnIds.substr(0,columnIds.length-1);
						        		columnIds += ']';
					        		}else{
				        				columnIds = null;
					        		}
				        		}
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

								if (new Date(obj.timer).valueOf() < now ) {
									alert("发布时间必须大于当前时间");
									return;
								}
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
									"columnIds":columnIds,
									"categoryId": categoryId, //部门分类ID
									"content":obj.html,
									"autoPublish":(obj.show=='yes'?1:0), //1 是自动发布。0是不自动发布.默认不自动发布
									"timer":obj.timer, //定时发布。//可不传
									"editPublishTime":obj.editPublishTime, //发布时间
									"field1":obj.field1,
									"field2":obj.field2,
									"field3":obj.field3,
									"field4":obj.field4,
									"field5":obj.field5,
									callback : function(_data){
										layui.use(['layer'], function(){
											var layer = layui.layer;
											layer.msg(_data.message);
											$scope.getNewList();
											 /*setTimeout(function(){
											 	$state.reload();
											 },300);*/
										});
									}
								});
        					},
        					callback : function( list , callback ){ //返回获取的数据 用于操作  				
								$.each(list,function( i , obj){
									if(obj.title == 'content'){
										obj.width = '1000px';
									}
									if(obj.type=='select'){
										obj.callback = function( _object ){

											if(_object.obj.name.indexOf('请选择')>-1){
												return;
											}
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
								getAddForm(function( data){ //获取详情的数据，判断是否要新增字段，和更新二级，三级栏目 
									callback(data);
								},list)
        					},
        					$uibModal :$uibModal 
        				});
					},
					rescind : function(obj){ //撤销
                        obj.callback = function(_data){//撤销除成功
                            layui.use(['layer'], function(){
                                var layer = layui.layer;
                                layer.msg(_data.message);
                                                                                                
                                if(_data.code == 0) {                                   
                                    $('table').find("tr[data-id=" + obj.id + "]").hide();
                                    $scope.getNewList();
                                }

                            });
                        };
                        pop.alert({
                             text:'您确定要撤销"'+obj.title+'"吗'
                            ,btn : ['确定','取消']
                            ,fn : function(){
                                getData.news.rescind(obj);
                            }
                        })
                    },
                    recover : function(obj){ //恢复
                        obj.callback = function(_data){//恢复成功
                            layui.use(['layer'], function(){
                                var layer = layui.layer;
                                layer.msg(_data.message);
                                                                                                
                                if(_data.code == 0) {                                   
                                    $('table').find("tr[data-id=" + obj.id + "]").hide();
                                }

                            });
                        };
                        pop.alert({
                             text:'您确定要恢复"'+obj.title+'"吗'
                            ,btn : ['确定','取消']
                            ,fn : function(){
                                getData.news.recover(obj);
                            }
                        })
                    },
                    preview : function(obj){ //预览
                        getData.news.preview(obj);
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

								save : function(obj,_detail){		
									var recommendColumnId = _detail.recommendColumnId;									
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
												// setTimeout(function(){
												// 	location.reload();
												// },300);
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
								//$state.reload();
							});
						};
						pop.alert({
	 						 text:'您确定要发布"'+obj.title+'"吗'
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

				function setList(_data){

					var th = [
						{name:'文章ID' , key:'id' , width : '50'},		
						{name:'所属栏目' , key:'channelAndColumnName' , width : '70'},					
						{name:'标题' , key:'title'},								
						{name:'作者' , key:'author' , width: '40', class: 'center'},
						{name:'发布人' , key:'buildUserName' , width: '55', class: 'center'},
						{name:'修改人' , key:'lastModifyUserName' , width: '55', class: 'center'},
						{name:'媒体来源' , key:'source' , width: '80', class: 'center'},
												
						{name:'发布时间' , key:'buildTimeStr' , width : '80', class: 'center'},
						{name:'修改时间' , key:'updateTimeStr' , width : '80', class: 'center'},
						{name:'状态' , key:'publishStr' , width: '50', class: 'center'},
						{name:'操作' , width : '40' , class: 'center'},
						{name:'预览' , width : '50' , class: 'center'},
						{name:'权限' , width : '40' , class: 'center'}
					];
					
					$.each(_data.data.list, function(i, obj){
						obj.channelAndColumnName = [obj.channelName, obj.columnName].join('-');
						if(Tool.getByteLen(obj.author)>6){
							obj.author = Tool.getByteVal(obj.author,6)
						}
					})
			
					$scope.listdata = { //确认按钮
						title : $scope.title + "（共" + _data.data.page.count + "条数据）",
						table : {
							select : true,
							th : th,									
							td : GenerateArrList.setArr(_data.data.list, th) ,
							edit : [																
								{cls : '' , name : '编辑',evt:$scope.edit},
								{cls : '' , name : ' 推荐',evt:$scope.recommend}
							],
							edit1 : [												
								{cls : 'zoom_in' , name : '预览',href:'/webapi/news/preview/'}
							],
							permission : [
								{cls : 'del' , name : ' 撤销',evt:$scope.rescind},
								{cls : 'del' , name : '删除',evt:$scope.del}
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
					$.each($scope.listdata.table.td, function(i, obj){
						if (obj.publish) {
							obj.list[2].href = obj.url;
						}
					})

					GenerateArrList.extendType($scope.listdata.table.td,th,['width','name','key']); //把TH 中的出name,key,width属性以外的属性合传给td							
      				GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');			        		
      				GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit1,'edit1');			        		
      				GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.permission,'permission');
      				$scope.$apply();						
				}

				//搜索
				function search(){
					searchForm(function(data){
						$.each(data,function( i , obj){
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
						$scope.searchform = {
							list : data,
							return : function(){ //返回列表
								$scope.searchform.search = null;
								page = 1;
								searchPage = 1;
								$scope.$$childHead.current = 1;
								getDataList();
							},							
							submit : function( obj , data ){
								$scope.isSearch = true;
								var page = 1 , channelId , columnId , categoryId , publish;
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
                                    if(this.title == 'publish'){
                                        publish = this.id;
                                    }
                                });
								function getSearchList(){
									getData.search.searchNew({
										"newsId" : obj.newsId,
										"buildUserName" : obj.buildUserName,
										"lastModifyUserName" : obj.lastModifyUserName,
										"condition":obj.condition,
										"author":obj.author,
										"source":obj.source,
										"categoryId":categoryId,//部门分类ID
										"channelId":channelId,//频道ID
										"columnId":columnId,//栏目ID
										"platform":obj.platform, //平台,
										"startTime":obj.startTime,//创建时间
										"endTime":obj.endTime,//创建时间
										publish : publish,
										delTag : 1,
										page : page,
										pageSize : 20,
										callback : function(_data){
											//分页
											$scope.page = _data.data.page;
											$scope.page.jump = function( obj ){
												if(page != obj.curr){
													page = obj.curr;
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
								$scope.getSearchList = getSearchList;
							}
						}

						setTimeout(function(){
							var input = $('.layui-form input[name="condition"');
							$("<br>").insertBefore(input.parent().parent());
						},300)
					});
				}
				search();
				//end 搜索

				var page = 1;

				function getDataList(){					
					$scope.isSearch = false;
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
							setList(_data);	
		        		
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
