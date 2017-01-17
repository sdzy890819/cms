define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [ //表单
		{
			title : 'parentId',
			name : '父ID',
			type : 'text', //text textarea radio checkbox edit
			placeholder : '请输入父ID'			
		},	
		{
			title : 'name',
			name : '权限名称',
			type : 'text', //text textarea radio checkbox edit
			placeholder : '请输入权限名称',
			verify : 'title'
		},
		{
			title : 'description',
			name : '权限描述',
			placeholder : '请输入权限描述',
			type : 'textarea', //text textarea radio checkbox edit
			verify : 'title'
		},
		{
			title : 'type',
			name : '权限类型',
			selectName : ['type'],
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择权限类型',title : 'type'},
					{name: 'MENU', id: 1},
					{name: 'BUTTON', id: 2}
				]
			]
		},
		{
			title : 'url',
			name : '权限URL',
			type : 'text',
			placeholder : '请输入url',
			verify : 'title'
		},
		{
			title : 'sort',
			name : '排序值',
			placeholder : '请输入排序值',
			type : 'text',
			verify : 'number' //text textarea radio checkbox edit			
		},
		{
			title : 'showFlag',
			name : '是否显示',
			selectName : ['showFlag'],
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择是否显示',title : 'showFlag'},					
					{name: 'YES', id: 1},
					{name: 'NO', id: '0'}
				]
			]
		},		
		{
			title : 'permission',
			name : '权限代码',
			placeholder : '请输入权限代码',
			type : 'text', //text textarea radio checkbox edit			
			verify: 'title'
		}

	];

	return list;
})