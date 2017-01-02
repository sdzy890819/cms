define(["app",'jquery','formlist','position','fixedNav','../moduls/service','../moduls/factory'], function ( app , $ ) {
	app.directive('userClear',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList){
	        	$css.add('../../style/stylesheets/pop.css');
	        	$scope.title = '用户清理';
				$scope.$parent.menu.push({name:$scope.title}); //栏目
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
						require(['./user/editPop'], function(pop) {
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
						'id','userId','lastModifyUserId'
					]
				});
				

				var _data = {
				    "code":0,
				    "message":"成功",
				    "data":{
				        "page":{
				            "pageSize":20,
				            "count":100,
				            "pageCount":5,
				            "page":1
				        },
				        "list":[
				            {
				                "headImage":"头像",
				                "realName":"真实名字",
				                "userId":"111111111111111",//用户ID
				                "lastModifyUserId":"1111111111111", //最后修改人ID
				                "id":1
				            }
				        ]
				    }
				};

				$scope.listdata = { //确认按钮
					title : $scope.title,
					table : {
						select : true,
						th : [
							{name:'头你' , width : '200'},
							{name:'真实名称' },
							{name:'操作' , width : '100'}
						],
						td : GenerateArrList.arr(_data.data.list,$scope.filter) ,
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
