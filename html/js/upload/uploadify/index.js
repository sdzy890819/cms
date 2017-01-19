define(["app",'jquery','../../data/URL'],function (app,$,URL) {
    return {
    	init : function( obj ){
			var $uibModal = obj.$uibModal;
			var pop = obj.$uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				//windowTemplateUrl : '../../template/common/window.html',
				//template : 'asdfsadf',
				templateUrl: '../template/upload/videoPop.html',
				size: 'lg',
				controller: function($scope,$uibModalInstance,$css,Upload , $timeout) {
					angular.extend($scope,{
						uploadPic : function(file) {							
							
					    },
					    close : function(){
					    	$uibModalInstance.dismiss('cancel');
					    }
					});
				}
			});
			pop.opened.then(function (selectedItem) {
				setTimeout(function(){
				    $('#file_upload').uploadify({
				        'swf'      : '/js/upload/uploadify/uploadify.swf',
				        'uploader' : URL.video.uploadVideo2
				        // Put your options here
				    });
				},300);
		    }, function () {

		    });
    	}
    }
});