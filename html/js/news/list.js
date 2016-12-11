define(["app",'jquery','formlist','fixedNav','../moduls/service'], function ( app , $ ) {
	app.directive('newsList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/news/list.html',
	        controller : function($scope , pop){
				$scope.$parent.menu.push({name:"新闻栏目管理"}); //栏目
				$scope.add = function( id ){ //保存
					pop.alert({
						 text:'你的ID为：'+id
						,btn : ['确定','取消']
						,fn : function(index){//确定
							layer.close(index)
						}
					})
				}
				$scope.edit = function( id ){ //保存
					pop.alert({
						 text:'你的ID为：'+id
						,btn : ['确定','取消']
						,fn : function(index){//确定
							layer.close(index)
						}
					})
				}
				$scope.del = function( id ){ //删除
					pop.alert({
						 text:'你的ID为：'+id
						,btn : ['确定','取消']
						,fn : function(index){//确定
							layer.close(index)
						}
					})
				};
				$scope.delAll = function( ids ){ //删除
					pop.alert({
						 text:'你的ID为：'+ids
						,btn : ['确定','取消']
						,fn : function(index){//确定
							layer.close(index)
						}
					})
				}
				var selectAll = {
					name : '全选',
					evt : function(id , scope , evt){
						scope.selectAll(evt);
					},
					icon_cls : 'ok'
				}
				$scope.navEdit = { //导航操作按钮
					//nav : [selectAll],
					list : [
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
				var td = [ //表单
					[
						{id:'566541545'},
						{name:'用户脆响q',img : 'images/img.png'},
						{name:'用户组名称'}
					],
					[
						{id:'1242314'},
						{name:'用户脆响q',img : 'images/img.png'},
						{name:'用户组名称'}
					],
					[
						{id:'6585568'},
						{name:'用户脆响q',img : 'images/img.png'},
						{name:'用户组名称'}
					],
					[
						{id:'03452345'},
						{name:'用户脆响q',img : 'images/img.png'},
						{name:'用户组名称'}
					],
					[
						{id:'98123468'},
						{name:'用户脆响q',img : 'images/img.png'},
						{name:'用户组名称'}
					],
					[
						{id:'566541545'},
						{name:'用户脆响q',img : 'images/img.png'},
						{name:'用户组名称'}
					],
					[
						{id:'566541545'},
						{name:'用户脆响q',img : 'images/img.png'},
						{name:'用户组名称'}
					],
					[
						{id:'566541545'},
						{name:'用户脆响q',img : 'images/img.png'},
						{name:'用户组名称'}
					],
					[
						{id:'566541545'},
						{name:'用户脆响q',img : 'images/img.png'},
						{name:'用户组名称'}
					],
					[
						{id:'566541545'},
						{name:'用户脆响q',img : 'images/img.png'},
						{name:'用户组名称'}
					]
				];
				$scope.listdata = { //确认按钮
					title : '新闻栏目编辑',
					table : {
						select : true,
						th : [
							{name:'ID' , width : '200'},
							{name:'真实姓名' , width : '100'},
							{name:'用户组名'},
							{name:'操作' , width : '200'}
						],
						td : td ,
						edit : {
							width : 300 , 
							list : [
								{cls : 'add' , name : '添加新用户到组',evt:$scope.add},
								{cls : 'edit' , name : '添加权限到组',evt:$scope.edit},
								{cls : 'del' , name : '删除',evt:$scope.del},
							]
						}
					},
					submit : [
						selectAll,
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
