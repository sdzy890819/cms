define(function (require, exports, module) {
	var app = require('../ng-element'),
		position = require('../common/position') , 
		fixedNav = require('../common/positionNav') , 
		form = require('../common/form');

	position.init({app : app});
	fixedNav.init({app : app});
	form.init({app : app});

	app.directive('departmentEdit',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/department/edit.html',
	        controller : function($scope){
				$scope.$parent.menu.push({name:"新增部门分类"}); //栏目

				$scope.save = function( arr ){ //保存
					alert(arr)
				}
				var list = [ //表单
					{
						name : '分类名',
						placeholder : '请输入分类名称',
						minLength : 1,
						maxLength : 6,
						type : 'text', //text textarea radio checkbox edit
						prompt : {
							defualt : '分类名为1-6个字符',
							error : '内容必需为中文，1-6个字符内'
						}
					},
					{
						name : '分类说明',
						type : 'textarea',
						prompt : {
							defualt : '简要介绍一下'
						}
					}
				];
				$scope.formdata = { //确认按钮
					title : '新增部门分类',
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
