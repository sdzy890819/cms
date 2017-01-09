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
			title : 'subTitle',
			name : '附标题',
			placeholder : '请输入附标题',
			type : 'text',
			verify : 'title'
		},
		[
			{
				title : 'keyword',
				name : '关键字',
				placeholder : '关键字之间以 “,” 隔开',
				type : 'text',
				check : false
			},
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
			title : 'description',
			name : '描述',
			placeholder : '描述',
			type : 'textarea',
			check : false
		},
		{
			title : 'channelId',
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
			width : '800px',
			height : '200px',
			type : 'edit'
		},
		{
			title : 'buildTime',
			name : '定时发布',
			placeholder : '请选择时间 年/月/日 时:分:秒',
			type : 'date',
			check : false
		},
		{
			title : 'show',
			name : '是否发布',
			type : 'radio',
			radio : [
				{
					title : 'yes',
					name : '是' , 
					checked : true
				},
				{
					title : 'no',
					name : '否'
				}
			]
		}
	]
})