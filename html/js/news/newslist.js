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
					edit : function( obj ){ //保存
						function getAddForm(callback , formList){ //填充数据
							getData.news.newsdetail({
								id : obj.id,
								callback : function(_data){
									if (_data.data.timer) {
										_data.data.writeTime = new Date(_data.data.timer).format('yyyy-MM-dd h:m:s');
									}else {
										_data.data.writeTime = '';
									}
									if(formList){ //发果有1条以上的字段则显示
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
													 	$state.reload();
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
						{name:'所属频道栏目' , key:'channelAndColumnName' , width : '200'},					
						{name:'标题' , key:'title' , width : '200'},								
						{name:'作者' , key:'author' , width: '100', class: 'center'},
						{name:'发布人' , key:'buildUserName' , width: '100', class: 'center'},
						{name:'修改人' , key:'lastModifyUserName' , width: '100', class: 'center'},
						{name:'媒体来源' , key:'source' , width: '100', class: 'center'},
												
						{name:'发布时间' , key:'buildTimeStr' , width : '200', class: 'center'},
						{name:'修改时间' , key:'updateTimeStr' , width : '200', class: 'center'},
						{name:'状态' , key:'publishStr' , width: '100', class: 'center'},
						{name:'操作' , width : '200' , class: 'center'},
						{name:'权限' , width : '100' , class: 'center'}
					];
					
					$.each(_data.data.list, function(i, obj){
						obj.channelAndColumnName = [obj.channelName, obj.columnName].join('-');
					})
			
					$scope.listdata = { //确认按钮
						title : $scope.title + "（共" + _data.data.page.count + "条数据）",
						table : {
							select : true,
							th : th,									
							td : GenerateArrList.setArr(_data.data.list, th) ,
							edit : [																
								{cls : 'edit' , name : '编辑',evt:$scope.edit},
								{cls : 'edit' , name : ' 推荐',evt:$scope.recommend}
								// {cls : 'del' , name : '删除',evt:$scope.del}
							],

							permission : [
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
								getDataList();
								$scope.searchform.search = null;
								page = 1;
								searchPage = 1;
								$scope.$$childHead.current = 1;
							},							
							submit : function( obj , data ){
								var page = 1 , channelId , columnId , categoryId;
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
							}
						}
					});
				}
				search();
				//end 搜索

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
