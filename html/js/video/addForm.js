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
			title : 'title',
			name : '视频标题',
			placeholder : '请输入视频标题',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		},
		{
			title : 'videoDesc',
			name : '视频说明',
			type : 'textarea',
			placeholder : '请输入视频说明'
		},
		{
			title : 'videoUrl',
			name : '视频链接URL',
			placeholder : '请输入视频链接URL',
			type : 'text', //text textarea radio checkbox edit
			verify : 'http'
		},
		{
			title : 'videoPath',
			name : '视频相对路径',
			placeholder : '请输入视频相对路径',
			type : 'text', //text textarea radio checkbox edit
			verify : 'path'
		}
	]
})