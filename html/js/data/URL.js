define(function(require){
	var url = '';
	return {
		user : {
			login : url+'/user/login',
			loginOut : url+'/user/loginOut',
			userlist : url+'/user/userlist',//用户列表接口
			currentUser : url+'/user/currentUser',//当前登录用户信息接口
			createUser : url+'/user/createUser',//创建用户接口
			updateUser : url+'/user/updateUser',//用户修改接口
			delUser : url+'/user/delUser'//逻辑删除
		},
		permission : { //权限
			listPermission : url+'/permission/listPermission',
			listPositionPermission : url+'/permission/listPositionPermission',
			createPermission : url+'/permission/createPermission',
			updatePermission : url+'/permission/updatePermission',//权限修改
			delPermission : url+'/permission/delPermission',//权限删除
			setPositionPermissions : url+'/permission/setPositionPermissions',//批量设置用户组的权限
			createPositionPermission : url+'/permission/createPositionPermission',//单个设置用户组权限
			delPositionPermission : url+'/permission/delPositionPermission',//删除用户组权限
			currentMenuPermission : url+'/permission/currentMenuPermission',//获取用户拥有的菜单栏权限 接口
			currentButtonPermission : url+'/permission/currentButtonPermission'//用户Menu下的Button权限
		},
		news : {
			newscolumnlist : url+'/newscolumn/newscolumnlist', //栏目列表
			createNewsColumn : url+'/newscolumn/createNewsColumn',//创建栏目
			delNewsColumn : url+'/newscolumn/delNewsColumn',//删除栏目
			newslist : url+'/news/newslist',//新闻列表
			newsdetail : url+'/news/newsdetail',//新闻详细信息
			delNews : url+'/news/delNews',//删除新闻
			createNews : url+'/news/createNews',//创建新闻
			updateNews : url+'/news/updateNews',//修改新闻
			publish : url+'/news/publish'//新闻发布
		},
		category : {//部门分类
			listCategory : url+'/category/listCategory', //获取部门分类列表
			createCategory : url+'/category/createCategory', 
			updateCategory : url+'/category/updateCategory', 
			delCategory : url+'/category/delCategory'
		},
		channel : { //获取频道分类列表
			listChannel : url+'/channel/listChannel' , 
			createChannel : url+'/channel/createChannel' , 
			updateChannel : url+'/channel/updateChannel' , 
			delChannel : url+'/channel/delChannel' , 
			channelListForCategory : url+'/channel/channelListForCategory' , 
			channelInfo : url+'/channel/channelInfo' , 
			currentChannelList : url+'/channel/currentChannelList' 
		},
		upload : {//上传相关
			uploadImage : '/upload/uploadImage' //上传图片接口
		},
		images : {//图片
			imageslist : url+'/images/imageslist',
			delImages : url+'/images/delImages',
			updateImages : url+'/images/updateImages', //上传图片修改
			createImages : url+'/images/createImages',
			createImagesBase : url+'/images/createImagesBase',
			updateImagesBase : url+'/images/updateImagesBase', //修改图片基础信息
			imagesBase : url+'/images/imagesBase'
		}
	}
})