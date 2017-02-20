define(function(){
	return [ //表单
		{
			title : 'title',
			name : '上传头像',
			type : 'file', //text textarea radio checkbox edit
			typeName : 'images'
		},
		{
			title : 'userName',
			name : '用户名',
			placeholder : '请输入用户名',
			type : 'text',
			verify : 'userName'
		},
		{
			title : 'realName',
			name : '真实姓名',
			placeholder : '请输入真实姓名',
			type : 'text',
			check : false
		},
		{
			title : 'idfa',
			name : 'IDFA(MAC)',
			placeholder : '请输入IDFA(MAC)',
			type : 'text',
			check : false
		},		
		{
			title : 'pwd',
			name : '密码',
			placeholder : '请输入密码',
			type : 'password', //text textarea radio checkbox edit
			verify : 'password'
		}
	];
})