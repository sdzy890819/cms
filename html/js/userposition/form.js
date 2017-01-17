define(function(getData,Tool){
	var list = [ //表单
		{
			title : 'positionName',
			name : ' 用户组名称',
			type : 'text', //text textarea radio checkbox edit
			placeholder : '请输入用户组名称',
			verify : 'title'
		}
	];

	return list;
})