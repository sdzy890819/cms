define(["app",'jquery','form'],function (app,$) {
    return {
    	init : function( obj ){
			var $uibModal = obj.$uibModal , 
				getList = obj.list;
			
			if($.type(getList)=='array'){
				getList = function(callback){
					callback(obj.list);
				}
			}
			obj.$uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				//windowTemplateUrl : '../../template/common/window.html',
				//template : 'asdfsadf',
				templateUrl: '../template/common/addAndEdit.html',
				size: 'lg',
				controller: function($scope,$uibModalInstance,$css) {
					
				}
			});
    	},
    	updateData : function(){

    	}
    }
});