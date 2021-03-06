define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [ //表单
		{
			title : 'channelName',
			name : '频道名称',
			type : 'text', //text textarea radio checkbox edit
			placeholder : '请输入频道名称',
			verify : 'title'
		},
		{
			title : 'channelUrl',
			name : '频道域名',
			placeholder : '例如：http://www.p5w.net/',
			type : 'text', //text textarea radio checkbox edit
			verify : 'http'	
		},
		{
			title : 'rsyncModelName',
			name : 'rsync模板名',
			type : 'text',
			placeholder : 'rsync模块名'			
		},
		{
			title : 'channelPath',
			name : '频道绝对路径',
			type : 'text',
			placeholder : '例如：/data/publish ',
			verify : 'path'	
		},
		{
			title : 'templatePath',
			name : '模板位置',
			placeholder : '例如/data/template',
			type : 'text', //text textarea radio checkbox edit			
			verify : 'path'	
		},
		{
			title : 'channelDesc',
			name : '频道说明',
			placeholder : '请输入频道说明',
			type : 'textarea', //text textarea radio checkbox edit			
			verify : 'title'
		},

		{
			title : 'category',
			name : '部门分类',
			selectName : ['categoryId'],
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择部门分类',title : 'categoryId'}
				]
			]
		}
	];
	function getList(callback){

		getData.category.listCategory({//专题分类
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