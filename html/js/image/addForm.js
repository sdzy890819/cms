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
		},
		[
			{
				title : 'selectSize',
				name : '等比缩放选择',
				type : 'radio',
				radio : [
					{
						title : 'yes',
						name : '宽' , 
						checked : true
					},
					{
						title : 'no',
						name : '高'
					}
				]
			},
			{
				title : 'size',
				name : '宽/高尺寸',
				placeholder : '请填写尺寸',
				type : 'text', //text textarea radio checkbox edit
				verify : 'number'
			}
		]
	];
})