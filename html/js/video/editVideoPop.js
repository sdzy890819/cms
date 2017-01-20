define(["app",'jquery', '../data/getData', '../upload/index','../upload/angular-file-upload/index', 'form'],function (app,$, getData, upload, uploadify) {
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
				controller: function($scope,$uibModalInstance,$css, $state) {
					$scope.data = null;					
					angular.extend($scope,{
						titelement : {
					  		close : true
					  	},
						save : function( obj ){ //保存
							var $dom = $('.layui-box.layui-upload-button');
							var videoUrl = $dom.attr('video-url'),
									fileName = $dom.attr('filename');

							if(videoUrl == undefined) {
								videoUrl = $scope.data.videoUrl;
								fileName = $scope.data.fileName;
							}

							getData.video.updateVideo({
								id : $scope.data.id,
								videoTitle: obj.videoTitle,
							  videoDesc: obj.videoDesc,
							  videoUrl: videoUrl,								  
							  fileName: fileName,
							  callback : function(_data){
									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);		
										$state.reload();
									});								  	
							  }
							})	

						},
						cancel : function( arr ){ //取消
							obj.cancel(arr,$scope.data)
						},
					  	close : function () {
						   	$uibModalInstance.dismiss('cancel');
					  	}
					});

					$scope.$on('formRepeat',function(){
						$('.layui-upload-button').unbind().click(function(){
							uploadify.init({
	        					data : {
	        						obj : {},
		        					title : '上传视频',
		        					name : '请选择视频',
		        					type : 'video',
		        					event : function(file , $uibModalInstance){	        						
		        						$scope.videoInfo = file;	        						
		        						$uibModalInstance.dismiss('cancel');
		        					}
	        					},
	        					$uibModal :$uibModal
	        				});
														
						});
					});					

					getList(function(list){
						
						obj.callback(list,function(_list){
							$scope.formdata = { //确认按钮
								title : '编辑',
								cls : 'popedit',
								list : _list,
								submit : [
									{
										name : '确定',
										evt : 'save',
										icon_cls : 'save'
									}/*,
									{
										name:'清空',
										evt : 'cancel',
										icon_cls : 'cancel',
										cls : 'cancel'
									}*/
								]
							}
							obj.updateData(function(_data){
								$scope.data = _data.data;
								if(!$scope.$$phase) { 
									$scope.$apply();
								} 
							});
							if(!$scope.$$phase) { 
								$scope.$apply();
							} 
						})
					})
				}

			});
    	},
    	updateData : function(){

    	}
    }
});