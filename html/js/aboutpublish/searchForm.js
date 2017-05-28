define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [ //表单		

		{
			title : '触发类型',
			selectName : [
				'triggerTypeStr'
			],
			name : '触发类型',
			type : 'select',
			cls : 'w140',		
			select : [
				[
					{name:'请选择触发类型',title:'triggerTypeStr'}
				]
			]
		},	
		{
			title : 'lastModifyUserName',
			name : '触发ID',
			placeholder : '触发ID',
			type : 'text'
		},	
		{
			title : '状态',
			selectName : [
				'statusStr'
			],
			name : '状态',
			type : 'select',
			cls : 'w140',		
			select : [
				[
					{name:'请选择发布状态',title:'statusStr'}
				]
			]
		}
	];
	function getList(callback){
		getData.data.all({
			callback:function(_data){
				$.each(list,function(i , obj){
					if(obj.type=='select'){
						if(obj.select[0][0].title=='triggerTypeStr'){
							obj.select[0] = [obj.select[0][0]];
							obj.select[0] = obj.select[0].concat(Tool.changeObjectName(_data.data.triggerType,[{name:'name',newName:'name'}]));
						}
						if(obj.select[0][0].title=='statusStr'){
							obj.select[0] = [obj.select[0][0]];
							obj.select[0] = obj.select[0].concat(Tool.changeObjectName(_data.data.publishStatus,[{name:'message',newName:'name'}]));
						}
					}
				})
				callback(list);
			}
		})
	}
	return getList;
})