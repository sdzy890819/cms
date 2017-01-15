define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list =  [ //表单
		{
			title : 'topicTitle',
			name : '专题标题',
			type : 'text', //text textarea radio checkbox edit
			placeholder : '请输入专题标题',
			verify : 'title'
		},
		{
			title : 'topicContent',
			name : '专题内容',
			placeholder : '请输入视频标题',
			type : 'textarea' //text textarea radio checkbox edit
		},
		{
			title : 'topicPath',
			name : '专题相对路径',
			type : 'text',
			placeholder : '请输入视频说明'
		},
		{
			title : 'topicFilename',
			name : '专题文件名',
			placeholder : '请输入专题文件名',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
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
				verify : 'select',
				select : [
					[
						{name:'请选择专题栏目',title:'topicColumnId'}
					]
				]
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
				title : 'releaseTime',
				name : '发布时间',
				placeholder : '请选择时间 年/月/日 时:分:秒',
				type : 'date'
			},
			{
				title : 'keyword',
				name : '关键字',
				placeholder : '请输入关键字以“,”间隔',
				type : 'text'
			}
		],
		{
			title : 'description',
			name : '描述',
			placeholder : '请输入关键字以“,”间隔',
			type : 'text'
		}
	];
	function setData(obj){
		var self = obj.self;
		if(self.type=='select'){
			if(self.select[0][0].title==obj.title){
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
												self : this,
												title : 'topicColumnId',
												data : _data ,
												changeName : 'columnName'
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