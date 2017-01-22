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