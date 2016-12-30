define(function(){
	return [ //表单
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
			verify : 'select',
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
	]
})