define(['require',"app",'jquery'
	,'../data/getData' , './editForm',
	,'formlist','fixedNav','position'
	,'../moduls/service','../moduls/factory'
], function ( require , app , $ , data , list ) {
	app.directive('imageList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList){
	        	$scope.title = "图片列表";
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
						require(['../common/editPop'], function(pop) {
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
					filter : [ //过滤不需要展示的
						'id','uploadUserId'
					]
				});

				data.image.imageslist(function(_data){
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
								{name:'操作' , width : '150' , class:'center' }
							],
							td : GenerateArrList.arr(_data.data.list,$scope.filter) ,
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