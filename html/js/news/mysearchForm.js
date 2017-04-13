define(function(getData,Tool){
	var list = [ //表单
		{
			title : 'publish',
			selectName : [
				'publish'
			],
			name : '发布状态',
			type : 'select',
			select : [
				[
					{						
						name : '全部'						
					},				
					{
						title : 0,
						name : '未发布'						
					},
					{
						title : 1,
						name : '已发布'
					},
					{
						title : 2,
						name : '草稿'
					},
					{
						title : 3,
						name : '已撤销'
					}				
				]
			]
		}

	];

	function getList(callback){
		callback(list);
	}

	return getList;
})