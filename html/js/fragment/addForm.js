define(['../data/getData','../moduls/Tool'], function(Data, Tool){
	var list = [ //表单
		{
			title : 'channelId',
			selectName : [
				'channelId'
			],
			name : '选择频道',
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择频道',title:'channelId'}
				]
			]
		},
		{
			title : 'fragmentClassifyId',
			selectName : [
				'fragmentClassifyId'
			],
			name : '选择碎片分类',
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择碎片',title:'fragmentClassifyId'}
				]
			]
		},		
		{
			title : 'fragmentName',
			name : '碎片名称',
			placeholder : '请输入碎片名称',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		},

		{
			title : 'fragmentModel',
			name : '碎片模版',					
			type : 'textarea' //text textarea radio checkbox edit			
		},
		{
			title : 'sortNum',
			name : '排序值',
			type : 'text',
			verify : 'number'
		}		
	];

	function getList(callback){
		Data.channel.listChannel({//部门
			callback : function(_data){							
				$.each(list, function(i, obj){
					if (obj.title == 'channelId'){
						obj.select[0] = obj.select[0].concat(Tool.changeObjectName(_data.data,[{name:'channelName',newName:'name'}]));
					}
				})

				callback(list);
			}			
		});

		Data.fragment.listClassify({
			callback : function(_data){							
				$.each(list, function(i, obj){
					if (obj.title == 'fragmentClassifyId'){
						obj.select[0] = obj.select[0].concat(Tool.changeObjectName(_data.data,[{name:'classifyName',newName:'name'}]));	
					}
				})
				callback(list);
			}
		})
	}	
	return getList;	
})