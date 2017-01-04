define(function(){
	return [ //表单
		{
			name : '栏目名',
			placeholder : '请输入栏目名称',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		},
		/*{
			name : '部门分类选择',
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择部门'},
					{name:'请选择部门1'}
				]
			]
		},*/
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
	]
})