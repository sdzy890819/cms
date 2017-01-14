define(["app",'./columnForm','../data/getData','form','position','fixedNav'], function ( app , getList ,getDta ) {
	app.directive('newsEdit',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/addAndEdit.html',
	        controller : function($scope){
				$scope.$parent.menu.push({name:"新闻栏目编辑"}); //栏目

				$scope.save = function( obj ){ //保存
					debugger;
					getData.news.createNewsColumn({
						channelId:obj.channelId,//频道ID
						columnName:obj.columnName,
						listId:obj.listId,//预模版list接口返回的预模版ID. 不是必须
						detailId:obj.detailId,//预模版detail接口返回的预模版ID. 不是必须
						listTemplate2Id:obj.listTemplate2Id, //第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
						detailTemplate2Id:obj.detailTemplate2Id,//第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
						keywords:obj.keywords, //不是必须
						description:obj.description, //不是必须
						callback : function(_data){

						}
					})
				}
				getList(function( list ){
					$scope.formdata = { //确认按钮
						title : '新增栏目',
						list : list,
						submit : [
							{
								name : '确认新增',
								evt : 'save',
								icon_cls : 'save'
							}
						]
					}
					$scope.$apply();
				})

	        }
	    };
	});
});
