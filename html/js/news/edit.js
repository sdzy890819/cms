define(["app",'form','position','fixedNav'], function ( app ) {
	app.directive('newsEdit',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/news/edit.html',
	        controller : function($scope){
				$scope.$parent.menu.push({name:"新闻栏目编辑"}); //栏目

				$scope.save = function( obj ){ //保存
					alert(obj)
				}
				var list = [ //表单
					{
						name : '栏目名',
						placeholder : '请输入栏目名称',
						type : 'text', //text textarea radio checkbox edit
						verify : 'title'
					},
					{
						name : '部门分类选择',
						type : 'select',
						verify : 'select',
						select : [
							[
								{name:'请选择部门'},
								{name:'请选择部门1'}
							]
						]
					},
					{
						name : '请选择频道分类',
						type : 'select',
						verify : 'select',
						select : [
							[
								{name:'频道分类选择'},
								{name:'频道分类选择2'}
							]
						]
					}
				];
				$scope.formdata = { //确认按钮
					title : '新闻栏目编辑',
					list : list,
					submit : [
						{
							name : '保存',
							evt : 'save',
							icon_cls : 'save'
						}
					]
				}

	        }
	    };
	});
});
