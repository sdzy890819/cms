define(['require',"app",'jquery' , 'search','./searchForm','./columnForm'
		,'../data/getData','../common/editPop','formlist'
		,'position','fixedNav'
		,'../moduls/service','../moduls/factory',
], function ( require, app , $ , search , searchForm , list , getData , editPop) {
	app.directive('newscolumnManage',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , GenerateArrList , $uibModal, $state ){
				$scope.title = "新闻栏目删除列表";
				$scope.$parent.menu.push({name:$scope.title}); //栏目
				angular.extend($scope,{
					recovery : function( obj ){ //保存
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
	 						 text:'您确定要恢复"'+obj.columnName+'"吗'
	 						,btn : ['确定','取消']
	 						,fn : function(){
	 							getData.news.newscolumn_recover(obj);
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
						
						{name:'操作' , width : 150 , class:'center'}
					];
					$scope.listdata = { //确认按钮
						title : $scope.title,
						table : {
							select : true,
							th : th,
							td : GenerateArrList.setArr(_data.data.list,th) ,
							edit : [
								{cls : 'edit' , name : '恢复',evt:$scope.recovery}
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
					})							
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
								var page = 1 , channelId;
                                $.each(obj.selects,function(){
                                    if(this.title == 'channelId'){
                                        channelId = this.id;
                                    }
                                });
								function getSearchList(){
									getData.news.newscolumn_manage({
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
					getData.news.newscolumn_manage({
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
