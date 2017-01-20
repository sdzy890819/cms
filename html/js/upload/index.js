define(["app",'jquery','form'],function (app,$) {
    return {
    	init : function( obj ){
			var $uibModal = obj.$uibModal;
			obj.$uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				//windowTemplateUrl : '../../template/common/window.html',
				//template : 'asdfsadf',
				templateUrl: '../template/upload/pop.html',
				size: 'normal',
				controller: function($scope,$uibModalInstance,$css,Upload , $timeout) {
					$scope.dataList = obj.data;
					var reg = /\.(exe|rar|zip|tar|gz|dll)$/;
					angular.extend($scope,{
						uploadPic : function(file) {							
							if(file && file.name.search(reg)<0){								
								obj.data.event(file,$uibModalInstance)
							}else{
								layui.use(['layer'], function(){
									var layer = layui.layer;
									layer.alert('请上传正确的文件格示。',
										{
										  skin: 'layui-layer-molv' //样式类名
										  ,title : '上传失败'
										  ,anim: 1
										  ,btn : ['确定']
										  ,shadeClose : true
										}, function(index){//确定
											layer.close(index)
										}
									);
								});
							}
					    },
					    close : function(){
					    	$uibModalInstance.dismiss('cancel');
					    }
					})
				}
			});
    	},
    	close : function(){

    	},
    	updateData : function(){

    	}
    }
});