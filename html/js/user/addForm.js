define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list =  [ //表单
		{
			title : 'title',
			name : '上传头像',
			type : 'file', //text textarea radio checkbox edit
			typeName : 'images',
			//verify : 'userName'
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
			verify : 'title'
		},
		{
			title : 'idfa',
			name : 'IDFA(MAC)',
			placeholder : '多个以逗号分割 例如： XX-XX-XX-XX-XX',
			type : 'text',
			check : false
		},		
		{
			title : 'pwd',
			name : '密码',
			placeholder : '请输入密码',
			type : 'password', //text textarea radio checkbox edit
			verify : 'password'
		},
		{
			title : 'userGroup',
			name : '请选择用户组',
			type : 'checkbox', //text textarea radio checkbox edit
			checkbox : []
			//verify : 'password'
		}
	];
	function getList(callback){
		getData.position.listPosition({//部门
			callback:function(_data){
				$.each(list,function(i , obj){
					if(obj.type=='checkbox'){
						obj.checkbox = Tool.changeObjectName(_data.data,[{name:'positionName',newName:'name'}]);
					}
				})
				callback(list);
			}
		});
	}
	return getList;
})