define(function(){
	return [ //表单
		{
			title : 'fragmentClassifyId',
			name : '碎片分类ID',
			type : 'text', //text textarea radio checkbox edit
			placeholder : '请输入专题标题',
			verify : 'title'
		},
		{
			title : 'fragmentName',
			name : '碎片名称',
			placeholder : '请输入视频标题',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		},
		{
			title : 'sortNum',
			name : '排序值',
			type : 'text',
			verify : 'number'
		},
		{
			title : 'fragmentModel',
			name : '上传碎片模版',
			cls : 'uploadFragment',
			fileType : 'file',
			ext : 'html|htm|shtml',
			type : 'upload', //text textarea radio checkbox edit
			verify : 'upload'
		}
	]
})