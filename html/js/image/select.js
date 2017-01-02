define(["app",'jquery','formlist','position','fixedNav','../moduls/service','../moduls/factory'], function ( app , $ ) {
	app.directive('imageSelect',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList){
	        	$css.add('../../style/stylesheets/pop.css');
	        	$scope.title = "图片筛选";
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
						require(['./image/editPop'], function(pop) {
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
						'id','uploadUserId'
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
						            "imageUrl":"图片地址",
						            "imageWidthPixel":200, //图片长像素
						            "imageHeightPixel":100, // 图片宽像素
						            "orgWidthPixel":200, //原始长像素
						            "orgHeightPixel":100, //原始宽像素
						            "imageTitle":"图片标题",
						            "uploadUserId":"123213213123123",
						            "uploadTime":"上传时间",
						            "imagePath":"图片相对路径",
						            "watermark":1, //是否水印 1、0
						            "compress":1, //是否压缩
						            "platform":1, //平台
						            "id":1 //ID
						    	}
					        ]
					    }
					};

				$scope.listdata = { //确认按钮
					title : $scope.title,
					table : {
						select : true,
						th : [
							{name:'图片地址' , width : '200'},
							{name:'宽' },
							{name:'高' },
							{name:'原图宽' },
							{name:'原图高' },
							{name:'图片标题' },
							{name:'上传时间' },
							{name:'图片相对路径' },
							{name:'是否水印' },
							{name:'是否压缩' },
							{name:'平台' },
							{name:'操作' , width : '100'}
						],
						td : GenerateArrList.arr(_data.data.list,$scope.filter) ,
						edit : {
							width : 120 , 
							list : [
								//{cls : 'edit' , name : '编辑',evt:$scope.edit},
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
