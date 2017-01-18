define(["app",'jquery','form'],function (app,$) {
    return {
    	init : function( obj ){
			var $uibModal = obj.$uibModal;

			obj.$uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				//windowTemplateUrl : '../../template/common/window.html',
				//template : 'asdfsadf',
				templateUrl: '../template/upload/pop.html',
				size: 'lg',
				controller: function($scope,$uibModalInstance,$css,Upload) {
					$scope.dataList = obj.data;
					$scope.uploadPic = function(file) {
						file.upload = Upload.upload({
							url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
							data: {username: $scope.username, file: file},
						});

						file.upload.then(function (response) {
							$timeout(function () {
								file.result = response.data;
							});
						}, function (response) {
							if (response.status > 0)
								$scope.errorMsg = response.status + ': ' + response.data;
						}, function (evt) {
							// Math.min is to fix IE which reports 200% sometimes
							file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
						});
				    }
				}
			});
    	},
    	updateData : function(){

    	}
    }
});