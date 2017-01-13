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
					info : function( obj ){ //详情
						pop.alert({
	 						 text:'去相关页面，因为还没有页面所以这样提示：<br>ID为：'+obj.id
	 						,btn : ['确定','取消']
	 					})
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
	 						 text:'您确定要删除"'+obj.title+'"吗'
	 						,btn : ['确定','取消']
	 						,fn : function(){
	 							data.news.delNews(obj);
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
				data.news.newslist(function(_data){
					var th = [
						{name:'标题' , key:'title' , width : '200'},
						{name:'来源' , key:'source', width : '100'},
						{name:'作者' , key:'author'},
						{name:'撰稿人' , key:'writeUserName'},
						{name:'平台名称',key:'platformStr'},
						{name:'操作' , width : '200'}
					];
					$scope.listdata = { //确认按钮
						title : $scope.title,
						table : {
							select : true,
							th : th,
							td : GenerateArrList.setArr(_data.data.list,th) ,
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
