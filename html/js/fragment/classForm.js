define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [ //表单
		{
			title : 'classifyName',
			name : '分类名称',
			type : 'text',
			placeholder : '请输入分类名',
			verify : 'title'
		}
	];

	return list;
})