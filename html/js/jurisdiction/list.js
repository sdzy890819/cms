define(['require',"app",'jquery'
	,'../data/getData' , './addForm',
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , data , list) {
	app.directive('jurisdictionList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList){
	        	$scope.title = "权限列表";
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
						require(['../common/editPop'], function(pop) {
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
					},
					permission : function(id){
						pop.alert({
							 text:'你的ID为：'+id
							,btn : ['确定','取消']
							,fn : function(index){//确定
								layer.close(index)
							}
						})
					},
					filter : [ //过滤不需要展示的
						{id:'parentId'},'parentId','type','showFlag'
					]
				});
				
				data.permission.listPermission(function(_data){
					$scope.listdata = { //确认按钮
						title : $scope.title,
						table : {
							select : true,
							th : [
								{name:'名称' , width : '200'},
								{name:'说明' },
								{name:'url' },
								{name:'sort' , class:'center'},
								{name:'permission' , class:'center'},
								{name:'操作' , width : '200' , class:'center'}
							],
							td : GenerateArrList.arr(_data.data.permissions,$scope.filter) ,
							edit : [
								{cls : 'edit' , name : '设置权限',evt:$scope.permission},
								{cls : 'edit' , name : '编辑',evt:$scope.edit},
								{cls : 'del' , name : '删除',evt:$scope.del}
							]
						},
						submit : [
							{
								name : '全选',
								evt : function(id , scope , evt){
									scope.selectAll(evt);
								},
								icon_cls : 'ok'
							},
							{
								name : '设置权限',
								evt : function(id , scope , evt){
									scope.delAll(function( ids ){
										$scope.permission(ids)
									});
								},
								icon_cls : 'edit'
							}
						]
					}
					GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
	        		GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');
	        		$scope.$apply();
				});
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
