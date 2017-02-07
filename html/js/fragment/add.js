define(["app",'./addForm', '../data/getData','form','position','fixedNav'], function ( app , getList, Data ) {
	app.directive('fragmentAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
        templateUrl : '../template/common/addAndEdit.html',
        controller : function($scope, $state){
        	$scope.title = "新增碎片";
        	$scope.$parent.menu.push({name:$scope.title});

					$scope.save = function( obj, _detail ){ //保存
						var channelId, fragmentClassifyId;

						$.each(obj.selects, function(){
							if (this.title == 'channelId'){
								channelId = this.id;
							}

							if (this.title == 'fragmentClassifyId') {
								fragmentClassifyId = this.id;
							}
						})

						Data.fragment.createFragment({
							channelId : channelId,
							fragmentClassifyId : fragmentClassifyId,
							fragmentName : obj.fragmentName,
							fragmentModel : obj.fragmentModel,
							sortNum : obj.sortNum,

							callback : function(_data){
								layui.use(['layer'], function(){
									var layer = layui.layer;
									layer.msg(_data.message);

									if(_data.code == 0){
										$state.go('fragment.list');
									}									
									
								});								
							}
						})
					}
					$scope.cancel = function( obj ){ //取消
						alert(obj);
					}

					getList(function(list){
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

						$scope.$apply();
					})
        }
	    };
	});
});