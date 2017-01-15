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
	function setData(obj,name,_data){
		if(obj.type=='select'){
			if(obj.select[0][0].title==name){
				obj.select[0] = obj.select[0].concat(Tool.changeObjectName(_data.data,[{name:'columnName',newName:'name'}]));
			}
		}
	}
	function getList(callback){
		getData.topic.topicColumnList({//系列专题是。topicColumn
			callback:function(_data){
				$.each(list,function(i , obj){
					if($.type(obj)=='array'){
						$.each(obj,function(){
							setData(this,'topicColumnId',_data);
						})
					}else{
						setData(obj,'topicColumnId',_data);
					}
				});
				getData.topic.topicClassifyList({//专题分类 topicClassifyId
					callback : function( _data1 ){
						$.each(list,function(i , obj){
							if($.type(obj)=='array'){
								$.each(obj,function(){
									setData(this,'topicClassifyId',_data1);
								})
							}else{
								setData(obj,'topicClassifyId',_data1);
							}
						})
						callback(list);
					}
				});

			}
		});
	}
	return getList;
})