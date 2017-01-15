define(["app",'./addForm','form','position','fixedNav'], function ( app , getList ) {
	app.directive('topicAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope){
	        	$scope.title = "新增专题";
	        	$scope.$parent.menu.push({name:$scope.title})
				$scope.rlease = function( obj ){ //发布
					var channelId , columnId , categoryId;
					$.each(obj.selects,function(){
						if(this.title == 'channelId'){
							channelId = this.id;
						}
						if(this.title == 'columnId'){
							columnId = this.id;
						}
						if(this.title == 'categoryId'){
							categoryId = this.id;
						}
					})
					getData.news.createNews({

						callback : function(_data){
							layui.use(['layer'], function(){
								var layer = layui.layer;
								layer.msg(_data.message);
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
								name:'取消',
								evt : 'cancel',
								icon_cls : 'cancel',
								cls : 'cancel'
							}
						]
					}
					$scope.$apply();
				});
	        }
	    };
	});
});