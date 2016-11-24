define(function (require, exports, module) {
	var app = require('../ng-element'),
		position = require('../common/position') , 
		fixedNav = require('../common/positionNav') , 
		form = require('../common/form');

	position.init({
		app : app
	});
	fixedNav.init({app : app})
	form.init({app : app})

	app.directive('newsAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/news/add.html',
	        controller : function($scope){
				$scope.save = function(){ //保存
					alert('保存')
				}
				$scope.rlease = function(){ //发布
					alert('发布')
				}
				$scope.view = function(){ //预览
					alert('预览')
				}
				$scope.cancel = function(){ //预览
					alert('取消')
				}
				$scope.menu = [{name:"新闻管理",link:"news.add"},{name:"新增新闻",link:"news.add",show:"true"}]; //栏目
				$scope.edit = { //导航操作按钮
					nav : [{
						name : '保存',
						evt : $scope.save,
						cls : 'save'
					}],
					list : [
						{
							name:'发布',
							evt : $scope.rlease,
							cls : 'add'
						}
					]
				}
				var list = [ //表单
					{
						name : '标题',
						placeholder : '请输入标题',
						minLength : 5,
						maxLength : 30,
						type : 'text', //text textarea radio checkbox edit
						prompt : {
							defualt : '标题为30个字符',
							error : '内容必需为中文，5-30个字符内'
						}
					},
					{
						name : '附标题',
						placeholder : '请输入附标题',
						type : 'text',
						minLength : 10,
						maxLength : 50,
						prompt : {
							defualt : '附标题为50个字符',
							error : '内容必需为中文，10-50个字符内'
						}
					},
					{
						name : '关键字',
						placeholder : '关键字之间以 “,” 隔开',
						type : 'text',
						check : true,
						prompt : {
							defualt : '关键字之间以 “,” 隔开，不超过5个字符'
						}
					},
					[
						{
							name : '作者',
							placeholder : '请输入作者',
							check : true,
							type : 'text',
						},
						{
							name : '来源',
							placeholder : '请输入作者来源',
							check : true,
							type : 'text'
						}
					],
					{
						name : '描述',
						placeholder : '描述',
						check : true,
						type : 'textarea'
					},
					{
						name : '选择频道栏目',
						type : 'select',
						prompt : {
							defualt : '请选择栏目',
							error : '栏目不能为空'
						},
						select : [
							[
								{name:'请选择部门'},
								{name:'请选择部门'}
							],
							[
								{name:'请选择频道'}
							],
							[
								{name:'请选择栏目'}
							]
						]
					},
					{
						name : '内容',
						type : 'edit',
						prompt : {
							error : '内容不能为空'
						},
						minLength : 10,
						maxLength : 500,
					},
					{
						name : '定时发布',
						type : 'date',
						prompt : {
							error : '时间不能为空'
						}
					}
				];
				$scope.formdata = { //确认按钮
					title : '新增新闻',
					list : list,
					submit : [
						{
							name : '保存',
							evt : $scope.save,
							icon_cls : 'save'
						},
						{
							name:'预览',
							evt : $scope.view,
							icon_cls : 'view'
						},
						{
							name:'确认发布',
							evt : $scope.rlease,
							icon_cls : 'ok'
						},
						{
							name:'取消',
							evt : $scope.cancel,
							icon_cls : 'cancel',
							cls : 'cancel'
						}
					]
				}
	        }
	    };
	});
});
