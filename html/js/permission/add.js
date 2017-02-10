define(["app", '../data/getData', './form','form','position','fixedNav'], function ( app , getData, list ) {
	app.directive('permissionAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope, $state){
	        	$scope.title = "新增权限";
	        	$scope.$parent.menu.push({name:$scope.title});

	        	$scope.save = function(obj){	        		
							var type, showFlag, platform;

							$.each(obj.selects,function(){
								if(this.title == 'type'){
									type = this.id;
								}

								if(this.title == 'showFlag'){
									showFlag = this.id;
								}

								if(this.title == 'platform') {
									platform = this.id;
								}
							});

							getData.permission.createPermission({
								name : obj.name,
								description : obj.description,
								type : type,
								url : obj.url,
								sort : obj.sort,
								parentId : obj.parentId,
								showFlag : showFlag,
								platform : platform,
								permission : obj.permission,
								callback : function(_data){

									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);
										console.log(_data);
										if (_data.code == 0){
											$state.go('permission.list');										
										}
									});
								}
							});      		
	        	};

	        	$scope.cancel = function(obj) {
	        		
	        	};

										
						$scope.formdata = { //确认按钮
							title : $scope.title,
							list : list,
							submit : [
								{
									name:'提交',
									evt : 'save',
									icon_cls : 'save'
								}
							]
						};
											
	        }
	    };
	});
});
