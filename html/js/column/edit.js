define(function (require, exports, module) {
	var app = require('../ng-element'),
		position = require('../common/position') , 
		fixedNav = require('../common/positionNav') , 
		form = require('../common/form');

	position.init({app : app});
	fixedNav.init({app : app});
	form.init({app : app});

	app.directive('columnEdit',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/column/edit.html',
	        controller : function($scope){
				$scope.$parent.menu.push({name:"频道编辑"}); //栏目

				$scope.save = function( arr ){ //保存
					alert(arr)
				}

				var list = [ //表单
					{
						name : '频道名',
						placeholder : '请输入频道名称',
						minLength : 1,
						maxLength : 6,
						type : 'text', //text textarea radio checkbox edit
						prompt : {
							defualt : '频道名为1-6个字符',
							error : '内容必需为中文，1-6个字符内'
						}
					},
					{
						name : '频道说明',
						type : 'textarea',
						prompt : {
							defualt : '简要介绍一下'
						}
					},
					{
						name : '域名',
						placeholder : '请输入域名',
						minLength : 5,
						maxLength : 50,
						type : 'text', //text textarea radio checkbox edit
						prompt : {
							defualt : '域名式例：http://www.chinar.cn',
							error : '内容必需为中文，5-50个字符内'
						}
					},
					{
						name : '绝对路径',
						placeholder : '请输入绝对路径',
						minLength : 5,
						maxLength : 50,
						type : 'text', //text textarea radio checkbox edit
						prompt : {
							defualt : '频道名为5-50个字符',
							error : '内容必需为中文，5-50个字符内'
						}
					},
					{
						name : '所属部门',
						type : 'select', //text textarea radio checkbox edit
						prompt : {
							defualt : '请选择部门',
							error : '请选择部门'
						},
						select : [
							[
								{name:'请选择部门'},
								{name:'请选择部门1'},
								{name:'请选择部门2'},
								{name:'请选择部门3'}
							]
						]
					}
				];
				$scope.formdata = { //确认按钮
					title : '新增频道分类',
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
