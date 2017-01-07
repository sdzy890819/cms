define(function(){
	return [ //表单
		{
			title : 'topicTitle',
			name : '专题标题',
			type : 'text', //text textarea radio checkbox edit
			placeholder : '请输入专题标题',
			verify : 'title'
		},
		{
			title : 'topicContent',
			name : '专题内容',
			placeholder : '请输入视频标题',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		},
		{
			title : 'topicPath',
			name : '专题相对路径',
			type : 'text',
			placeholder : '请输入视频说明'
		},
		{
			title : 'topicFilename',
			name : '专题文件名',
			placeholder : '请输入专题文件名',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		},
		[
			{
				title : 'topicClassifyId',
				name : '专题分类',
				type : 'select',
				verify : 'select',
				select : [
					[
						{name:'请选择专题分类'},
						{name:'碎片频道'},
						{name:'新闻频道'},
						{name:'专题频道'}
					]
				]
			},
			{
				title : 'categoryId',
				name : '部门类别',
				type : 'select',
				verify : 'select',
				select : [
					[
						{name:'请选择部门类别'},
						{name:'碎片频道'},
						{name:'新闻频道'},
						{name:'专题频道'}
					]
				]
			}
		],
		[
			{
				title : 'topicColumnId',
				name : '专题栏目',
				type : 'select',
				verify : 'select',
				select : [
					[
						{name:'请选择专题栏目'},
						{name:'碎片频道'},
						{name:'新闻频道'},
						{name:'专题频道'}
					]
				]
			},
			{
				title : 'channelId',
				name : '频道类别',
				type : 'select',
				verify : 'select',
				select : [
					[
						{name:'请选择频道类别'},
						{name:'碎片频道'},
						{name:'新闻频道'},
						{name:'专题频道'}
					]
				]
			}
		],
		[
			{
				title : 'releaseTime',
				name : '发布时间',
				placeholder : '请选择时间 年/月/日 时:分:秒',
				type : 'date'
			},
			{
				title : 'keyword',
				name : '关键字',
				placeholder : '请输入关键字以“,”间隔',
				type : 'text'
			}
		],
		{
			title : 'description',
			name : '描述',
			placeholder : '请输入关键字以“,”间隔',
			type : 'text'
		}
	]
})