define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [ //表单
		/*{
			title : 'upload',
			name : '上传视频',
			cls : 'uploadVideo',
			fileType : 'video',
			type : 'upload' //text textarea radio checkbox edit
		},*/
		{
			title : 'upload',
			name : '上传视频',
			type : 'file', //text textarea radio checkbox edit			
			typeName : 'video',
			verify : 'useless'
		},
		{
			title : 'videoTitle',
			name : '视频标题',
			placeholder : '请输入视频标题',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		},
		{
			title : 'videoClassifyId',
			selectName : ['videoClassifyId'],
			name : '选择视频分类',
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择视频分类',title:'videoClassifyId'}
				]
			]
		},
		{
			title : 'keyword',
			name : '关键词',
			placeholder : '请填写关键词以","区分',
			type : 'text'
		},
		{
			title : 'videoDesc',
			name : '视频描述',
			placeholder : '请输入视频描述',
			type : 'textarea', //text textarea radio checkbox edit
			verify : 'title'
		}		
	]
	function getList(callback){
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
	return getList;
})