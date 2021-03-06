define(['require',"app",'jquery' , 'search','./searchForm','./columnForm'
		,'../data/getData','../common/editPop','formlist'
		,'position','fixedNav'
		,'../moduls/service','../moduls/factory',
], function ( require, app , $ , search , searchForm , list , getData , editPop) {
	app.directive('newscolumnList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , GenerateArrList , $uibModal, $state ){
				$scope.title = "新闻栏目列表";
				$scope.$parent.menu.push({name:$scope.title}); //栏目
				angular.extend($scope,{
					edit : function( obj ){ //保存
						var detail = null;
						function getAddForm(callback){ //填充数据
							getData.news.newscolumn({
								id : obj.id,
								callback : function(_data){
									//_data.data.writeTime = new Date(_data.data.writeTime).format('yyyy-MM-dd h:m:s');
									callback(_data);
									detail = _data;
								}
							})
						}
						obj.size = 'lg';
        				editPop.init({
        					obj : obj,
        					list : list,
        					updateData : getAddForm,
        					save : function(obj , _detail){ //保存或新增
        						var channelId =_detail.channelId  , 
        							listTemplate2Id = _detail.listTemplate2Id , 
        							detailTemplate2Id = _detail.detailTemplate2Id;
        							
								$.each(obj.selects,function(){
									if(this.title == 'channelId'){
										channelId = this.id;
									}
									if(this.title == 'listTemplate2Id'){
										listTemplate2Id = this.id;
									}
									if(this.title == 'detailTemplate2Id'){
										detailTemplate2Id = this.id;
									}
								});
								getData.news.updateNewsColumn({
									id:_detail.id,
									channelId:channelId,//频道ID
									columnName:obj.columnName,
									listId:obj.listId,//预模版list接口返回的预模版ID. 不是必须
									detailId:obj.detailId,//预模版detail接口返回的预模版ID. 不是必须
									listTemplate2Id:listTemplate2Id, //第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
									detailTemplate2Id:detailTemplate2Id,//第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
									keywords:obj.keywords, //不是必须
									description:obj.description, //不是必须
									path : obj.path,
									fileName : obj.fileName,
									publishUrl : obj.publishUrl,
									callback : function(_data){
										layui.use(['layer'], function(){
											var layer = layui.layer;
											layer.msg(_data.message);
											getDataList();
											/*setTimeout(function(){
												$state.reload()
											},300)*/
										});
									}
								});
        					},
        					callback : function( list , callback ){ //返回获取的数据 用于操作
								callback(list);
        					},
        					$uibModal :$uibModal 
        				});
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
	 						 text:'您确定要删除"'+obj.columnName+'"吗'
	 						,btn : ['确定','取消']
	 						,fn : function(){
	 							getData.news.delNewsColumn(obj);
							}
	 					})
					},
					template : function( obj ){
						require(['../common/editPopList'],function(editPopList){
							obj.size = 'sm';
							function del( obj ){
								obj.relationType = 1;
								obj.relationId = obj.channelId; //栏目
								obj.templateId = obj.id; //模版
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
			 						 text:'您确定要删除"'+obj.templateName+'"吗'
			 						,btn : ['确定','取消']
			 						,fn : function(){
			 							getData.template.delRelationByColumnList(obj);
									}
			 					})
							}
							function getList(callback){ //填充数据
								getData.template.listTemplateBycolumnId({
									columnId : obj.id,
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
											/*if (item.publish==1) {
												item.list[1].href = '/webapi/template/redirect/'+item.id;
											}*/
											if (item.publish) {
											  	if(item.publishUrl !=null) {
											   		item.list[1].href = item.publishUrl;
											   	}else {
											   		item.list[1].href = '/webapi/template/redirect/'+item.id;
											   	}
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
					},
					publish : function(obj){//发布
						obj.callback = function(_data){
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(_data.message);
								//$state.reload();
							});
						};
						pop.alert({
	 						 text:'您确认要发布当前栏目所关联的所有模版页吗？<br><label><input id="newColumnPublish" type=checkbox>是否发布所有新闻</label>'
	 						,btn : ['确定','取消']
	 						,fn : function(){
	 							var check = $('#newColumnPublish')[0].checked;

	 							if(obj.columnPublishInfo && obj.columnPublishInfo.state!=0){
	 								pop.alert({
				 						 text:obj.columnPublishInfo.message
				 						,btn : ['确定']
				 					})
	 							}else{
	 								if(check){
	 									obj.model = 'all';
	 								}else{
	 									obj.model = 'onlycolumn';
	 								}
	 								getData.news.newscolumn_publish(obj);	 								 							
	 							}
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
						{name:'ID' , key:'id' , width : '50'},
                        
						{name:'栏目名' , key:'columnName'},
						{name:'频道ID' , key:'channelId' , width : '50' },
						{name:'频道名称' , key:'channelName' },


						{name: '创建人', key: 'createUserName' , width:60},
						{name: '创建时间', key: 'createTimeStr' , width:80},
						{name: '修改人', key: 'lastModifyUserName' , width:60},
						{name: '修改时间', key: 'updateTimeStr' , width:80},
						
						{name:'操作' , width : 150 , class:'center'},
						{name:'权限' , width : 60 , class: 'center'}
					];
					$scope.listdata = { //确认按钮
						title : $scope.title,
						table : {
							select : true,
							th : th,
							td : GenerateArrList.setArr(_data.data.list,th) ,
							edit : [
								{cls : 'edit' , name : '编辑',evt:$scope.edit},
								{cls : 'edit' , name : '对应模版',evt:$scope.template},
							/*	{cls : 'edit' , name : '添加权限到组',evt:$scope.edit},*/
								{cls : 'del' , name : '删除',evt:$scope.del}
							],
							edit1 : [												
								//{cls : 'add' , name : '发布栏目相关模版',evt:$scope.release},
								{cls : 'edit' , name : '发布',evt:$scope.publish}
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
					//GenerateArrList.extendType($scope.listdata.table.td,th,['width','name','key']); //把TH 中的出name,key,width属性以外的属性合传给td

					$.each($scope.listdata.table.td, function(i, obj){

						if (obj.listUrl) {
							obj.list[1].href = obj.listUrl;
						}
						/*if (obj.publish) {
						  	if(obj.publishUrl !=null) {
						   		obj.list[1].href = obj.publishUrl;
						   	}else {
						   		obj.list[1].href = '/webapi/template/redirect/'+obj.id;
						   	}
						}*/
					})							
    				GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');
    				GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit1,'edit1');
    				$scope.$apply();
				}
				//搜索
				function search(){
					searchForm(function(data){
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
								var page = 1 , channelId;
                                $.each(obj.selects,function(){
                                    if(this.title == 'channelId'){
                                        channelId = this.id;
                                    }
                                });
								function getSearchList(){
									getData.news.newscolumn_list({
										channelId : channelId,
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
					getData.news.newscolumn_list({
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
