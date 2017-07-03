define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [ //表单
		{
			title : 'columnName',
			name : '栏目名',
			placeholder : '请输入栏目名称',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		},
		
		{
			title : 'path',
			name : '自定义相对路径',
			placeholder : '请输入自定义生成相对路径',
			type : 'text',
			//verify : 'path'
		},{
			title : 'fileName',
			name : '自定义文件名',
			placeholder : '请输入自定义生成文件名',
			type : 'text',
			//verify : 'html'	
		},{
			title : 'publishUrl',
			name : '地址维护',
			placeholder : '请输入自定义跳转地址',
			type : 'text',
			//verify : 'http'	
		},
		{
			title : 'keywords',
			name : '关键字',
			placeholder : '请输入栏目名称',
			type : 'text'
		},
		{
			title : 'description',
			name : '描述',
			placeholder : '描述',
			type : 'textarea' //text textarea radio checkbox edit
		},
		{
			title : 'column',
			selectName : ['channelId'],
			name : '请选择频道分类',
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择频道分类',title:'channelId'}
				]
			]
		},
		/*[
			{
				title : 'listId',
				selectName : ['listId'],
				name : '预模版list',
				type : 'select',
				select : [
					[
						{name:'请选择预模版list',title:'listId'}
					]
				]
			},
			{
				title : 'detailId',
				selectName : ['detailId'],
				name : '预模版detail',
				type : 'select',
				select : [
					[
						{name:'请选择预模版detail',title:'detailId'}
					]
				]
			}
		],*/
		[
			{
				title : 'listTemplate2Id',
				selectName : ['listTemplate2Id'],
				name : '第二套模版list',
				type : 'select',
				select : [
					[
						{name:'请选择第二套模版list',title:'listTemplate2Id'}
					]
				]
			},
			{
				title : 'detailTemplate2Id',
				selectName : ['detailTemplate2Id'],
				name : '第二套模版detail',
				type : 'select',
				select : [
					[
						{name:'请选择第二套模版detail',title:'detailTemplate2Id'}
					]
				]
			}
		]
	]
	function getList(callback){
		getData.channel.listChannel({//部门
			callback:function(_data){
				getData.pretemplate.listTemplate2list({//第二套模版list
					callback : function( _data1 ){
						getData.pretemplate.listTemplate2detail({//第二套模版detail
							callback : function( _data2 ){
								$.each(list,function(i , obj){
									if(obj.title=='column'){ //填充select
										obj.select[0] = [obj.select[0][0]];
										obj.select[0] = obj.select[0].concat(Tool.changeObjectName(_data.data,[{name:'channelName',newName:'name'}]));
									}
									if( $.type(obj) == 'array' ){
										$.each(obj,function(j,_obj){ //填充select
											if(_obj.title=='listTemplate2Id'){
												_obj.select[0] = [_obj.select[0][0]];
												_obj.select[0] = _obj.select[0].concat(Tool.changeObjectName(_data1.data,[{name:'templateName',newName:'name'}]));
											}
											else if(_obj.title=='detailTemplate2Id'){ //填充select
												_obj.select[0] = [_obj.select[0][0]];
												_obj.select[0] = _obj.select[0].concat(Tool.changeObjectName(_data2.data,[{name:'templateName',newName:'name'}]));
											}
										})
									}
								})
								callback(list);
							}
						});
					}
				})

			}
		});
	}
	return getList;
})