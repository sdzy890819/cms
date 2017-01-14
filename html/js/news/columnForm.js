define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [ //表单
		{
			name : '栏目名',
			placeholder : '请输入栏目名称',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		},
		{
			title : 'column',
			selectName : ['columnId'],
			name : '请选择频道分类',
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择频道分类',title:'columnId'}
				]
			]
		}
	]
	function getList(callback){
		getData.channel.listChannel({//部门
			callback:function(_data){
				$.each(list,function(i , obj){
					if(obj.type=='select'){
						obj.select[0] = obj.select[0].concat(Tool.changeObjectName(_data.data,[{name:'channelName',newName:'name'}]));
						callback(list);
					}
				})
			}
		});
	}
	return getList;
})