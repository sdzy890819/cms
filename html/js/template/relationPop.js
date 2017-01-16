define(["app",'jquery','form'],function (app,$) {
    return {
    	init : function( obj ){
			var $uibModal = obj.$uibModal , 
				getList = obj.list;
			obj.$uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: '../template/template/relationPop.html',
				windowClass : 'relationPopsuper',
				controller: function($scope,$uibModalInstance,$css) {
					$scope.data = null;
					angular.extend($scope,{
						titelement : {
					  		close : true
					  	},
						save : function( arr ){ //保存
							obj.save(arr,$scope.data)
						},
						cancel : function( arr ){ //取消
							obj.cancel(arr,$scope.data)
						},
					  	close : function () {
						   	$uibModalInstance.dismiss('cancel');
					  	}
					});
				}
			});
    	}
    }
});