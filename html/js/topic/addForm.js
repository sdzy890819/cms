define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list =  [ //表单
		{
			title : 'topicTitle',
			name : '专题标题',
			type : 'text', //text textarea radio checkbox edit
			placeholder : '请输入专题标题',
			verify : 'title'
		},
		[
			{
				title : 'topicPath',
				name : '发布目录',
				type : 'text',
				placeholder : '例如：/list/',
				verify : 'path'
			},
			{
				title : 'topicFilename',
				name : '专题文件名',
				placeholder : '例如: index.html',
				type : 'text', //text textarea radio checkbox edit
				verify : 'html'
			}
		],
		{
			title : 'channelId',
			selectName : ['categoryId','channelId'],
			name : '请选择分类',
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择部门类别',title:'categoryId'}
				],
				[
					{name:'请选择频道类别',title:'channelId'}
				]
			]
		},
		[
			{
				title : 'topicClassifyId',
				selectName : ['topicClassifyId'],
				name : '专题分类',
				type : 'select',
				verify : 'select',
				select : [
					[
						{name:'请选择专题分类',title:'topicClassifyId'}
					]
				]
			},
			{
				title : 'topicColumnId',
				selectName : ['topicColumnId'],
				name : '系列专题',
				type : 'select',				
				select : [
					[
						{name:'请选择专题栏目',title:'topicColumnId'}
					]
				]
			}
		],
		[
			{
				title : 'releaseTime',
				name : '发布时间',
				placeholder : '请选择时间 YYYY-MM-DD ',
				type : 'date',
				verify : 'title'
			},
			{
				title : 'keyword',
				name : '关键字',
				placeholder : '请输入关键字以“,”间隔',
				type : 'text',
				verify : 'title'
			}
		],
		{
			title : 'description',
			name : '描述',
			placeholder : '请输入描述',
			type : 'textarea'
		},
		{
			title : 'topicContent',
			name : '内容',
			height : 100,
			placeholder : '请输入内容',
			type : 'textarea',
			verify : 'title'
		}
	];
	function setData(obj){
		var self = obj.self;
		if(self.type=='select'){
			if(self.select[0][0].title==obj.title){
				self.select[0] = [self.select[0][0]];
				self.select[0] = self.select[0].concat(Tool.changeObjectName(obj.data.data,[{name:obj.changeName,newName:'name'}]));
			}
		}
	}
	function getList(callback){
		getData.topic.topicColumnList({//系列专题是。topicColumn
			callback:function(_data){
				getData.topic.topicClassifyList({//专题分类 topicClassifyId
					callback : function( _data1 ){
						getData.category.listCategory({//获取部门分类列表 categoryId
							callback : function( _data2 ){
								$.each(list,function(i , obj){
									if($.type(obj)=='array'){
										$.each(obj,function(){
											setData({
												self : this, //对像本身
												title : 'topicColumnId', //需要添加到arr的，title名称
												data : _data , //数据
												changeName : 'columnName' //需要显示字段的 name 名称
											});
											setData({
												self : this,
												title : 'topicClassifyId',
												data : _data1 ,
												changeName : 'classifyName'
											});
											setData({
												self : this,
												title : 'categoryId',
												data : _data2 ,
												changeName : 'categoryName'
											});
										})
									}else{
										setData({
											self : this,
											title : 'topicColumnId',
											data : _data ,
											changeName : 'classifyName'
										});
										setData({
											self : this,
											title : 'topicClassifyId',
											data : _data1 ,
											changeName : 'classifyName'
										});
										setData({
											self : this,
											title : 'categoryId',
											data : _data2 ,
											changeName : 'categoryName'
										});
									}

								})
								callback(list);
							}
						});
					}
				});

			}
		});
	}
	return getList;
})