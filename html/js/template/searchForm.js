define(['../data/getData','../moduls/Tool'],function(getData,Tool){
	var list =  [ //表单
		{
			title : 'condition',
			name : '检索关键字',
			placeholder : '请输入关键字',
			type : 'text'
		},
		{
			title : 'channelId',
			selectName : ['channelId'],
			name : '频道分类',
			type : 'select',
			select : [
				[
					{name:'请选择频道分类',title:'channelId'}
				]
			]
		}
	];
	function setData(obj){
		var self = obj.self;
		if(self.type=='select'){
			if(self.select[0][0].title==obj.title){
				self.select[0] = [self.select[0][0]];
				self.select[0] = self.select[0].concat(Tool.changeObjectName(obj.data.data,[{name:obj.changeName,newName:'name'}]));
			}
		}
	}
	function getList(callback){
		getData.channel.listChannel({//系列专题是。topicColumn
			callback:function(_data){
				$.each(list,function(i , obj){
					if($.type(obj)=='array'){
						$.each(obj,function(){
							setData({
								self : this, //对像本身
								title : 'channelId', //需要添加到arr的，title名称
								data : _data , //数据
								changeName : 'channelName' //需要显示字段的 name 名称
							})
						})
					}else{
						setData({
							self : this,
							title : 'channelId',
							data : _data ,
							changeName : 'channelName'
						})
					}
				})
				callback(list);
			}
		});				
	}
	return getList;
})