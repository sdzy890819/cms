define(['../data/getData'],function( data ){
	return [ //表单
		{
			title : 'name',
			name : '模版名称',
			type : 'text', //text textarea radio checkbox edit
			placeholder : '请输模版名称',
			verify : 'title'
		},
		{
			title : 'explor',
			name : '模版说明',
			placeholder : '请输模版入说明',
			type : 'textarea' //text textarea radio checkbox edit
		},
		{
			title : 'templateName',
			name : '发布文件名',
			type : 'text',
			placeholder : '请输入模版发布时显示的文件名',
			verify : 'required'
		},
		{
			title : 'path',
			name : '发布目录',
			placeholder : '请输入模版发布目录',
			type : 'text', //text textarea radio checkbox edit
			verify : 'path'
		},
		{
			title : 'selectTemplate',
			name : '选择模版',
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择模版类型'},
					{name:'碎片频道'},
					{name:'新闻频道'},
					{name:'专题频道'}
				]
			]
		},
		{
			title : 'selectTemplate',
			name : '选择频道',
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择频道'},
					{name:'频道名称'},
					{name:'频道名称'},
					{name:'频道名称'}
				]
			]
		},
		{
			title : 'encoded',
			name : '编码',
			type : 'radio',
			radio : [
				{
					title : 'UTF-8',
					name : 'UTF-8',
					checked : true
				},
				{
					title : 'GBK',
					name : 'GBK'
				},
				{
					title : 'BIG5',
					name : 'BIG5'
				}
			]
		},
		{
			title : 'sort',
			name : '排序',
			placeholder : '请输入排序',
			type : 'text', //text textarea radio checkbox edit
			pattern : '/\\d+/',
			verify : 'number'
		},
		{
			title : 'upload',
			name : '上传模版',
			cls : 'uploadTemplate',
			fileType : 'file',
			ext : 'html|htm|shtml',
			type : 'upload', //text textarea radio checkbox edit
			verify : 'upload'
		},
		{
			title : 'shengcheng',
			name : '生成方式',
			type : 'radio',
			radio : [
				{
					title : 'timing',
					name : '定时生成',
					checked : true
				},
				{
					title : 'touch',
					name : '触发生成'
				}
			]
		}
	]
})