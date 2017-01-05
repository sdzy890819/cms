define(function(){
	return [ //表单
		{
			title : 'title',
			name : '频道名',
			placeholder : '请输入频道名称',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		},
		{
			title : 'sm',
			name : '频道说明',
			type : 'textarea',
			check : false
		},
		{
			title : 'yumin',
			name : '域名',
			placeholder : '请输入域名',
			type : 'text', //text textarea radio checkbox edit
			verify : 'http'
		},
		{
			title : 'path',
			name : '绝对路径',
			placeholder : '请输入绝对路径',
			type : 'text', //text textarea radio checkbox edit
			verify : 'path'
		},
		{
			title : 'column',
			name : '模版位置',
			type : 'select', //text textarea radio checkbox edit
			select : [
				[
					{name:'请选择模版'},
					{name:'请选择模版1'},
					{name:'请选择模版2'},
					{name:'请选择模版3'}
				]
			],
			verify : 'select'
		},
		{
			title : 'column',
			name : '所属部门',
			type : 'select', //text textarea radio checkbox edit
			select : [
				[
					{name:'请选择部门'},
					{name:'请选择部门1'},
					{name:'请选择部门2'},
					{name:'请选择部门3'}
				]
			],
			verify : 'select'
		}
	];
})