define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [
		{
			title : 'condition',
			name : '关键字',
			placeholder : '请输入关键字',
			type : 'text'
		},
		{
			title : 'videoClassifyId',
			selectName : ['videoClassifyId'],
			name : '选择视频分类',
			type : 'select',
			select : [
				[
					{name:'请选择视频分类',title:'videoClassifyId'}
				]
			]
		}
	];
	return function(callback){
		getData.video.videoclassifyalllist({
			callback:function(_data){
				$.each(list,function(i,obj){
					if(obj.type=='select' && obj.select[0][0].title=='videoClassifyId'){
						obj.select[0] = [obj.select[0][0]];
						obj.select[0] = obj.select[0].concat(Tool.changeObjectName(_data.data,[{name:'classifyName',newName:'name'}]));
					}
				})
	 			callback(list);
			}
		});
	}
})