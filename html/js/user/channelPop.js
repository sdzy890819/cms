define(["app",'jquery','../data/getData', '../moduls/Tool'],function (app,$,getData, tool) {
    return {
    	init : function( obj ){
			var $uibModal = obj.$uibModal;				
			obj.$uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',

				templateUrl: '../template/template/channelPop.html',				
				controller: function($scope, $state, $uibModalInstance,$css) {
					angular.extend($scope,{
						titelement : {
					  		close : true
					  	},
					  title : '编辑用户频道列表',					  
						save : function( arr ){ //保存
							obj.save(arr,$scope.data)
						},
						cancel : function( arr ){ //取消
							obj.cancel(arr,$scope.data)
						},

						select : function(event){
							var currentTarget = event.currentTarget;														

							if (currentTarget.checked) {
								getData.userchannel.createUserChannel({
									userId : obj.obj.id,
									channelId : currentTarget.dataset.id,
									callback : function(_data){
										layui.use(['layer'], function(){
											var layer = layui.layer;
											layer.msg(_data.message);										
										});										
									}
								})
							}else{
								getData.userchannel.delUserChannel({
									userId : obj.obj.id,
									channelId : currentTarget.dataset.id,
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

        	var currentUserChannelIds = [];        	
        	getData.userchannel.userChannelIds({
        		userId : obj.obj.id,
        		callback : function(_data){        			
        			currentUserChannelIds = _data.data;  

							getData.channel.listChannel({//频道列表
								callback : function(_data){
									$.each(_data.data, function(i, obj){										
										obj.ischecked = ($.inArray(obj.id, currentUserChannelIds) != -1);										
									})
									$scope.listChannelData = _data.data;
									
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