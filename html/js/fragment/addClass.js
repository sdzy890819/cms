define(["app",'./classForm', '../data/getData', 'form','position','fixedNav'], function ( app , list, data ) {
	app.directive('fragmentAddClass',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope, $state){
	        	$scope.title = "新增碎片分类";
	        	$scope.$parent.menu.push({name:$scope.title})
						$scope.save = function( obj ){ //保存
							data.fragment.createClassify({
								classifyName: obj.classifyName,

								callback : function(_data){
									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);

										if (_data.code == 0){
											$state.go('fragment.classList');	
										}
										
									});									
								}
							})
						}
						$scope.cancel = function( obj ){ //取消
							
						}
						$scope.formdata = { //确认按钮
							title : $scope.title,
							list : list,
							submit : [
								{
									name : '保存',
									evt : 'save',
									icon_cls : 'save'
								}
							]
						}
	        }
	    };
	});
});