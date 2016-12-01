define(["app",'formlist','position','fixedNav'], function ( app ) {
	app.directive('newsList',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/news/list.html',
	        controller : function($scope){
				$scope.$parent.menu.push({name:"新闻栏目管理"}); //栏目

				$scope.save = function( arr ){ //保存
					alert(arr)
				}
				var list = [ //表单
					{
						name : '栏目名',
						placeholder : '请输入栏目名称',
						minLength : 1,
						maxLength : 6,
						type : 'text', //text textarea radio checkbox edit
						prompt : {
							defualt : '标题为1-6个字符',
							error : '内容必需为中文，1-6个字符内'
						}
					},
					{
						name : '部门分类选择',
						type : 'select',
						prompt : {
							defualt : '请选择栏目',
							error : '栏目不能为空'
						},
						select : [
							[
								{name:'请选择部门'},
								{name:'请选择部门1'}
							]
						]
					},
					{
						name : '频道分类选择',
						type : 'select',
						prompt : {
							defualt : '请选择栏目',
							error : '栏目不能为空'
						},
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
							evt : $scope.save,
							icon_cls : 'save'
						}
					]
				}
	        }
	    };
	});
});
