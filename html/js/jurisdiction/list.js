define(["app",'jquery','formlist','position','fixedNav','../moduls/service','../moduls/factory'], function ( app , $ ) {
	app.directive('jurisdictionList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList){
	        	$css.add('../../style/stylesheets/pop.css');
	        	$scope.title = "用户列表";
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
						require(['./jurisdiction/editPop'], function(pop) {
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
						'parentId'
					]
				});
				

				var _data = {
				    "code":0,
				    "message":"成功",
				    "data":{
				        
				            "permission":{
				                "name":"名称",
				                "description":"说明",
				                "type":1,//type 1 是 menu、2 是 button
				                "url":"http://www/",
				                "sort":1, //排序
				                "parentId":1, //父ID
				                "showFlag":1, //1展示、0 不展示。展示的话 就在左侧菜单展示
				                "permission":"user:read" //权限CODE代码
				            },
				            "permissions":[
				                {
				                    "name":"名称",
				                    "description":"说明",
				                    "type":1,//type 1 是 menu、2 是 button
				                    "url":"http://www/",
				                    "sort":1, //排序
				                    "parentId":1, //父ID
				                    "showFlag":1, //1展示、0 不展示。展示的话 就在左侧菜单展示
				                    "permission":"user:read" //权限CODE代码
				                },
				                {
				                    "name":"名称",
				                    "description":"说明",
				                    "type":1,//type 1 是 menu、2 是 button
				                    "url":"http://www/",
				                    "sort":1, //排序
				                    "parentId":1, //父ID
				                    "showFlag":1, //1展示、0 不展示。展示的话 就在左侧菜单展示
				                    "permission":"user:read" //权限CODE代码
				                }
				            ]
				        
				    }
				};

				$scope.listdata = { //确认按钮
					title : $scope.title,
					table : {
						select : true,
						th : [
							{name:'名称' , width : '200'},
							{name:'说明' },
							{name:'type' },
							{name:'url' },
							{name:'sort' },
							{name:'showFlag' },
							{name:'permission' },
							{name:'操作' , width : '100'}
						],
						td : GenerateArrList.arr(_data.data.permissions,$scope.filter) ,
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
