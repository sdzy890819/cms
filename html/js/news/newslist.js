define(['require',"app",'jquery','search','./searchForm'
	,'./addForm','../common/editPop','../data/getData','../moduls/Tool'
	,'../upload/index'
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , search , searchForm , list , editPop ,getData , Tool,upload  ) {
	app.directive('newsList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope,pop,$uibModal , $css , GenerateArrList, $state , Upload){
				$scope.title = "新闻列表";
				$scope.$parent.menu.push({name:$scope.title}); //栏目
				var imageInfo;

				function verification( obj , callback ){ //验证字段

					if(obj.title.length>255){ //标题
						layui.use('layer', function(){
							layui.layer.msg('标题不能超过255个字符!',{icon: 2,anim:6});
						}); 
						return false;
					}
					if(obj.subTitle.length>255){
						layui.use('layer', function(){
							layui.layer.msg('附标题不能超过255个字符!',{icon: 2,anim:6});
						});
						return false;
					}
					if(obj.keyword.length>255){
						layui.use('layer', function(){
							layui.layer.msg('关键字不能超过255个字符!',{icon: 2,anim:6});
						});
						return false;
					}
					if(obj.author.length>255){
						layui.use('layer', function(){
							layui.layer.msg('来源不能超过255个字符!',{icon: 2,anim:6});
						});
						return false;
					}
					if(obj.stock.search(/[^\d]/)>-1 || obj.stock.length>6){
						layui.use('layer', function(){
							layui.layer.msg('请输入正确的股票代码!',{icon: 2,anim:6});
						});
						return false;
					}
					if(obj.description.length>500){
						layui.use('layer', function(){
							layui.layer.msg('描述不能超过500个字符!',{icon: 2,anim:6});
						});
						return false;
					}
					if(obj.html.length>65535){
						layui.use('layer', function(){
							layui.layer.msg('内容不能超过65535个字符!',{icon: 2,anim:6});
						});
						return false;
					}
					if(obj.field1.length>255){
						layui.use('layer', function(){
							layui.layer.msg('扩展字段不能小于255位数!',{icon: 2,anim:6});
						});
						return false;
					}
					if(obj.field2 && obj.field2.length>255){
						layui.use('layer', function(){
							layui.layer.msg('扩展字段不能小于255位数!',{icon: 2,anim:6});
						});
						return false;
					}
					if(obj.field3 && obj.field3.length>255){
						layui.use('layer', function(){
							layui.layer.msg('扩展字段不能小于255位数!',{icon: 2,anim:6});
						});
						return false;
					}
					if(obj.field4 && obj.field4.length>255){
						layui.use('layer', function(){
							layui.layer.msg('扩展字段不能小于255位数!',{icon: 2,anim:6});
						});
						return false;
					}
					if(obj.field5 && obj.field5.length>255){
						layui.use('layer', function(){
							layui.layer.msg('扩展字段不能小于255位数!',{icon: 2,anim:6});
						});
						return false;
					}
					return true;
				}

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
									_data.data.stock = _data.data.stockCode;
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
									if($.type(formList)=='array'){ //如果有1条以上的字段则显示
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
											if($.type(obj)=='object'){
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
											}
											if($.type(obj)=='array'){
												$.each(obj,function( j , _obj ){
													setSelect(_obj);
												})
											}else if($.type(obj)=='object'){
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
										try{
											callback(firstArr.concat(lastArr));
										}catch(e){
											console.log('firstArr:'+firstArr+' lastArr:'+lastArr)
										}
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
        					noclose : true,
        					save : function(obj , _detail ,$uibModalInstance){ //保存 新增 确认 等
        						
        						if(!verification(obj)) return;
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
									stockCode : obj.stock, //股票代码
									callback : function(_data){
										$uibModalInstance.dismiss('cancel');
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
							function getAddForm(callback,editPopScope){
								getData.news.recommendNewsInfo({
									id : obj.id,
									callback : function(_data){										
										callback(_data);
										$('.layui-upload-button').unbind().click(function(){
											upload.init({
					        					data : {
					        						obj : {},
						        					title : '上传图片',
						        					name : '请选择图片',
						        					type : 'image',
						        					event : function(file , $uibModalInstance){	        						
						        						imageInfo = file;
						        						var suffix = imageInfo.name.match(/\w+$/)[0];
														Upload.base64DataUrl(imageInfo).then(function(urls){	        						   						
								        					var image = "<img src='" + file.$ngfDataUrl + "'width='50px' class='thumb'>";        						
								        						// $('.layui-upload-button').empty().append(image);												
								        					$('.imagePre').empty().append(image);
															if( urls  ){
																getData.upload.uploadImage({
																	"baseCode":urls.split(',')[1],
																	"suffix":suffix,//"文件后缀png|jpg"
																	"watermark":0, //是否水印

																	callback : function(_data) {
																		var data = _data.data;
																		$scope.imgInfo = data;
																		editPopScope.updateData({
																			recommendImages : data.imageUrl
																		})
																	}
																})
															}
														})
						        						
						        						$uibModalInstance.dismiss('cancel');
						        					}
					        					},
					        					$uibModal :$uibModal
					        				});
										});
										
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
									var imgsrc = $scope.imgInfo?$scope.imgInfo.imageUrl:'';
									
									getData.news.recommend({
										id : newsId,
										recommendTitle : obj.recommendTitle,
										recommendDescription : obj.recommendDescription,
										recommendColumnId : recommendColumnId,
										sort : obj.sort,
										recommendImages : imgsrc,
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
				$scope.navEdit = { //导航操作按钮
					//nav : [selectAll],
					list : [
						{
							name : '批量删除',
							event : function(id , scope , evt){
								scope.delAll(function( ids ){
									pop.alert({
				 						 text:'您确定要批量删除选择的新闻吗'
				 						,btn : ['确定','取消']
				 						,fn : function(){
				 							getData.news.deletes({
				 								ids : ids,
				 								callback : function( _data ){
				 									layui.use(['layer'], function(){
						                                var layer = layui.layer;
						                                layer.msg(_data.message);
						                                                                                                
						                                if(_data.code == 0) {                                   
						                                    if($scope.isSearch){
																$scope.getSearchList();
															}else{
																getDataList();
															}
						                                }

						                            });
												}
				 							})
										}
				 					})	
								});
							},
							cls :'red',
							icon_cls : 'remove'
						},
						{
							name : '批量撤销',
							event : function(id , scope , evt){
								scope.delAll(function( ids ){
									pop.alert({
				 						 text:'您确定要批量撤销选择的新闻吗'
				 						,btn : ['确定','取消']
				 						,fn : function(){
				 							getData.news.rescinds({
				 								ids : ids,
				 								callback : function( _data ){
													layui.use(['layer'], function(){
						                                var layer = layui.layer;
						                                layer.msg(_data.message);
						                                                                                                
						                                if(_data.code == 0) {                                   
						                                    if($scope.isSearch){
																$scope.getSearchList();
															}else{
																getDataList();
															}
						                                }

						                            });
												}
				 							})
										}
				 					})	
								});
							},
							cls :'red',
							icon_cls : 'remove'
						},
						{
							name : '批量发布',
							event : function(id , scope , evt){
								scope.delAll(function( ids ){
									pop.alert({
				 						 text:'您确定要批量发布选择的新闻吗'
				 						,btn : ['确定','取消']
				 						,fn : function(){
				 							getData.news.publishes({
				 								ids : ids,
				 								callback : function( _data ){
													layui.use(['layer'], function(){
						                                var layer = layui.layer;
						                                layer.msg(_data.message);
						                                                                                                
						                                if(_data.code == 0) {                                   
						                                    if($scope.isSearch){
																$scope.getSearchList();
															}else{
																getDataList();
															}
						                                }

						                            });
												}
				 							})
										}
				 					})	
								});
							},
							cls :'red',
							icon_cls : 'remove'
						}
					]
				}

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
								{cls : '' , name : '发布',evt:$scope.publish},
								{cls : 'zoom_in' , name : '预览',href:'/webapi/news/preview/'}
							],
							permission : [
								{cls : 'del' , name : ' 撤销',evt:$scope.rescind},
								{cls : 'del' , name : '删除',evt:$scope.del},
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
						/*else if (obj.publish) {
							item.list[2].href = '/webapi/template/redirect/'+obj.id;
						}*/
						/*if (obj.publish) {
					  		if(obj.publishUrl !=null) {
						   		obj.list[2].href = obj.publishUrl
						  	}else {
						   		obj.list[2].href = obj.listUrl
						   	}
						}*/
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
