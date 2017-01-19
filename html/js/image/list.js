define(['require',"app",'jquery'
	,'../data/getData' , './addForm',
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

							function getAddForm(callback) {
								var data = {};								
								// data.
							}

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

				var page = 1;
				function getDataList(){
					data.image.imageslist({
						page : page,
						pageSize : 20,

						callback : function(_data){
							
							var th = [
										{name:'图片ID', key: 'id' },
										{name:'图片标题', key: 'imageTitle' },
										{name:'图片地址' , key: 'imageUrl', width : '200'},										
										{name:'图片宽度', key: 'imageWidthPixel' },
										{name:'图片高度', key: 'imageHeightPixel' },
										{name:'操作' , width : '150' , class:'center' }
								];

							$scope.listdata = { //确认按钮
								title : $scope.title,
								table : {
									select : true,
									th : th,
									td : GenerateArrList.setArr(_data.data.list, th) ,
									edit : [
										{cls : 'edit' , name : '编辑',evt:$scope.edit},
										{cls : 'del' , name : '删除',evt:$scope.del}
									]
								}
							}	
						// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
		        		GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');
		        		$scope.$apply();													
						}

					});
				}
					getDataList();
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
