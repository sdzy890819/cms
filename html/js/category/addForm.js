define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [ //表单
		{
			title : 'categoryName',
			name : '分类名',
			placeholder : '请输入分类名称',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		},
		{
			title : 'categoryDesc',
			name : '分类说明',
			type : 'textarea',
			verify : 'title'
		}
	];

	function getList(callback){
		getData.category.listCategory({//部门
			callback:function(_data){
				$.each(list,function(i , obj){
					callback(list);
				})
			}
		});

		// callback(list);
		
	}
	return getList;	
})