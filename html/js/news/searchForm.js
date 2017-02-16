define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [ //表单

		{
			title : 'condition',
			name : '检索关键字',
			placeholder : '请输入关键字',
			type : 'text'
		},

		{
			title : 'author',
			name : '作者',
			placeholder : '请输入作者',
			type : 'text'
		},
		{
			title : 'startTime',
			name : '开始时间',
			placeholder : '请选择时间 年/月/日 时:分:秒',
			type : 'date'
		},
		{
			title : 'endTime',
			name : '结束时间',
			placeholder : '请选择时间 年/月/日 时:分:秒',
			type : 'date'
		},
		{
			title : 'source',
			name : '来源',
			placeholder : '请输入来源',
			type : 'text'
		},				
		{
			title : 'channelId',
			selectName : [
				'categoryId',
				'channelId',
				'columnId'
			],
			name : '选择频道栏目',
			type : 'select',
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
		}
	];
	function getList(callback){
		getData.category.listCategory({//部门
			callback:function(_data){
				$.each(list,function(i , obj){
					if(obj.type=='select'){
						if(obj.select[0][0].title=='categoryId'){
							obj.select[0] = [obj.select[0][0]];
							obj.select[0] = obj.select[0].concat(Tool.changeObjectName(_data.data,[{name:'categoryName',newName:'name'}]));
							callback(list);
						}
					}
				})
			}
		});
	}
	return getList;
})