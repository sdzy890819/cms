define(["app",'jquery','../data/getData', '../moduls/Tool'],function (app,$,getData, tool) {
    return {
    	init : function( obj ){
			var $uibModal = obj.$uibModal;				
			obj.$uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: '../template/template/permissionsPop.html',

				controller: function($scope, $uibModalInstance,$css) {
					angular.extend($scope,{
						titelement : {
					  		close : true
					  	},
					  title : '编辑权限列表',
					  					  
						save : function( arr ){ //保存
							obj.save(arr,$scope.data)
						},
						cancel : function( arr ){ //取消
							obj.cancel(arr,$scope.data)
						},

				  	close : function () {
					   	$uibModalInstance.dismiss('cancel');
				  	},
				  	recommendColumnlistDone : function(){ //加载完				  		
				  		setTimeout(function(){
				  			debugger;
				  		},200)
				  	}
					});
        	
        	var currentPermissionIds = [];
        	getData.permission.listPositionPermission({
        		positionId : obj.obj.id,
        		callback : function(_data){
        			currentPermissionIds = _data.data;        			
        		}
        	})

        	function typeStr(t){
        		if (t == 1) {
        			return 'MENU'
        		} else{
        			return 'BUTTON'
        		}
        	}

					getData.permission.listPermission({//新闻栏目
						callback : function(_data){
							var data = [];													
							$.each(_data.data, function(i, obj){								
								obj.permission.typeStr = typeStr(obj.permission.type);
								data.push(obj.permission);

								$.each(obj.permissions, function(j, ps){
									ps.typeStr = typeStr(ps.type);
									data.push(ps);
								})
							})

							$scope.listPermissionData = data;
							$scope.$apply();
						}
					})
					
					$scope.isChecked = function(id) {						
						return(
							$.inArray(id, currentPermissionIds) != -1
						);
					}
					
					$scope.isCheckedAll = function(){						
					}

					$scope.checkedAll = function(obj, _detail) {
						// console.log($scope.listPermissionData);
					}
				}			

			});
    	}
    }
});