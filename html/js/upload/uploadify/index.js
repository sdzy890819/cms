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
					    close : function(){
					    	$uibModalInstance.dismiss('cancel');
					    }
					})
				}
			});
			pop.opened.then(function (selectedItem) {
				setTimeout(function(){
				    $('#file_upload').uploadify({
				        'swf'      : '/js/upload/uploadify/uploadify.swf',
				        "fileObjName" : 'file',
				        "buttonText" : '请选择视频文件',
				        'buttonClass' : 'layui-upload-icon',
				        'uploader' : URL.video.uploadVideo2,
				        onError : function(){
				        	alert('视频上传错误，不支持破损视频')
				        },
				        onProgress   : function(file, e) {
				            if (e.lengthComputable) {
				                var percent = Math.round((e.loaded / e.total) * 100);
				            }
				            file.queueItem.find('.fileinfo').html(' - ' + percent + '%');
				            file.queueItem.find('.progress-bar').css('width', percent + '%');
				        }
				        // Put your options here
				    });
				},300);
		    }, function () {

		    });
    	}
    }
});