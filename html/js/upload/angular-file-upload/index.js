define(["app",'jquery','../../data/URL' , '../../data/getData'],function (app,$,URL,getData) {
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
					var isUpload = true , fileName = null,
						size = 0;
					angular.extend($scope,{
					    close : function(){
					    	$uibModalInstance.dismiss('cancel');
					    },
					    submit : function( obj ){
					    	if(isUpload==true){
					    		isUpload = false;
					    		obj.upload();
					    	}
					    },
					    cancel : function(){
			    			$('.fileUpload').val('');
					    	if(isUpload) return;
					    	getData.upload.cancelVideo({
					    		fileName : fileName , 
					    		callback : function( _data ){
					    			$('.videoPop .progress1').css({width:'0.01%'});
			        				$('.videoPop .progress2').css({width:'0.01%',transitionDuration:'.3s'});
					    		}
					    	})
					    }
					})
					var uploader = $scope.uploader = new FileUploader({
			            url: URL.video.uploadVideo2,
			            method : 'post'
			        });

					        // FILTERS

			        uploader.filters.push({
			            name: 'customFilter',
			            fn: function( item , options) {
			            	fileName = item.name;
			            	size = item.size;
			            	uploader.queue.shift();
			                return this.queue.length < 10;
			            }
					});

			        uploader.onProgressItem = function(fileItem, progress) { //进行中
			        	$('.videoPop .progress1').css({width:progress+'%'});
			        };
			        
			        uploader.onProgressAll = function(progress) {//成功
			        	$('.videoPop .progress1').css({width:progress+'%'});
			        	$('.videoPop .progress2').css({width:'90%',transitionDuration:'600s'});
			        };
			        uploader.onErrorItem = function(fileItem, response, status, headers) {
			            layui.use(['layer'], function(){
							var layer = layui.layer;
							layer.msg('上传失败！');
						});
			        };

			        uploader.onCompleteAll = function() {
			        	$('.videoPop .progress2').css({width:'100%',transitionDuration:'10s'});
			            layui.use(['layer'], function(){
							var layer = layui.layer;
							layer.msg('上传成功！');
							isUpload = true;
							setTimeout(function(){
								$scope.close();
							},300);
						});
			        };

				}
			});
    	}
    }
});