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
		data : { //基础接口
			compress : '/data/compress',//图片是否压缩选项列表接口
			compressMode : '/data/compressMode',//按照宽｜高等比压缩选项接口
			encoded : '/data/encoded',//模版支持的编码选项列表
			job : '/data/job',//模版生成方式选项列表
			permissionType : '/data/permissionType',//权限类型选项列表
			relationType : '/data/relationType',//模版关系对应类型选项列表
			showFlag : '/data/showFlag',//权限是否显示在左侧选项列表
			templateClassify : '/data/templateClassify',//模版类型选项列表
			watermark : '/data/watermark',//图片是否水印选项列表
			buildMode : '/data/buildMode'
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
		},
		video : {//获取视频基础库
			videoBase : '/video/videoBase',//获取视频基础库
			updateVideoBase : '/video/updateVideoBase',//修改图片基础信息
			createVideoBase : '/video/createVideoBase',//创建视频
			createVideo : '/video/createVideo',//创建Video 接口
			updateVideo : '/video/updateVideo',//修改Video 接口
			delVideo : '/video/delVideo',//删除视频 接口
			videolist : '/video/videolist'//获取视频列表 接口
		},
		template : {
			listTemplate : '/template/listTemplate',//模版列表［分页］
			templateInfo : '/template/templateInfo',//模版详细信息
			delTemplate : '/template/delTemplate',//删除模版
			updateTemplate : '/template/updateTemplate',//模版修改 
			createTemplate : '/template/createTemplate',//创建新模版
			uploadTemplate : '/template/uploadTemplate',//模版上传
			downTemplate : '/template/downTemplate',//模版上传
			relation : '/template/relation',//模版上传
			updateRelations : '/template/updateRelations',//根据relationType 修改模版对应关系
			createRelation : '/template/createRelation',//新增模版关系
			delRelation : '/template/delRelation',//模版关系删除
			redirect : '/template/redirect'//模版跳转
		}
	}
})