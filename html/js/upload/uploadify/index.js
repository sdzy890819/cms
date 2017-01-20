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
				controller: function($scope,$uibModalInstance,$css, $timeout,FileUploader) {
					angular.extend($scope,{
					    close : function(){
					    	$uibModalInstance.dismiss('cancel');
					    }
					})
					var uploader = $scope.uploader = new FileUploader({
				            url: URL.video.uploadVideo2,
				            method : 'post'
				        });

					        // FILTERS

			        uploader.filters.push({
			            name: 'customFilter',
			            fn: function(item /*{File|FileLikeObject}*/, options) {
			                return this.queue.length < 10;
			            }
					});
					//var uploader = new FileUploader(); // NOW
				}
			});
			pop.opened.then(function (selectedItem) {
				return;
				setTimeout(function(){
				    $('#file_upload').uploadify({
				        'swf' : '/js/upload/uploadify/uploadify.swf',
				        "fileObjName" : 'file',
				        "buttonText" : '请选择视频文件',
				        'buttonClass' : 'layui-upload-icon',
				        'uploader' : URL.video.uploadVideo2,
				        'onError' : function(){
				        	alert('视频上传错误，不支持破损视频')
				        },
				        'onProgress' : function(file, e) {
				            if (e.lengthComputable) {
				                var percent = Math.round((e.loaded / e.total) * 100);
				            }
				           /* file.queueItem.find('.fileinfo').html(' - ' + percent + '%');
				            file.queueItem.find('.progress-bar').css('width', percent + '%');*/
				            $('.progress-bar').html(percent + '%');
				        },
				        'onUploadProgress' : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
				            $('.progress-bar').html(totalBytesUploaded + ' bytes uploaded of ' + totalBytesTotal + ' bytes.');
				        },
				        'onUploadSuccess' : function(file, data, response){

				        	layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg('上传成功！');
							});
						}
				        // Put your options here
				    });
				},300);
		    }, function () {

		    });
    	}
    }
});