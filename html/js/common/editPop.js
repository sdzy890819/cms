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
				size: (obj.obj.size ||'lg'),
				controller: function($scope,$uibModalInstance,$css) {
					$scope.data = null;					
					angular.extend($scope,{
						titelement : {
					  		close : true
					  	},
					  	updateData : function( obj ){
					  		angular.extend($scope.data,obj);
					  		if(!$scope.$$phase) { 
								$scope.$apply();
							} 
					  	},
						save : function( arr ){ //保存
							obj.save(arr,$scope.data,$uibModalInstance);
							if(!obj.noclose){
								$uibModalInstance.dismiss('cancel');
							}
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

								window.addContent = function(callback){
									callback(_data.data.newsDetail.content);
								}
								function clear( obj ){
									if(obj.type=='selectSize'){
										obj.toSelect = [];
									}
								}
								if(!_data.data.columnIds || !_data.data.columnIds.length){
									$.each($scope.formdata.list,function( i , obj){
										if($.type(obj)=='array'){
											$.each(obj,function(j,_obj){
												clear(_obj)
											})
										}else{
											clear(obj)
										}
									})
								}
								if(!$scope.$$phase) { 
									$scope.$apply();
								} 
							},$scope);							
						})
					})
				}
			});
    	}
    }
});