define(['require',"app",'jquery'
	,'../data/getData' , './addForm',
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , data , list ) {
	app.directive('newsNewslist',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope,pop,$uibModal , $css , GenerateArrList){
				$scope.$parent.menu.push({name:"新闻栏目列表"}); //栏目
				$scope.title = "新闻列表";
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
					info : function( id ){ //保存
						alert(id)
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
						'id','channelId','columnId',
						'write_user_id','platform'
					]
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
				data.news.newslist(function(_data){
					$scope.listdata = { //确认按钮
						title : $scope.title,
						table : {
							select : true,
							th : [
								{name:'标题' , width : '200'},
								{name:'来源' , width : '100'},
								{name:'作者'},
								{name:'撰稿人'},
								{name:'平台名称'},
								{name:'操作' , width : '200'}
							],
							td : GenerateArrList.arr(_data.data.list,$scope.filter) ,
							edit : [
								{cls : 'edit' , name : '编辑',evt:$scope.edit},
								{cls : 'del' , name : '删除',evt:$scope.del},
								{cls : '' , name : '详情',evt:$scope.info},
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
