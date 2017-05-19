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
				size: 'normal',
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
			            method : 'post',
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

							uploader.onAfterAddingFile = function(fileItem) {
								$('.filename').empty().append(fileItem._file.name);
							};

			        uploader.onProgressItem = function(fileItem, progress) { //进行中
			        	$('.videoPop .progress').show();
			        	$('.videoPop .progress1').css({width:progress+'%'});
			        	//$('.videoPop .progress2').css({width:progress+'%'});
			        };
			        
			        uploader.onProgressAll = function(progress) {//成功
			        	$('.videoPop .progress1').css({width:progress+'%'});
			        	$('.videoPop .progress2').css({width:'90%',transitionDuration:'100s'});
			        	
			        };
			        uploader.onErrorItem = function(fileItem, response, status, headers) {
			            layui.use(['layer'], function(){
							var layer = layui.layer;
							layer.msg('上传失败！');
							setTimeout(function(){
								$scope.close();
							},300);
						});
			        };

			        var iresponse = true;
					uploader.onCompleteItem = function(fileItem, response, status, headers) {
						iresponse = true;
						if(response.code == -111){
							layui.use(['layer'], function(){
								layer.open({
							 		type: 0, icon: 2,
									title:'上传',
							  		content: response.message
								});
							});
							iresponse = false
							$('.videoPop .progress2').css({width:'0',transitionDuration:'.3s'});
							return;
						}
						
						obj.obj && obj.obj.success && obj.obj.success(fileItem, response, status, headers);
						 var $dom = $('.layui-box.layui-upload-button');
						 var videoMsg = "<span class='layui-upload-icon ng-binding ng-scope'>" + response.data.fileName + "</span>";
					    							    					       
				       $dom.attr("video-url", response.data.location);
				       $dom.attr("filename", response.data.fileName);
				       $dom.empty().append(videoMsg);	       
				    };


			        uploader.onCompleteAll = function() {
			        	if(!iresponse) return;
			        	$('.videoPop .progress2').css({width:'500px',transitionDuration:'10s'});
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