define(['require',"app",'jquery','formlist','fixedNav','../moduls/service'], function ( require , app , $ ) {
	app.directive('newsNewslist',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/news/newslist.html',
	        controller : function($scope,pop){
				$scope.$parent.menu.push({name:"新闻栏目列表"}); //栏目
				$scope.info = function( id ){ //保存
					alert(id)
				}
				$scope.edit = function( id ){ //编辑
					require(['./editPop'], function(pop) {
        				pop.init({
        					id : id
        				});
  					});
				}
				$scope.del = function( id ){ //保存
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
								scope.delAll(function( ids ){
									console.log(ids)
								});
							},
							cls :'red',
							icon_cls : 'remove'
						}
					]
				}
				$scope.filter = [ //过滤不需要展示的
					'id','channelId','columnId',
					'write_user_id','platform'
				];
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
				                "id":1,
				                "title":"标题",
				                "source":"来源",
				                "author":"作者",
				                "channelId":10,//频道ID
				                "columnId":10,//栏目ID
				                "write_user_id":"123123213123123123",//撰稿人
				                "writeUserName":"撰稿人",
				                "platform":1,
				                "platformStr":"平台名称"
				            }
				        ]
				    }
				}
				var arr = [];
				$.each(_data.data.list,function( i , obj ){
					var li = {} , k = 0;
					$.each(obj,function( key , val ){
						var b = false;
						for(var j=0,len=$scope.filter.length;j<len;j++){
							if(key!=$scope.filter[j]){
								b = true;
							}
						}
						if(!b){
							li['name'+k] = val;
							k++;
						}else{
							li[key] = val;
						}
					})
					arr.push(li);
				});
				$scope.listdata = { //确认按钮
					title : '新闻栏目编辑',
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
						td : arr ,
						edit : {
							width : 100 , 
							list : [
								{cls : 'edit' , name : '编辑',evt:$scope.edit},
								{cls : 'del' , name : '删除',evt:$scope.del},
								{cls : '' , name : '详情',evt:$scope.info},
							]
						}
					},
					submit : [
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
					]
				}
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
