define(["app",'./addForm','../data/getData','../moduls/Tool','form','position','fixedNav'], 
	function ( app , getList , getData , Tool ) {
	app.directive('categoryAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope, $state){
	        	$scope.$parent.menu.push({name:"新增部门分类"})
						$scope.save = function( obj ){ //保存
							getData.category.createCategory({
								"categoryName":obj.categoryName,
								"categoryDesc":obj.categoryDesc,

								callback : function(_data){
									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);

										if(_data.code == 0){
											$state.go('category.list');	
										}
										
									});
								}
							});					
						}
						$scope.rlease = function( obj ){ //发布
						}
						$scope.view = function( obj ){ //预览

						}
						$scope.cancel = function( obj ){ //取消

						}
						
						getList(function(list){

							//debugger;
							$scope.formdata = { //确认按钮
								title : '新增分类',
								list : list,
								submit : [
									{
										name:'保存',
										evt : 'save',
										icon_cls : 'ok'
									}
								]
							}
							$scope.$apply();
						})
	      }

	    };
	});
});