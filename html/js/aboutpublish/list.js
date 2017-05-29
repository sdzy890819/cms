define(['require',"app",'jquery','search','./searchForm'
	,'./addForm','../common/editPop','../data/getData','../moduls/Tool'
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , search , searchForm , list , editPop ,getData , Tool  ) {
	app.directive('publishinfoList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope,pop,$uibModal , $css , GenerateArrList, $state , $timeout){
				$scope.title = "日志列表";
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
					/*edit : function( obj ){ //保存
						obj.size = 'news';
						function getAddForm(callback , formList){ //填充数据
							getData.publishInfo.detail({
								id : obj.id,
								callback : function(_data){
									if(formList){ //如果有1条以上的字段则显示
										var maxNum , index = 2 , 
											title , name, inputMaxNum,type,
											firstArr, lastArr;
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

										var now = new Date().valueOf();

										if (new Date(obj.writeTime).valueOf() < now ) {
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
											"categoryId": categoryId, //部门分类ID
											"content":obj.html,
											"autoPublish":(obj.show=='yes'?1:0), //1 是自动发布。0是不自动发布.默认不自动发布
											"timer":obj.writeTime, //定时发布。//可不传
											"editPublishTime":obj.editPublishTime, //定时发布。//可不传
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
					},*/
					
					info : function( obj ){ //详情
						pop.alert({
	 						 text:'去相关页面，因为还没有页面所以这样提示：<br>ID为：'+obj.id
	 						,btn : ['确定','取消']
	 					})
					},
					look : function( obj ){ //详情
						require(['./showDetial'],function(editPopList){
							obj.size = 'sm';
							function getList(callback){ //填充数据
								getData.publishInfo.detail({
									id : obj.id,
									callback : function(_data){
										callback(_data);
									}
								})
							}
							editPopList.init({
	        					obj : null,
	        					list : getList,
	        					$uibModal :$uibModal 
	        				});
						});
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

				/* 每一条可以点击详情 查看详情信息。
详情信息展示所有的字段。
0. 日志：id。 1。 触发类型 triggerTypeStr 2. 触发ID：triggerId 3. 触发的模版：templateTypeStr、4. 模版ID：templateId 5. 状态：statusStr 6. 创建时间
少个时间。
可以去掉 0 */

				function setList(_data){

					var th = [	
						{name:'id' , key:'id' , width : '70'},					
						{name:'触发类型' , key:'triggerTypeStr' , width : '70'},					
						{name:'触发ID' , key:'triggerId' , width: '80', class: 'center'},
						{name:'触发的模版' , key:'templateTypeStr'},								
						{name:'模版ID' , key:'templateId' , width: '80', class: 'center'},
						{name:'创建时间' , key:'createTimeStr' , width: '80', class: 'center'},
						{name:'操作人' , key:'createUserName' , width: '80', class: 'center'},
						{name:'操作信息' , key:'message' , width: '160', class: 'center'},
						{name:'操作' , width : '40' , class: 'center'}
					];
					
			
					$scope.listdata = { //确认按钮
						title : $scope.title + "（共" + _data.data.page.count + "条数据）",
						table : {
							select : true,
							th : th,									
							td : GenerateArrList.setArr(_data.data.list, th) ,
							edit : [																
								{cls : '' , name : '查看',evt:$scope.look},
								//{cls : '' , name : ' 推荐',evt:$scope.recommend},
								//{cls : 'edit' , name : ' 预览',evt:$scope.preview}
								//{cls : 'zoom_in' , name : '预览',href:'/webapi/news/preview/'}
								// {cls : 'del' , name : '删除',evt:$scope.del}
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
      				$scope.$apply();

      				/*$timeout(function(){
      					$('.form-horizontal .table tr').each(function( i ){
      						var td = $(this).find('td:first') , 
      							obj = $scope.listdata.table.td;
      						td.click(function(){
      							require(['../common/editPopList'],function(editPopList){
									obj.size = 'sm';
									function getList(callback){ //填充数据
										getData.publishInfo.detail({
											id : obj[i].id,
											callback : function(_data){
												var th = [
					                                {name:'模板标题' , key:'templateName'},
					                                {name:'模版类型' , key:'templateClassifyStr',width:100},
					                                {name:'操作' , class:'center'}
					                            ];
					                            var listdata = { //确认按钮
					                                title : '对应模版',
					                                table : {
					                                    th : th,
					                                    td : GenerateArrList.setArr(_data.data,th) ,
					                                    edit : [
					                                        {cls : 'del' , name : '删除',evt:del}
					                                    ]
					                                },
					                            }
					                            GenerateArrList.extendChild(listdata.table.td,listdata.table.edit,'edit');
												
					                            $.each(listdata.table.td,function( i , item ){
													if (item.publish==1) {
														item.list[1].href = '/webapi/template/redirect/'+item.id;
													}
								        		});
												callback(_data , listdata);
											}
										})
									}
									editPopList.init({
			        					obj : null,
			        					list : getList,
			        					$uibModal :$uibModal 
			        				});
								})
      						})
      					})
      				},500)*/
				}

				//搜索
				function search(){
					searchForm(function(data){
						$.each(data,function( i , obj){
							if(obj.type=='select'){
								obj.callback = function( _object ){
								}
							}
						});

						$scope.getSearchList = function(page , status , obj , triggerType){
							getData.publishInfo.list({
								page:page,
								pageSize:20,
								status:status,//状态 
								triggerId:obj.lastModifyUserName,//ID 对应的新闻、专题、碎片、推荐 的ID
								triggerType:triggerType,//1|2|3|4 //新闻、专题、碎片、推荐 
								callback : function(_data){
									//分页
									$scope.page = _data.data.page;
									$scope.page.jump = function( obj ){
										if(page != obj.curr){
											page = obj.curr;
											$scope.getSearchList(page , status , obj , triggerType);
										}
									}
									$scope.searchform.search = {
										count : _data.data.page.count , 
										name : obj.condition
									}
									setList(_data);
								}
							})
						}
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
								var page = 1 , status , triggerType;
                                $.each(obj.selects,function(){
                                    if(this.title == 'statusStr'){
                                        status = this.type;
                                    }
                                    if(this.title == 'triggerTypeStr'){
                                        triggerType = this.type;
                                    }
                                });
								$scope.getSearchList(page , status , obj , triggerType);
							}
						}
					});
				}
				search();
				//end 搜索

				var page = 1;

				function getDataList(){
					$scope.isSearch = false;
					getData.publishInfo.list({
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
