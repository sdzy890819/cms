define(function(){
	return [ //表单
		{
			title : 'upload',
			name : '上传视频',
			cls : 'uploadVideo',
			fileType : 'video',
			type : 'upload' //text textarea radio checkbox edit
		},
		{
			title : 'fileName',
			name : '视频标题',
			placeholder : '请输入视频标题',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		}
	]
})