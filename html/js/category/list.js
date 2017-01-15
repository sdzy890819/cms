define(["app",'jquery','require',
	'../data/getData', './addForm','./edit',
	'formlist','position','fixedNav',
	'../moduls/service','../moduls/factory'
], function ( app , $ , require, data , list , editPop) {
	app.directive('categoryList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/list.html',
	        controller : function($scope , pop , $uibModal , $css,GenerateArrList){

	        	$scope.title = '部门列表';

				$scope.$parent.menu.push({name:$scope.title}); //部门分类
				angular.extend($scope,{
					edit : function( obj ){ //保存

						function getAddForm(callback){ //填充数据
							var _data = {
								data: obj
							};
							callback(_data);
						}

      				editPop.init({ 
      				  id  : obj.id ,     					
      					obj : obj,
      					list : list,      					
      					updateData : getAddForm,      					
      					callback : function(list, callback) {
 
									callback(list);
      						
      					},
      					$uibModal :$uibModal

	  				});
					},
					del : function( obj ){ //保存
						pop.alert({
	 						 text:'您确定要删除'+obj.categoryName + '吗'
	 						,btn : ['确定','取消']
	 						,fn : function(){
								var _data = data.category.delCategory(obj)
							}
	 					})

	 					obj.callback = function(_data) {
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(_data.message);	
							
									location.reload();

							});					
	 					}
					},
					filter : [ //过滤不需要展示的
						'id'
					]
				});


				function getDataList(){					
					data.category.listCategory({
						
						callback : function(_data){

							var th = [
								{name:'分类名' , key: 'categoryName', width : '200'},
								{name:'分类说明', key: 'categoryDesc' },
								{name:'操作' , width : '120', class:'center'}
							];

							$scope.listdata = { //确认按钮
								title : $scope.title,
								table : {
									select : true,
									th : th,
									td : GenerateArrList.setArr(_data.data, th) ,

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
				};

				// data.category.listCategory(function(_data){
				// 	var th = [
				// 		{name:'分类名' , key: 'categoryName', width : '200'},
				// 		{name:'分类说明', key: 'categoryDesc' },
				// 		{name:'操作' , width : '120', class:'center'}
				// 	];


				// 	$scope.listdata = { //确认按钮
				// 		title : $scope.title,
				// 		table : {
				// 			select : true,
				// 			th : th,
				// 			td : GenerateArrList.setArr(_data.data, th) ,

				// 			edit : [
				// 				{cls : 'edit' , name : '编辑',evt:$scope.edit},
				// 				{cls : 'del' , name : '删除',evt:$scope.del}
				// 			]
				// 		}
				// 	}
				// 	// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
	   //      		GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,'edit');
	   //      		$scope.$apply();
				// });		

				getDataList();
	        }
	        ,link : function($scope , element ){
	        	
	        }
	    };
	});
});
