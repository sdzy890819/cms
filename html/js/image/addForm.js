define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list = [ //表单
		{
			title : 'title',
			name : '图片标题',
			placeholder : '请填写图片标题',
			type : 'text',
			verify : 'imageTitle'
		},
		{
			title : 'imagesClassifyId',
			selectName : ['imagesClassifyId'],
			name : '选择图片分类',
			type : 'select',
			verify : 'select',
			select : [
				[
					{name:'请选择图片分类',title:'imagesClassifyId'}
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
			title : 'isSize',
			name : '是否等比缩放',
			type : 'radio',
			radio : [
				{
					title : 'yes',
					name : '是'
					//checked : true
				},
				{
					title : 'no',
					name : '否',
					checked : true
				}
			]
		},
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
			title : 'imageWidth',
			name : '图片宽度',
			placeholder : '请填写图片宽度',
			type : 'text',//text textarea radio checkbox edit						
			verify : 'useless'
		},
		{
			title : 'imageHeight',
			name : '图片高度',
			placeholder : '请填写图片高度',
			type : 'text', //text textarea radio checkbox edit			
			verify : 'useless'
		},
		{
			title : 'imageUrl',
			name : '上传图片',
			type : 'file', //text textarea radio checkbox edit
			typeName : 'images',
			verify : 'image'
		}		
	];

	 function getList(callback){
	 	getData.image.imagesclassifyalllist({
			callback:function(_data){
				$.each(list,function(i,obj){
					if(obj.type=='select' && obj.select[0][0].title=='imagesClassifyId'){
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