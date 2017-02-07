define(["app",'./addForm','../data/getData','../moduls/Tool','form','position','fixedNav'], function ( app , getList , getData , Tool ) {
	app.directive('template2Add',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope, $state){
	        	$scope.title = '新增模版二';
	        	$scope.$parent.menu.push({name:$scope.title});
	        	$scope.rlease = function( obj ){ //发布
					var templateClassify ;
					$.each(obj.selects,function(){
						if(this.title == 'templateClassify'){
							templateClassify = this.type;
						}
					});
					getData.template.createTemplate2({
						"templateName":obj.templateName,
						"filename":obj.filename,
						"path":obj.path,
						"templateClassify":templateClassify,
						"encoded":obj.encoded,
						callback : function(_data){
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(_data.message);

								if(_data.code == 0){
									$state.go('template2.list');
								}								
							});
						}
					});
				}
				getList(function(list){
					//debugger;
					$scope.formdata = { //确认按钮
						title : $scope.title,
						list : list,
						submit : [
							{
								name:'确认发布',
								evt : 'rlease',
								icon_cls : 'ok'
							},
							{
								name:'清空',
								evt : 'cancel',
								icon_cls : 'cancel',
								cls : 'cancel'
							}
						]
					}
					$scope.$apply();
				})
	        }
	    };
	});
});