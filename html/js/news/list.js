define(["app",'jquery','./columnForm'
		,'../data/getData','formlist'
		,'position','fixedNav'
		,'../moduls/service','../moduls/factory',
], function ( app , $ , list , data) {
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
					add : function( id ){ //保存
						pop.alert({
							 text:'你的ID为：'+id
							,btn : ['确定','取消']
							,fn : function(index){//确定
								layer.close(index)
							}
						})
					},
					edit : function( obj ){ //保存
						require(['./common/editPop'], function(pop) {
	        				pop.init({
	        					obj : obj,
	        					list : list,
	        					$uibModal :$uibModal 
	        				});
	  					});
					},
					del : function( id ){ //删除
						pop.alert({
							 text:'你的ID为：'+id
							,btn : ['确定','取消']
							,fn : function(index){//确定
								layer.close(index)
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

				data.news.newscolumnlist(function(_data){
					var th = [
						{name:'栏目名' , width : '200'},
						{name:'频道ID' },
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
						}
						/*submit : [
							{
								name : '全选',
								evt : function(id , scope , evt){
									scope.selectAll(evt);
								},
								icon_cls : 'ok'
							},
							{
								name : '批量删除',
								evt : function(id , scope , evt){
									scope.delAll($scope.delAll);
								},
								cls :'red',
								icon_cls : 'remove'
							}
						]*/
					}
					//GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
		        	GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');
		        	$scope.$apply();
				})
	        	
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
