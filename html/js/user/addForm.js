define(function(){
	return [ //表单
		{
			title : 'title',
			name : '上传头像',
			type : 'file', //text textarea radio checkbox edit
			typeName : 'images'
		},
		{
			title : 'name',
			name : '用户名',
			placeholder : '请输入用户名',
			type : 'text',
			verify : 'title'
		},
		{
			title : 'name1',
			name : '真实姓名',
			placeholder : '请输入真实姓名',
			type : 'text',
			check : false
		},
		{
			title : 'pwd',
			name : '密码',
			placeholder : '请输入密码或生成密码',
			type : 'password', //text textarea radio checkbox edit
			verify : 'required'
		}
	];
})