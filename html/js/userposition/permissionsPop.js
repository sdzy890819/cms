define(["app",'jquery','../data/getData', '../moduls/Tool'],function (app,$,getData, tool) {
    return {
    	init : function( obj ){
			var $uibModal = obj.$uibModal;				
			obj.$uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: '../template/template/permissionsPop.html',				
				controller: function($scope, $state, $uibModalInstance,$css) {
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

						select : function(event){
							var currentTarget = event.currentTarget;
							var	permissionId  = currentTarget.dataset.id;
							var selectAllInput = $('.selectAllInput')				

							if (currentTarget.checked) {
								currentTarget.checked = true;

								getData.permission.createPositionPermission({
									positionId : obj.obj.id,
									permissionId : permissionId,
									callback : function(_data) {
										layui.use(['layer'], function(){
											var layer = layui.layer;
											layer.msg(_data.message);										
										});										
									}
								})		

							}else{
								currentTarget.checked = false;								
								$.each(selectAllInput, function(i, obj){
									obj.checked = false;
								})

								getData.permission.delPositionPermission({
									positionId : obj.obj.id,
									permissionId : permissionId,
									callback : function(_data) {										
										layui.use(['layer'], function(){
											var layer = layui.layer;											
											layer.msg(_data.message);	

										});								
									}
								})		

							}							
						},
						
						selectAll : function(event) {							
							var currentTarget = event.currentTarget;
						  var dom = $('.permissions-pop');
						  var checkboxs = dom.find('input[name=permission]');

						  var permissionIds = [];
							if (currentTarget.checked){								
								$.each(checkboxs, function(i, obj){
									obj.checked = true;
									permissionIds.push(obj.dataset.id);
								})
																								
							}else {								
								$.each(checkboxs, function(i, obj){
									obj.checked = false;
									
								})
							}

							getData.permission.setPositionPermissions({
								positionId : obj.obj.id,
								permissionIds : permissionIds.join(','),

								callback : function(_data) {
									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);										
									});										
								}
							})							
														
						},

				  	close : function () {
					   	$uibModalInstance.dismiss('cancel');
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

        	$scope.allchecked = true;
					getData.permission.listPermission({//新闻栏目
						callback : function(_data){
							var data = [];													
							$.each(_data.data, function(i, obj){								
								obj.permission.typeStr = typeStr(obj.permission.type);
								obj.permission.ischecked = ($.inArray(obj.permission.id, currentPermissionIds) != -1);
								obj.permission.specialCls = true;
								if (!obj.permission.ischecked){												
									$scope.allchecked = false;
								}

								data.push(obj.permission);

								$.each(obj.permissions, function(j, ps){
									ps.typeStr = typeStr(ps.type);
									ps.ischecked = $.inArray(ps.id, currentPermissionIds) != -1;

									if (!ps.ischecked){																	
										$scope.allchecked = false;
									}									
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