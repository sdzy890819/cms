define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [ //表单
		{
			title : 'templateName',
			name : '模版名称',
			type : 'text', //text textarea radio checkbox edit
			placeholder : '请输模版名称',
			verify : 'title'
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
		{
			title : 'templateClassify',
			selectName : ['templateClassify'],
			name : '模版分类',
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'模版分类',title:'templateClassify'}
				]
			]
		},
		{
			title : 'encoded',
			name : '编码',
			type : 'radio',
			radio : []
		}
	];
	function setData(obj){
		var self = obj.self;
		var template2Classify = [];

		$.each(obj.data.templateClassify, function(i, o){			
			if (o.name == '列表页' || o.name == '详情页') {
				template2Classify.push(o);
			}
		})

		if(self.type=='select'){
			self.select[0] = [self.select[0][0]];
			self.select[0] = self.select[0].concat(Tool.changeObjectName(template2Classify,[{name:'type',newName:'id'}]));
		}else if(self.type=='radio'){
			self.radio = Tool.changeObjectName(obj.data.encoded,[{name:'name',newName:'title'}]);
			self.radio[0].checked = true;
		}
	};
	return function(callback){
		getData.data.all({
			callback : function(_data){
				$.each(list,function(i , obj){
					if($.type(obj)=='array'){
						$.each(obj,function(){
							setData({
								self : this,
								data : _data.data 
							});
						})
					}else{
						setData({
							self : this,
							data : _data.data 
						});
					}

				})
				callback(list);
			}
		})
	};
})