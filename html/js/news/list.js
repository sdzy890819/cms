define(["app",'jquery','./columnForm'
		,'../data/getData','../common/editPop','formlist'
		,'position','fixedNav'
		,'../moduls/service','../moduls/factory',
], function ( app , $ , list , getData , editPop) {
	app.directive('newsList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , GenerateArrList , $uibModal ){
				$scope.title = "新闻栏目列表";
				$scope.$parent.menu.push({name:$scope.title}); //栏目
				angular.extend($scope,{
					edit : function( obj ){ //保存
						function getAddForm(callback){ //填充数据
							getData.news.newscolumn({
								id : obj.id,
								callback : function(_data){
									//_data.data.writeTime = new Date(_data.data.writeTime).format('yyyy-MM-dd h:m:s');
									callback(_data);
								}
							})
						}
        				editPop.init({
        					obj : obj,
        					list : list,
        					updateData : getAddForm,
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
								setTimeout(function(){
									location.reload()
								},300)
							});
						};
						pop.alert({
	 						 text:'您确定要删除"'+obj.columnName+'"吗'
	 						,btn : ['确定','取消']
	 						,fn : function(){
	 							getData.news.delNewsColumn(obj);
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
					getData.news.newscolumn_list({
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
								{name:'栏目名' , key:'columnName' , width : '200'},
								{name:'频道ID' , key:'channelId' },
								{name:'操作' , width : '200' , class:'center'}
							];
							$scope.listdata = { //确认按钮
								title : $scope.title,
								table : {
									select : true,
									th : th,
									td : GenerateArrList.setArr(_data.data.list,th) ,
									edit : [
										{cls : 'edit' , name : '编辑',evt:$scope.edit},
									/*	{cls : 'edit' , name : '添加权限到组',evt:$scope.edit},*/
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
							//GenerateArrList.extendType($scope.listdata.table.td,th,['width','name','key']); //把TH 中的出name,key,width属性以外的属性合传给td
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
