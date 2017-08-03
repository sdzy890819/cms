define(['require',"app",'jquery','search','./recommendlistForm'
	,'./recommendForm','../common/editPop','../data/getData','../moduls/Tool'
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , search , searchForm , list , editPop ,getData , Tool  ) {
	app.directive('newsRecommendList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope,pop,$uibModal , $css , GenerateArrList, $state){
				$scope.title = "推荐新闻列表";
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
						var newsId = obj.id;
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
							list : list,
							updateData : getAddForm,

							save : function(obj , _detail){		

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
											if(_data.code == 0) {									
												$scope.getNewList();
											}
											// setTimeout(function(){
											// 	location.reload();
											// },300);
										});											
									}
								})						
							},

							callback : function(list, callback){
								callback(list)
							}

						})
					},
					del : function( obj ){ //取消
						obj.callback = function(_data){//删除成功
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(_data.message);
																								
								if(_data.code == 0) {									
									$scope.getNewList();
								}

							});
						};
						pop.alert({
	 						 text:'您确定要取消推荐吗"'+obj.title+'"吗'
	 						,btn : ['确定','取消']
	 						,fn : function(){
	 							getData.news.deleteRecommend(obj);
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
						{name:'推荐名' , key:'title'},					
						{name:'推荐人' , key:'recommendUserName'},								
						{name:'推荐栏目' , key:'recommendColumnName'},
						{name:'操作' , width : '220' , class: 'center'}
					];
					$scope.listdata = { //确认按钮
						title : $scope.title + "（共" + _data.data.page.count + "条数据）",
						table : {
							select : true,
							th : th,									
							td : GenerateArrList.setArr(_data.data.list, th) ,
							edit : [																
								{cls : 'edit' , name : '修改推荐',evt:$scope.edit},
								{cls : 'del' , name : '取消推荐',evt:$scope.del},
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
						if (obj.url) {
							obj.list[0].href = obj.url;
						}
					})

					GenerateArrList.extendType($scope.listdata.table.td,th,['width','name','key']); //把TH 中的出name,key,width属性以外的属性合传给td							
      				GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');			   		        		
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
								var page = 1 , recommendColumnId;
                                $.each(obj.selects,function(){
                                    if(this.title == 'recommendColumnId'){
                                        recommendColumnId = this.id;
                                    }
                                });
								function getSearchList(){
									getData.news.recommendList({
										recommendColumnId : recommendColumnId,
										page : page,
										pageSize : 20,
										callback : function(_data){
											_data.data.list = _data.data.list || [];
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
					},{st:"sortByColumnName"});
				}
				search();
				//end 搜索

				var page = 1;

				function getDataList(){
					$scope.isSearch = false;
					getData.news.recommendList({
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
