define(["app",'jquery','require'],function (app,$,require) {
    return {
    	init : function( obj ){
    		var $uibModal = obj.$uibModal , 
    			elem = $(obj.elem) , 
    			$css = obj.$css,
    			typeName = obj.typeName;

    		elem.click(function(){
    			if(typeName=='images'){
					obj.$uibModal.open({
						animation: true,
						ariaLabelledBy: 'modal-title',
						ariaDescribedBy: 'modal-body',
						//windowTemplateUrl : '../../template/common/window.html',
						//template : 'asdfsadf',
						templateUrl: '../js/plug/upload/uploadImage.html',
						controller: function($scope,$uibModalInstance) {
							window.uploadevent = function(status,picUrl,callbackdata){
								status += '';
								alert('上传状态'+status)
								switch(status){
									case '1':
									var time = new Date().getTime();
									break;
									break;
									case '-1':
									window.location.reload();
									break;
									default:
									window.location.reload();
								} 
							}
						}
					});
				}
    		})
		}
    }
});