define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [ //表单
		{
			title : 'columnName',
			name : '推荐栏目名称',
			type : 'text', //text textarea radio checkbox edit
			placeholder : '请输入推荐栏目名称',
			verify : 'title'
		}
	];

	return list;
})