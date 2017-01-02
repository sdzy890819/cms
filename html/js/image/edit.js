define(["app",'form','position','fixedNav'], function ( app ) {
	app.directive('imageEdit',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl: '../js/plug/upload/uploadImage.html',
			controller: function($scope) {
				alert('感觉和上传是一回事')
				$scope.title = "图片压缩";
				$scope.$parent.menu.push({name:$scope.title}); //栏目
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
	    };
	});
});