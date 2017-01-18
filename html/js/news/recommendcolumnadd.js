define(["app",'./recommendcolumnForm','../data/getData','../moduls/Tool','form','position','fixedNav'], 
	function ( app , list , getData , Tool ) {
	app.directive('recommendcolumnAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope, $state){
	        	$scope.$parent.menu.push({name:"新增推荐栏目"})
						$scope.save = function( obj ){ //保存
							getData.news.createRecommendColumn({
								columnName : obj.columnName,								

								callback : function(_data){
									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);
										$state.go('news.recommendcolumnlist');
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
	      }

	    };
	});
});