define(["app",'./addForm','../upload/index','../data/getData','../upload/angular-file-upload/index','../data/URL','form','position','fixedNav','uploadify'], function ( app , list , upload , getData , uploadify , URL ) {
	app.directive('videoAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope,Upload,$uibModal){
	        	$scope.title = "上传视频";
	        	$scope.$parent.menu.push({name:$scope.title});

	        	angular.extend($scope,{
						save : function( obj ){ //保存

							var $dom = $('.layui-box.layui-upload-button');
							var videoUrl = $dom.attr('video-url'),
									fileName = $dom.attr('filename');
							getData.video.createVideo({
								videoTitle: obj.videoTitle,
							  videoDesc: obj.videoDesc,
							  videoUrl: videoUrl,								  
							  fileName: fileName,
							  callback : function(_data){
									layui.use(['layer'], function(){
										var layer = layui.layer;
										layer.msg(_data.message);											
									});								  	
							  }
							})							
						}
				});
				$scope.formdata = { //确认按钮
					title : $scope.title,
					list : list,
					submit : [
						{
							name : '保存',
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
				/*$.each($scope.formdata.list,function( i , obj ){
					if(this.type=='upload'){
						this.callback = function(layui){
							layui.upload({
								elem : '.'+this.cls,
								url : URL.video.uploadVideo2,
								title: "视频上传",
								type : 'video',
								data : {
									fileName : 'asfsf'
								},
								method : 'POST',
								before : function(e){
								},
								success : function(){

								}
							});
						}
					}	
				});*/
				$scope.$on('formRepeat',function(){
					$('.layui-upload-button').unbind().click(function(){
						uploadify.init({
        					data : {
        						obj : {},
	        					title : '上传视频',
	        					name : '请选择视频',
	        					type : 'video',
	        					event : function(file , $uibModalInstance){	        						
	        						$scope.imageInfo = file;	        						
	        						$uibModalInstance.dismiss('cancel');
	        					}
        					},
        					$uibModal :$uibModal
        				});
					});
				});
	        }
	    };
	});
});