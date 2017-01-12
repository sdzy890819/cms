define(["app",'jquery','require',
	'../data/getData' , './addForm',
	'formlist','position','fixedNav',
	'../moduls/service','../moduls/factory'
], function ( app , $ , require, data , list ) {
	app.directive('categoryList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList){
	        	$scope.title = '部门列表';
				$scope.$parent.menu.push({name:$scope.title}); //栏目
				angular.extend($scope,{
					edit : function( obj ){ //保存
						require(['../common/editPop'], function(pop) {
							$.each(list,function( i , obj){
								if(obj.title == 'content'){
									obj.width = '650px';
								}
							});
	        				pop.init({
	        					obj : obj,
	        					list : list,
	        					$uibModal :$uibModal 
	        				});
	  					});
					},
					del : function( id ){ //保存
						pop.alert({
	 						 text:'您确定要删除吗'+id
	 						,btn : ['确定','取消']
	 						,fn : function(){
	 							var _data = {
								    "code":0,
								    "message":"成功",
								    "data":{}
								};
								layui.use(['layer'], function(){
									var layer = layui.layer;
									layer.msg(_data.message);
								});
							}
	 					})
					},
					filter : [ //过滤不需要展示的
						'id'
					]
				});
				data.category.listCategory(function(_data){
					$scope.listdata = { //确认按钮
						title : $scope.title,
						table : {
							select : true,
							th : [
								{name:'分类名' , width : '200'},
								{name:'分类说明' },
								{name:'操作' , width : '120', class:'center'}
							],
							td : GenerateArrList.arr(_data.data,$scope.filter) ,
							edit : [
								{cls : 'edit' , name : '编辑',evt:$scope.edit},
								{cls : 'del' , name : '删除',evt:$scope.del}
							]
						}
					}
					// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
	        		GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');
	        		$scope.$apply();
				});
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
