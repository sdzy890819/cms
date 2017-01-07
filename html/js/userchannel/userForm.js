define(function(){
	return [ //表单
		{
			title : 'topicTitle',
			name : '请选择用户',
			type : 'text', //text textarea radio checkbox edit
			placeholder : '请输入专题标题',
			verify : 'title'
		},
		{
			title : 'topicContent',
			name : '专题内容',
			placeholder : '请输入视频标题',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		}
	]
})