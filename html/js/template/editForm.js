define(function(){
	return [ //表单
		{
			title : 'title',
			name : '选择关联内容',
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择新闻栏目'},
					{name:'专题分类'},
					{name:'碎片'}
				]
			]
		},
		{
			title : 'title',
			name : '新闻频道',
			type : 'checkbox',
			checkbox : [
				{
					title : 'name1',
					name : '名称',
					checked : true
				},
				{
					title : 'name2',
					name : '名称1'
				},
				{
					title : 'name3',
					name : '名称2'
				},
				{
					title : 'name4',
					name : '名称4',
					checked : true
				},
				{
					title : 'name5',
					name : '名称5'
				},
				{
					title : 'name6',
					name : '名称6',
					checked : true
				},
				{
					title : 'name7',
					name : '名称7'
				}
			]
		}
	]
})