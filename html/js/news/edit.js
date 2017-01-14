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
					getDta.news.createNewsColumn({
						channelId:1//频道ID
						columnName:"栏目名",
						listId:1,//预模版list接口返回的预模版ID. 不是必须
						detailId:1//预模版detail接口返回的预模版ID. 不是必须
						listTemplate2Id:1, //第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
						detailTemplate2Id:1,//第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
						keywords:"关键字" //不是必须
						description:"描述" //不是必须
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
