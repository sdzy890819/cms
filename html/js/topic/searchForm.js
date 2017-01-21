define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list =  [ //表单
		{
			title : 'condition',
			name : '检索关键字',
			placeholder : '请输入关键字',
			type : 'text'
		},
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
		},
		{
			title : 'releaseTime',
			name : '发布时间',
			placeholder : '请选择时间 年/月/日 时:分:秒',
			type : 'date'
		},
		{
			title : 'startTime',
			name : '开始创建时间',
			placeholder : '请选择时间 年/月/日 时:分:秒',
			type : 'date'
		},
		{
			title : 'endTime',
			name : '结束创建时间',
			placeholder : '请选择时间 年/月/日 时:分:秒',
			type : 'date'
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