define(["app",'jquery','../data/getData', '../moduls/Tool'],function (app,$,getData, tool) {
    return {
    	init : function( obj ){
			var $uibModal = obj.$uibModal;				
			obj.$uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',

				templateUrl: '../template/template/positionPop.html',				
				controller: function($scope, $state, $uibModalInstance,$css) {
					angular.extend($scope,{
						titelement : {
					  		close : true
					  	},
					  title : '编辑所属用户组',					  
						save : function( arr ){ //保存
							obj.save(arr,$scope.data)
						},
						cancel : function( arr ){ //取消
							obj.cancel(arr,$scope.data)
						},

						select : function(event){
							var currentTarget = event.currentTarget;														

							if (currentTarget.checked) {
								getData.position.setUserPosition({
									userId : obj.obj.userId,
									positionId : currentTarget.dataset.id,
									callback : function(_data){
										layui.use(['layer'], function(){
											var layer = layui.layer;
											layer.msg(_data.message);										
										});										
									}
								})
							}else{
								getData.position.delUserPosition({
									userId : obj.obj.userId,
									positionId : currentTarget.dataset.id,
									callback : function(_data){
										layui.use(['layer'], function(){
											var layer = layui.layer;
											layer.msg(_data.message);										
										});										
									}
								})															
							}							
						},
						

				  	close : function () {
					   	$uibModalInstance.dismiss('cancel');
				  	}  			  	
					});

        	var currentPositionIds = [];        	
        	getData.position.listUserPosition({        		
        		userId : obj.obj.userId,
        		callback : function(_data){        			
        			$.each(_data.data, function(i, o){
        				currentPositionIds.push(o.positionId);
        			})

							getData.position.listPosition({
								callback : function(_data){
									$.each(_data.data, function(i, obj){										
										obj.ischecked = ($.inArray(obj.id, currentPositionIds) != -1);										
									})
									$scope.listPositionData = _data.data;
									
									$scope.$apply();
								}
							})        			
        		}
        	});

					
				}			

			});
    	}
    }
});