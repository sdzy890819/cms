define(function(){
	return [ //表单
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
			typeName : 'video'
		},
		{
			title : 'videoTitle',
			name : '视频标题',
			placeholder : '请输入视频标题',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		},
		{
			title : 'videoDesc',
			name : '视频描述',
			placeholder : '请输入视频描述',
			type : 'textarea', //text textarea radio checkbox edit
			verify : 'title'
		}		
	]
})