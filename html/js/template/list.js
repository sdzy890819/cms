define(["app",'jquery','./addForm','formlist','position','fixedNav','../moduls/service','../moduls/factory'], function ( app , $ , list ) {
	app.directive('templateList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList){
	        	$css.add('../../style/stylesheets/pop.css');
	        	$scope.title = "模版列表";
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
					},
					down : function( id ){ //删除
						pop.alert({
							 text:'你的ID为：'+id
							,btn : ['确定','取消']
							,fn : function(index){//确定
								layer.close(index)
							}
						})
					},
					relation : function( id ){
						pop.alert({
							 text:'你的ID为：'+id
							,btn : ['确定','取消']
							,fn : function(index){//确定
								layer.close(index)
							}
						})
					},
					filter : [ //过滤不需要展示的
						'id','channelId','templateClassify','userId',
						'job','align','alignindex'
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
				                "templateName":"模版名称",
				                "templateDesc":"模版说明",
				                "filename":"模版、发布文件名",
				                "path":"发布目录",
				                "templateClassify":1,
				                "templateClassifyStr":"模版分类、1为首页、2为列表页、3为详情页、4、碎片页",
				                "userId":"模版编辑人ID",
				                "job":0, //是否定时生成。1是定时生成。0是触发生成
				                "encoded":"UTF-8",
				                "channelId":1,//频道ID
				                "sortNum":1,//排序值
				                "id":1
				            },
				            {
				                "templateName":"模版名称",
				                "templateDesc":"模版说明",
				                "filename":"模版、发布文件名",
				                "path":"发布目录",
				                "templateClassify":1,
				                "templateClassifyStr":"模版分类、1为首页、2为列表页、3为详情页、4、碎片页",
				                "userId":"模版编辑人ID",
				                "job":1, //是否定时生成。1是定时生成。0是触发生成
				                "encoded":"GBK",
				                "channelId":1,//频道ID
				                "sortNum":1,//排序值
				                "id":2
				            }
				        ]
				    }
				};

				$scope.navEdit = { //导航操作按钮
					nav : [{
						name : '下载模版',
						event : function(obj , scope , evt){
							scope.getOneSelect($scope.down);
						},
						cls : 'down'
					}],
					list : [
						{
							name : '模版关联',
							event : function(obj , scope , evt){
								scope.getOneSelect($scope.relation);
							},
							cls : 'plus'
						},
						{
							name : '删除',
							event : function(obj , scope , evt){
								scope.getOneSelect($scope.del);
							},
							cls : 'del'
						}
					]
				}
				$scope.listdata = { //确认按钮
					title : $scope.title,
					table : {
						select : true,
						th : [
							{name:'模版名称' , width : '200'},
							{name:'模版说明' },
							{name:'文件名',width:'90'},
							{name:'发布目录',width:'100'},
							{name:'模版分类',width:'200'},
							{name:'编码',width:'80',class:'center'},
							{name:'排序值', width:'90',class:'center'},
							{name:'操作' , width : '250',class:'center'}
						],
						td : GenerateArrList.arr(_data.data.list,$scope.filter) ,
						edit : [
							{cls : 'down', name : '下载',evt:$scope.down},
							{cls : 'add', name : '关联',evt:$scope.relation},
							{cls : 'edit' , name : '编辑',evt:$scope.edit},
							{cls : 'del' , name : '删除',evt:$scope.del},
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
				GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
	        	GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');
	        	$.each($scope.listdata.table.td,function( i , item ){
	        		if(item.job==1){//1是定时生成。0是触发生成
	        			var arr = [];
	        			$.each(item.list.edit,function( j , obj ){
	        				if(obj.name!='关联'){
	        					arr.push(obj);
	        				}
	        			});
	        			item.list.edit = arr;
	        		}
	        	})
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
