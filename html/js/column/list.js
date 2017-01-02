define(["app",'jquery','formlist','position','fixedNav','../moduls/service'], function ( app , $ ) {
	app.directive('columnList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/column/list.html',
	        controller : function($scope , pop , $uibModal , $css){
	        	$css.add('../../style/stylesheets/pop.css');
				$scope.$parent.menu.push({name:"频道管理列表"}); //栏目
				$.extend($scope,{
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
						require(['./column/editPop'], function(pop) {
	        				pop.init({
	        					obj : obj,
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
					delAll : function( ids ){ //删除
						pop.alert({
							 text:'你的ID为：'+ids
							,btn : ['确定','取消']
							,fn : function(index){//确定
								layer.close(index)
							}
						})
					},
					navEdit : { //导航操作按钮
						//nav : [selectAll],
						list : [
							{
								name : '批量删除',
								event : function(id , scope , evt){
									scope.delAll($scope.delAll);
								},
								cls :'red',
								icon_cls : 'remove'
							}
						]
					},
					filter : [ //过滤不需要展示的
						'id'
					]
				});
				

				var _data = {
				    "code":0,
				    "message":"成功",
				    "data":[
				        {
				            "categoryName":"分类名",
				            "categoryDesc":"分类说明",
				            "id":100
				        }
				    ]
				};

				var arr = [];
				$.each(_data.data,function( i , obj ){
					var li = {} , k = 0;
					$.each(obj,function( key , val ){
						if(key!='id'){
							li['name'+k] = val;
							k++;
						}else{
							li[key] = val;
						}
					})
					arr.push(li);
				});
				$scope.listdata = { //确认按钮
					title : '频道管理列表',
					table : {
						select : true,
						th : [
							{name:'分类名' , width : '200'},
							{name:'分类说明' },
							{name:'操作' , width : '100'}
						],
						td : arr ,
						edit : {
							width : 120 , 
							list : [
								{cls : 'edit' , name : '编辑',evt:$scope.edit},
								{cls : 'del' , name : '删除',evt:$scope.del},
							]
						}
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
							name : '批量删除',
							evt : function(id , scope , evt){
								scope.delAll($scope.delAll);
							},
							cls :'red',
							icon_cls : 'remove'
						}
					]
				}
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
