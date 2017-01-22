define(["app",'jquery','form'],function (app,$) {
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
				controller: function($scope,$uibModalInstance,$css) {
					$scope.data = null;					
					angular.extend($scope,{
						titelement : {
					  		close : true
					  	},
						save : function( arr ){ //保存
							obj.save(arr,$scope.data)
						},
						cancel : function( arr ){ //取消
							obj.cancel(arr,$scope.data)
						},
					  	close : function () {
						   	$uibModalInstance.dismiss('cancel');
					  	}
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