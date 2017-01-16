define(function(){
	return [ //表单
		{
			title : 'title',
			name : '上传图片',
			type : 'file', //text textarea radio checkbox edit
			typeName : 'images'
		},
		{
			title : 'title',
			name : '标题',
			type : 'text',
			placeholder : '图片标题',
			verify : 'title'
		},
		{
			title : 'watermark',
			name : '是否水印',
			type : 'radio',
			radio : [
				{
					title : 'yes',
					name : '是' , 
					checked : true
				},
				{
					title : 'no',
					name : '否'
				}
			]
		}
	];
})