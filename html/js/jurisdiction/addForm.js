define(function(){
	return [ //表单
		{
			title : 'title',
			name : '权限名',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		},
		{
			title : 'textarea',
			name : '权限说明',
			placeholder : '权限说明',
			type : 'textarea',
			check:false
		},
		{
			title : 'url',
			name : 'url',
			placeholder : '请输入url',
			type : 'text',
			verify : 'http'
		},
		{
			title : 'sort',
			name : '排序值',
			placeholder : '排序值',
			type : 'text', //text textarea radio checkbox edit
			verify : 'number'
		},
		{
			title : 'showFlag',
			name : '是否显示',
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
	];
})