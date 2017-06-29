define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [ //表单
		[
			{
				title : 'title',
				name : '标题',
				placeholder : '请输入标题',
				type : 'text', //text textarea radio checkbox edit
				cls : 'w450',
				verify : 'title'
			},
			{
				title : 'subTitle',
				name : '附标题',
				placeholder : '请输入附标题',
				type : 'text',
				cls : 'w450',
				check : false			
			}
		],
		[
			{
				title : 'keyword',
				name : '关键字',
				placeholder : '关键字之间以 “,” 隔开',
				type : 'text',
				verify : 'required'
			},
			{
				title : 'author',
				name : '作者',
				placeholder : '请输入作者',
				type : 'text',
				//verify : 'required'
			},
			{
				title : 'source',
				name : '来源',
				placeholder : '请输入作者来源',
				type : 'text',
				verify : 'required'
			},
			{
				title : 'stock',
				name : '股票代码',
				placeholder : '股票代码',
				type : 'text'
				//verify : 'required'
			}
		],
		[
			{
				title : 'description',
				name : '描述',
				cls : 'w320',
				placeholder : '描述',
				type : 'textarea',
				check : false
			},
			{
				title : 'push',
				fromName : '推送栏目',
				toName : '已推送',
				type : 'selectSize',
				fromSelect : [],
				toSelect : []
			}
		],
		{
			title : 'channelId',
			selectName : [
				'categoryId',
				'channelId',
				'columnId'
			],
			name : '选择频道栏目',
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择部门',title:'categoryId'}
				],
				[
					{name:'请选择频道',title:'channelId'}
				],
				[
					{name:'请选择栏目',title:'columnId'}
				]
			]
		},
		{
			title : 'content',
			cls : 'newsEdit',
			name : '内容',
			width : '1100px',
			height : '600px',
			type : 'edit',
			verify : 'title'
		},
		[
			{
				title : 'editPublishTime',
				name : '撰写时间',
				placeholder : '请选择时间 年/月/日 时:分:秒',
				type : 'date',
				check : false
			},
			{
				title : 'timer',
				name : '定时发布',
				placeholder : '请选择时间 年/月/日 时:分:秒',
				type : 'date',
				check : false
			},	
			{
				title : 'show',
				name : '是否发布',
				type : 'radio',
				radio : [
					{
						title : 'no',
						name : '否'
					},
					{
						title : 'yes',
						name : '是' , 
						checked : true
					}
				]
			}
		],
		{
			title : 'field1',
			name : '扩展字段',
			placeholder : '请输入扩展字段内容',
			num : 1, //当前为第1条
			inputMaxNum : 5,
			type : 'text'
		}
	];
	function getList(callback){
		getData.category.listCategory({//部门
			callback:function(_data){
				getData.news.relationColumnList({
					callback:function(_data1){
						$.each(list,function(i , obj){
							if($.type(obj)=='array'){
								$.each(obj,function(i , obj1){
									if(obj1.type=='selectSize'){
										var arr = [];
										$.each(_data1.data,function( i , _arr ){
											$.each(_arr.list,function( j , _arr1){
												arr.push({
													id : _arr.channel.id+'-'+_arr1.id,
													name : _arr.channel.channelName+'—'+_arr1.columnName,
													parent : _arr.channel,
													child : _arr1
												})
											})
										})
										obj1.fromSelect = arr;
										//obj1.fromSelect = Tool.changeObjectName(_data1.data[0].list,[{name:'columnName',newName:'name'}]);
									}
								})
							}else if(obj.type=='select'){
								if(obj.select[0][0].title=='categoryId'){
									obj.select[0] = [obj.select[0][0]];
									obj.select[0] = obj.select[0].concat(Tool.changeObjectName(_data.data,[{name:'categoryName',newName:'name'}]));
								}
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