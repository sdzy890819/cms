define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [ //表单
		{
			title : 'templateName',
			name : '模版名称',
			type : 'text', //text textarea radio checkbox edit
			placeholder : '请输模版名称',
			verify : 'title'
		},
		{
			title : 'templateDesc',
			name : '模版说明',
			placeholder : '请输模版入说明',
			type : 'textarea' //text textarea radio checkbox edit
		},
		[
			{
				title : 'filename',
				name : '发布文件名',
				type : 'text',
				placeholder : '请输入模版发布时显示的文件名',
				verify : 'required'
			},
			{
				title : 'path',
				name : '发布目录',
				placeholder : '请输入模版发布目录',
				type : 'text', //text textarea radio checkbox edit
				verify : 'path'
			}
		],
		[
			{
				title : 'templateClassify',
				selectName : ['templateClassify'],
				name : '选择模版',
				type : 'select',
				verify : 'select',
				select : [
					[
						{name:'请选择选择模版',title:'templateClassify'}
					]
				]
			},
			{
				title : 'channelId',
				selectName : ['channelId'],
				name : '选择频道',
				type : 'select',
				verify : 'select',
				select : [
					[
						{name:'请选择频道',title:'channelId'}
					]
				]
			}
		],
		[
			{
				title : 'encoded',
				name : '编码',
				type : 'radio',
				radio : []
			},
			{
				title : 'sortNum',
				name : '排序',
				placeholder : '请输入排序',
				type : 'text', //text textarea radio checkbox edit
				pattern : '/\\d+/',
				verify : 'number'
			}
		],
		{
			title : 'job',
			name : '生成方式',
			type : 'radio',
			radio : []
		}
	];
	function setData(obj){
		var self = obj.self;
		if(self.type=='select'){

			if(self.select[0][0].title== obj.name && obj.name == 'templateClassify'){
				self.select[0] = [self.select[0][0]];
				self.select[0] = self.select[0].concat(Tool.changeObjectName(obj.data.templateClassify,[{name:'type',newName:'id'}]));
			}else if(self.select[0][0].title==obj.name && obj.name =='channelId'){
				self.select[0] = [self.select[0][0]];
				//self.select[0] = self.select[0].concat(obj.data);
				self.select[0] = self.select[0].concat(Tool.changeObjectName(obj.data,[{name:'channelName',newName:'name'}]));
			}
		}else if(self.type=='radio' && obj.name == 'templateClassify'){			
			if(self.title=='encoded'){
				self.radio = Tool.changeObjectName(obj.data.encoded,[{name:'name',newName:'title'}]);
				self.radio[0].checked = true;
			}else if(self.title=='job'){
				self.radio = Tool.changeObjectName(obj.data.job,[{name:'name',newName:'title'}]);
				self.radio[0].checked = true;
			}
		}
	};
	return function(callback){
		getData.data.all({
			callback : function(_data){
				getData.channel.listChannel({
					callback:function( _data1 ){
						$.each(list,function(i , obj){
							if($.type(obj)=='array'){
								$.each(obj,function(){
									setData({
										self : this,
										data : _data.data ,
										name : 'templateClassify'
									});
									setData({
										self : this,
										data : _data1.data ,
										name : 'channelId'
									});
								})
							}else{
								setData({
									self : this,
									data : _data.data ,
									name : 'templateClassify'
								});
								setData({
									self : this,
									data : _data1.data ,
									name : 'channelId'
								});
							}

						})
						callback(list);
					}
				})
			}
		})
	};
})