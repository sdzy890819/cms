define(["app",'form','position','fixedNav'], function ( app ) {
	app.directive('imageUpload',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl: '../js/plug/upload/uploadImage.html',
			controller: function($scope) {
				$scope.title = "图片上传";
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