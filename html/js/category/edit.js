// define(["app", '../data/getData','./addForm','form','position','fixedNav'], function ( app , getData, list ) {
// 	app.directive('categoryEdit',function(){

// 		return {
// 	    	restrict : 'E',
// 	    	replace : true,
// 	    	transclude : true,
// 	        templateUrl : '../template/common/addAndEdit.html',
// 	        controller : function($scope){

// 	        	$scope.title = '部门分类编辑';
// 	        	$scope.$parent.menu.push({name:$scope.title});
// 						$scope.save = function( obj ){ //保存							
// 							 getData.category.updateCategory({
// 							 	id: obj.id,
// 							 	categoryName: obj.categoryName,
// 							 	categoryDesc: obj.categoryDesc,
// 							 	callback : function(_data){
// 									layui.use(['layer'], function(){
// 										var layer = layui.layer;
// 										layer.msg(_data.message);
// 									});							 		
// 							 	}
// 							 })

// 						}
// 						$scope.cancel = function( obj ){ //取消
// 							alert(obj)
// 						}

// 						$scope.formdata = { //确认按钮
// 							title : $scope.title,
// 							list : list,
// 							submit : [
// 								{
// 									name : '保存',
// 									evt : 'save',
// 									icon_cls : 'save'
// 								},
// 								{
// 									name:'清空',
// 									evt : 'cancel',
// 									icon_cls : 'cancel',
// 									cls : 'cancel'
// 								}
// 							]
// 						}

// 						$scope.$apply();
				
// 	        }
// 	    };
// 	});
// });

define(["app",'jquery', '../data/getData', './addForm','form', 'position', 'fixedNav'],function (app,$, getData, list) {
    return {
    	init : function( obj ){
			var $uibModal = obj.$uibModal , 
				getList = obj.list,
				id = obj.id;
			
			obj.$uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				//windowTemplateUrl : '../../template/common/window.html',
				//template : 'asdfsadf',
				templateUrl: '../template/common/addAndEdit.html',
				size: 'lg',
				controller: function($scope,$uibModalInstance,$css) {
					obj.updateData(function(_data){						
						$scope.data = _data.data;
					});
					
					angular.extend($scope,{
						titelement : {
					  		close : true
					  	},
						save : function( obj ){ //保存
							console.log(id);
							 getData.category.updateCategory({
							 	id: id,
							 	categoryName: obj.categoryName,
							 	categoryDesc: obj.categoryDesc,
							 	callback : function(_data){
									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);
									});							 		
							 	}
							 })
						},
						cancel : function( arr ){ //取消
							alert(arr)
						},
					  	close : function () {
						   	$uibModalInstance.dismiss('cancel');
					  	}
					});

					getList(function(list){
						
						obj.callback(list,function(_list){
							$scope.formdata = { //确认按钮
								title : '部门分类编辑',
								cls : 'popedit',
								list : _list,
								submit : [
									{
										name : '更新',
										evt : 'save',
										icon_cls : 'save'
									},
									{
										name:'清空',
										evt : 'cancel',
										icon_cls : 'cancel',
										cls : 'cancel'
									}
								]
							}
							$scope.$apply();
						})
					})
				}
			});
    	},

    }
});