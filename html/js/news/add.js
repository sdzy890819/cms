define(["app",'form','position','fixedNav'], function ( app ) {
	app.directive('newsAdd',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/news/add.html',
	        controller : function($scope){
	        	$scope.$parent.menu.push({name:"新增新闻"})
				$scope.save = function( obj ){ //保存
					alert(obj)
				}
				$scope.rlease = function( obj ){ //发布
					alert(obj)
				}
				$scope.view = function( obj ){ //预览
					alert(obj)
				}
				$scope.cancel = function( obj ){ //预览
					alert(obj)
				}
				
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
						title : 'title',
						name : '标题',
						placeholder : '请输入标题',
						type : 'text', //text textarea radio checkbox edit
						verify : 'title'
					},
					{
						title : 'maxTitle',
						name : '附标题',
						placeholder : '请输入附标题',
						type : 'text',
						verify : 'title'
					},
					{
						title : 'keyword',
						name : '关键字',
						placeholder : '关键字之间以 “,” 隔开',
						type : 'text',
						check : false
					},
					[
						{
							title : 'author',
							name : '作者',
							placeholder : '请输入作者',
							type : 'text',
							check : false
						},
						{
							title : 'source',
							name : '来源',
							placeholder : '请输入作者来源',
							type : 'text',
							check : false
						}
					],
					{
						title : 'describe',
						name : '描述',
						placeholder : '描述',
						type : 'textarea',
						check : false
					},
					{
						title : 'selectCoumn',
						name : '选择频道栏目',
						type : 'select',
						select : [
							[
								{name:'请选择部门'},
								{name:'请选择部门1'},
								{name:'请选择部门2'},
								{name:'请选择部门3'},
								{name:'请选择部门4'}
							],
							[
								{name:'请选择频道'},
								{name:'请选择频道1'},
								{name:'请选择频道2'}
							],
							[
								{name:'请选择栏目'},
								{name:'请选择栏目1'},
								{name:'请选择栏目2'},
								{name:'请选择栏目3'}
							]
						]
					},
					{
						title : 'content',
						name : '内容',
						type : 'edit'
					},
					{
						title : 'date',
						name : '定时发布',
						type : 'date',
						check : false
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