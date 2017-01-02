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
		      templateUrl: '../template/common/addAndEdit.html',
		      size: 'lg',
		      controller: function($scope,$uibModalInstance) {
		      	angular.extend($scope,{
		      		titelement : {
			      		close : true
			      	},
					save : function( arr ){ //保存
						alert(arr)
					},
					cancel : function( arr ){ //取消
						alert(arr)
					},
			      	close : function () {
					   	$uibModalInstance.dismiss('cancel');
				  	}
				})

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