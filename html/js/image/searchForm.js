define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [
		{
			title : 'condition',
			name : '检索关键字',
			placeholder : '请输入关键字',
			type : 'text'
		},
		{
			title : 'imagesClassifyId',
			selectName : ['imagesClassifyId'],
			name : '选择图片分类',
			type : 'select',
			select : [
				[
					{name:'请选择图片分类',title:'imagesClassifyId'}
				]
			]
		}
	]
	return function(callback){
		getData.image.imagesclassifyalllist({
			callback:function(_data){
				$.each(list,function(i,obj){
					if(obj.type=='select' && obj.select[0][0].title=='imagesClassifyId'){
						obj.select[0] = [obj.select[0][0]];
						obj.select[0] = obj.select[0].concat(Tool.changeObjectName(_data.data,[{name:'classifyName',newName:'name'}]));
					}
				})
	 			callback(list);
			}
		});
	}
})