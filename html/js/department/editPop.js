define(["app",'jquery','./addForm','form'],function (app,$,list) {
    return {
    	init : function( obj ){
    		var $uibModal = obj.$uibModal;
			obj.$uibModal.open({
		      animation: true,
		      ariaLabelledBy: 'modal-title',
		      ariaDescribedBy: 'modal-body',
		      //windowTemplateUrl : '../../template/common/window.html',
		      //template : 'asdfsadf',
		      templateUrl: '../template/department/edit.html',
		      size: 'lg',
		      controller: function($scope,$uibModalInstance) {

		      	$scope.titelement = {
		      		close : true
		      	};
		      	$scope.close = function () {
				   	$uibModalInstance.dismiss('cancel');
			  	};

			  	$.each(list,function( i , item ){
			  		
			  	});

				$scope.formdata = { //确认按钮
					title : '编辑',
					cls : 'popedit',
					list : list,
					submit : [
						{
							name : '确定',
							evt : 'save',
							icon_cls : 'save'
						},
						{
							name:'清空',
							evt : 'cancel',
							icon_cls : 'cancel',
							cls : 'cancel'
						}
					]
				}
		      }
		    });
    	}
    }
});