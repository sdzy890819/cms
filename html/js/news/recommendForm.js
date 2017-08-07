define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [ //表单
		{
			title : 'recommendColumnId',
			selectName : [
				'recommendColumnId'
			],
			name : '选择推荐栏目',
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择推荐栏目',title:'recommendColumnId'}
				]
			]
		},
		{
			title : 'recommendTitle',
			name : '推荐标题',
			placeholder : '请输入推荐标题',
			type : 'text',
			verify : 'title'
		},
		
		{
			title : 'recommendDescription',
			name : '描述',
			placeholder : '描述',
			type : 'textarea',
			check : false
		},

		{
			title : 'recommendImages',			
			name : '图片URL',
			placeholder : '图片URL',
			type : 'text'			
		},
		{
			title : 'imageUrl',
			name : '上传图片',
			type : 'file', //text textarea radio checkbox edit
			typeName : 'images',
			verify : 'image'
		}
		/*{
			title : 'sort',
			name : '排序值',
			placeholder : '排序值',
			type : 'text',
			verify : 'number'
		}*/
	];
	
	function getList(callback){
		getData.news.recommendColumnlist({//部门
			callback:function(_data){
				$.each(list,function(i , obj){
					if(obj.type=='select'){
						if(obj.select[0][0].title=='recommendColumnId'){
							obj.select[0] = [obj.select[0][0]];
							obj.select[0] = obj.select[0].concat(Tool.changeObjectName(_data.data,[{name:'columnName',newName:'name'}]));

							callback(list);
						}
					}
				})
			}
		});
	}
	return getList;
})