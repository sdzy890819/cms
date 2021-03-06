define(function(){
	return [ //表单
		{
			title : 'imageTitle',
			name : '图片标题',
			placeholder : '图片标题',
			type : 'text', //text textarea radio checkbox edit
			verify : 'title'
		},
		{
			title : 'imageUrl',
			name : '图片地址',
			placeholder : '图片地址',
			type : 'text', //text textarea radio checkbox edit
			verify : 'path'
		},
		[
			{
				title : 'selectSize',
				name : '原图等比缩放',
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
		],
		[
			{
				title : 'selectSize',
				name : '小图等比缩放',
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
		],
		{
			title : 'imagePath',
			name : '图片相对路径',
			placeholder : '图片相对路径',
			type : 'text',
			verify : 'path'
		},
		[
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
			{
				title : 'compress',
				name : '是否压缩',
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
		]
	];
})