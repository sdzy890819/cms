define(['./URL','jquery','./getInitInfo'],function(URL,$, initInfo){
	var T = {
		getdata : function( obj ){
			if(obj.data){
				obj.data.time = new Date().getTime()+Math.random()*9999;
			}else{
				obj.data = {
					time : new Date().getTime()+Math.random()*9999
				}
			}
			layui.use(['layer'], function(){
				var loadding;
				if(obj.loadding!=false){
					loadding = layer.load(1,{
						shade : 0.3
					});
				}
				$.ajax({
					url : obj.url , 
					type : obj.type,
					dataType : obj.dataType,
					data : obj.data,
					success : function( _data ){
						layer.close(loadding);
						if(_data.code == 0 ){
							obj.success(_data);
						}else{
							if(obj.alert==false){
								obj.success(_data);
								return;
							};
							if(_data.code == -110 ){//未登录
								window.location.href = '/#/login';
								return;
							}else if(_data.code == -111 ){ //无权限								
							}
							layer.confirm(_data.message, {icon: 2, title:'提示'}, function(index){
							  layer.close(index);
							  location.reload();
							});
						}
					},
					error : function(){}
				})
			});
		},
		ajax : function( obj ){
			obj.type = obj.type || 'get';
			obj.dataType = obj.dataType || 'json';
			/*if(!quanjing.user){
				initInfo.getUserInfo({
					callback : function(){
						T.getdata(obj);
					}
				})
			}else{	*/			
				T.getdata(obj);
			//}
		}
	};
	var public = {
		index : {
			index : function(obj){
				T.ajax({
					url : URL.index.index , 
					type : 'get',
					data : {},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})				
			}
		},
		permission : {//权限
			listPermission:function( obj ){ //权限列表接口
				T.ajax({
					url : URL.permission.listPermission , 
					type : 'get',
					data : {},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})
			},
			currentMenuPermission : function ( obj ){
				T.ajax({
					url : URL.permission.currentMenuPermission ,
					success : function(_data){						
						obj.callback(_data);
					}
				})
			},
			currentButtonPermission : function( obj ){ //获取用户Menu下的Button权限
				T.ajax({
					url : URL.permission.currentButtonPermission , 
					data : {
						id : obj.id
					},
					success : function(_data){
						obj.callback(_data);
					}
				})
			},

			delPermission : function(obj) {
				T.ajax({
					url : URL.permission.delPermission , 
					data : {
						id : obj.id
					},
					success : function(_data){
						obj.callback(_data);
					}
				})				
			},

			createPermission : function(obj) {
				T.ajax({
					url : URL.permission.createPermission , 
					type : 'post',
					data : {
						name : obj.name,
						description : obj.description,
						type : obj.type,
						url : obj.url,
						sort : obj.sort,
						parentId : obj.parentId,
						showFlag : obj.showFlag,
						platform : obj.platform,
						permission : obj.permission
					},
					success : function(_data){
						obj.callback(_data);
					}
				})					
			},
			updatePermission : function(obj) {
				T.ajax({
					url : URL.permission.updatePermission , 
					type : 'post',
					data : {
						id : obj.id,
						name : obj.name,
						description : obj.description,
						type : obj.type,
						url : obj.url,
						sort : obj.sort,
						parentId : obj.parentId,
						showFlag : obj.showFlag,
						platform : obj.platform,
						permission : obj.permission
					},
					success : function(_data){
						obj.callback(_data);
					}
				})					
			},

			listPositionPermission : 	function(obj) {
				T.ajax({
					url : URL.permission.listPositionPermission , 
					type : 'get',
					data : {
						positionId : obj.positionId
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})				
			},

			setPositionPermissions : function(obj) {
				T.ajax({
					url : URL.permission.setPositionPermissions , 
					type : 'post',
					data : {
						positionId : obj.positionId,
						permissionIds : obj.permissionIds
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})					
			},
			createPositionPermission : function(obj) {
				T.ajax({
					url : URL.permission.createPositionPermission , 
					type : 'post',
					data : {
						positionId : obj.positionId,
						permissionId : obj.permissionId
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})					
			},

			delPositionPermission : function(obj) {
				T.ajax({
					url : URL.permission.delPositionPermission , 
					type : 'post',
					data : {
						positionId : obj.positionId,
						permissionId : obj.permissionId
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})					
			}					
		},
		user : {
			currentUser : function( obj ){ //当前登录用户信息接口
				$.ajax({
					url : URL.user.currentUser , 
					success : function(_data){												
						obj.callback(_data);
					}
				})
			},
			userlist : function( obj ){ //栏目列表
				T.ajax({
					url : URL.user.userlist , 
					data : {page: obj.page, pageSize: obj.pageSize},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})
			},
			createUser : function( obj ){ //当前登录用户信息接口
				$.ajax({
					url : URL.user.createUser ,
					type : 'post' ,
					data : {
						userName: obj.userName,
						realName: obj.realName,
						positionIds:obj.positionIds,
						idfa : obj.idfa,
						pwd:  obj.pwd,
						headImage: obj.headImage						
					},
					success : function(_data){												
						obj.callback(_data);
					}
				})
			},
			updateUser : function( obj ){ //当前登录用户信息接口
				$.ajax({
					url : URL.user.updateUser ,
					type : 'post' ,
					data : {												
						realName: obj.realName,
						idfa : obj.idfa,
						pwd:  obj.pwd,
						headImage: obj.headImage	,
						userId : obj.userId					
					},
					success : function(_data){												
						obj.callback(_data);
					}
				})
			},
			updateUser2 : function( obj ){ //当前登录用户信息接口
				$.ajax({
					url : URL.user.updateUser2 ,
					type : 'post' ,
					data : {												
						//id:obj.id,
						userId:obj.userId,
						realName:obj.realName,
						userName:obj.userName,
						pwd:obj.pwd,
						headImage:obj.headImage,
						idfa:obj.idfa	
					},
					success : function(_data){												
						obj.callback(_data);
					}
				})
			},
			delUser : function( obj ){ //删除用户
				T.ajax({
					url : URL.user.delUser , 
					data : {userId: obj.userId},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			detail : function( obj ){
				T.ajax({
					url : URL.user.detail , 
					data : {userId: obj.userId},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			}			
		},

		position : {
			listPosition : function(obj){
				T.ajax({
					url : URL.position.listPosition , 
					data : {},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})				
			},

			updatePosition : function(obj) {
				T.ajax({
					url : URL.position.updatePosition , 
					type : 'post',
					data : {
						id : obj.id,
						positionName : obj.positionName
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})					
			},
			createPosition : function(obj) {
				T.ajax({
					url : URL.position.createPosition , 
					type : 'post',
					data : {						
						positionName : obj.positionName
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})					
			},
			delPosition : function(obj) {
				T.ajax({
					url : URL.position.delPosition , 
					type : 'get',
					data : {						
						id : obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})					
			},

			listUserPosition : function(obj){
				T.ajax({
					url : URL.position.listUserPosition , 
					data : {
						userId : obj.userId
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})					
			},
			setUserPosition : function(obj) {
				T.ajax({
					url : URL.position.setUserPosition , 
					data : {
						userId : obj.userId,
						positionId : obj.positionId
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})					
			},
			delUserPosition : function(obj) {
				T.ajax({
					url : URL.position.delUserPosition, 
					data : {
						userId : obj.userId,
						positionId : obj.positionId
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})					
			}			
		},
		data : {//基础接口
			all : function( obj ){ //当前登录用户信息接口
				$.ajax({
					url : URL.data.all , 
					success : function(_data){												
						obj.callback(_data);
					}
				})
			},
			compress : function(callback){//图片是否压缩选项列表接口
				T.ajax({
					url : URL.data.compress , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data);
					},
					error : function(){}
				})
			},
			compressMode : function(callback){//按照宽｜高等比压缩选项接口
				T.ajax({
					url : URL.data.compressMode , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data);
					},
					error : function(){}
				})
			},
			encoded : function(callback){//模版支持的编码选项列表
				T.ajax({
					url : URL.data.encoded , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data)
					},
					error : function(){}
				})
			},
			job : function(callback){//模版生成方式选项列表
				T.ajax({
					url : URL.data.job , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data)
					},
					error : function(){}
				})
			},
			permissionType : function(callback){//权限类型选项列表
				T.ajax({
					url : URL.data.permissionType , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data)
					},
					error : function(){}
				})
			},
			relationType : function(callback){//模版关系对应类型选项列表
				T.ajax({
					url : URL.data.relationType , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data)
					},
					error : function(){}
				})
			},
			showFlag : function(callback){//权限是否显示在左侧选项列表
				T.ajax({
					url : URL.data.showFlag , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data)
					},
					error : function(){}
				})
			},
			templateClassify : function( obj ){//模版类型选项列表
				T.ajax({
					url : URL.data.templateClassify , 
					success : function( _data ){
						obj.callback(_data)
					}
				})
			},
			watermark : function(callback){//图片是否水印选项列表
				T.ajax({
					url : URL.data.watermark , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data)
					},
					error : function(){}
				})
			},
			buildMode : function(callback){//图片是否水印选项列表
				T.ajax({
					url : URL.data.buildMode , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data)
					},
					error : function(){}
				})
			}
		},
		pretemplate : {//预模版加载
			list : function( obj ){//预模版列表
				T.ajax({
					url : URL.pretemplate.list , 
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			listTemplate2 : function( obj ){//预模版列表
				T.ajax({
					url : URL.pretemplate.listTemplate2 , 
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			listTemplate2list : function( obj ){//获取list类型的第二模版列表 
				T.ajax({
					url : URL.pretemplate.listTemplate2list , 
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			listTemplate2detail : function( obj ){//获取list类型的第二模版列表 
				T.ajax({
					url : URL.pretemplate.listTemplate2detail , 
					success : function( _data ){
						obj.callback(_data);
					}
				})
			}
		},
		news : {
			previousColumn : function(obj) {
				T.ajax({
					url : URL.news.previousColumn , 					
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			deletes : function(obj) {
				T.ajax({
					url : URL.news.deletes , 
					data : {
						ids : obj.ids
					},				
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			rescinds : function(obj) {
				T.ajax({
					url : URL.news.rescinds , 
					data : {
						ids : obj.ids
					},				
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			publishes : function(obj) {
				T.ajax({
					url : URL.news.publishes , 
					data : {
						ids : obj.ids
					},				
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			createNews : function( obj ){				
				T.ajax({
					url : URL.news.createNews , 
					type : 'POST',
					data : {
						"title":obj.title,
						"subTitle":obj.subTitle,
						"keyword":obj.keyword,
						"description":obj.description,
						"source":obj.source,
						"author":obj.author,
						"channelId":obj.channelId,//频道ID
						"columnId":obj.columnId,//栏目ID
						"categoryId": obj.categoryId, //部门分类ID
						"content":obj.content,
						"autoPublish":obj.autoPublish, //1 是自动发布。0是不自动发布.默认不自动发布
						"timer":obj.timer, //定时发布。//可不传,
						"editPublishTime":obj.editPublishTime,
						"field1":obj.field1,
						"field2":obj.field2,
						"field3":obj.field3,
						"field4":obj.field4,
						"field5":obj.field5,
						columnIds : obj.columnIds,
						stockCode : obj.stockCode,
						"publish":obj.publish
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			createNewsColumn : function( obj ){
				T.ajax({
					url : URL.news.createNewsColumn , 
					type : 'POST',
					data : {
						channelId:obj.channelId,//频道ID
						columnName:obj.columnName,
						listId:obj.listId,//预模版list接口返回的预模版ID. 不是必须
						detailId:obj.detailId,//预模版detail接口返回的预模版ID. 不是必须
						listTemplate2Id:obj.listTemplate2Id, //第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
						detailTemplate2Id:obj.detailTemplate2Id,//第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
						keywords:obj.keywords, //不是必须
						description:obj.description, //不是必须
						path : obj.path,
						fileName : obj.fileName,
						publishUrl : obj.publishUrl,
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			newscolumnlist : function( obj ){ //栏目列表
				T.ajax({
					url : URL.news.newscolumnlist , 
					data : {channelId : obj.channelId},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			newscolumn_list : function( obj ){ //栏目列表
				T.ajax({
					url : URL.news.newscolumn_list , 
					data : {page:obj.page,pageSize:obj.pageSize,channelId : obj.channelId},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},newscolumn_publish : function( obj ){ //发布栏目下的新闻 接口
				T.ajax({
					url : URL.news.newscolumn_publish , 
					data : {
						id : obj.id,
						model : obj.model
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			recommendList : function( obj ){ //获取新闻的推荐列表
				var newobj = {
					page:obj.page,pageSize:obj.pageSizex
				}
				if(obj.recommendColumnId){
					newobj.recommendColumnId = obj.recommendColumnId
				}
				T.ajax({
					url : URL.news.recommendList , 
					data : newobj,//recommendColumnId:1,//可不传。推荐栏目ID，按照推荐栏目搜索使用
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			deleteRecommend : function( obj ){ //取消推荐列表
				T.ajax({
					url : URL.news.deleteRecommend , 
					data : {id:obj.id},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},deleteRecommendColumn : function( obj ){ //取消推荐列表
				T.ajax({
					url : URL.news.deleteRecommendColumn , 
					data : {id:obj.id},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			newslist : function( obj ){ //新闻栏目列表
				T.ajax({
					url : URL.news.newslist , 
					type : 'get',
					data : {page:obj.page,pageSize:obj.pageSize},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			newsManageList : function( obj ){ //新闻栏目列表
				T.ajax({
					url : URL.news.newsManageList , 
					type : 'get',
					data : {page:obj.page,pageSize:obj.pageSize},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			newscolumn : function( obj ){ //获取获取栏目信息
				T.ajax({
					url : URL.news.newscolumn , 
					data : {id:obj.id},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			newscolumn_recover : function( obj ){ //获取获取栏目信息
				T.ajax({
					url : URL.news.newscolumn_recover , 
					data : {id:obj.id},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			newscolumn_manage : function( obj ){ //栏目删除列表
				T.ajax({
					url : URL.news.newscolumn_manage , 
					data : {page:obj.page,pageSize:obj.pageSize,channelId:obj.channelId},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			newsdetail : function( obj ){ //获取新闻详细信息
				T.ajax({
					url : URL.news.newsdetail , 
					type : 'get',
					data : {id:obj.id},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			delNews : function( obj ){ //删除新闻
				T.ajax({
					url : URL.news.delNews , 
					data : {id:obj.id},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			updateNews : function( obj ){ //修改新闻
				T.ajax({
					url : URL.news.updateNews , 
					type : 'POST',
					data : {
						"title":obj.title,
						"subTitle":obj.subTitle,
						"keyword":obj.keyword,
						"description":obj.description,
						"source":obj.source,
						"author":obj.author,
						"channelId":obj.channelId,//频道ID
						"columnId":obj.columnId,//栏目ID
						"columnIds":obj.columnIds,//栏目ID
						"categoryId" : obj.categoryId,
						"content":obj.content,
						"id":obj.id,
						"field1":obj.field1,
						"field2":obj.field2,
						"field3":obj.field3,
						"field4":obj.field4,
						"field5":obj.field5,
						"autoPublish":obj.autoPublish, //1 是自动发布。0是不自动发布.默认不自动发布
						"timer":obj.timer, //定时发布。
						stockCode : obj.stockCode, //股票代码
						"editPublishTime":obj.editPublishTime //定时发布。
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			delNewsColumn : function( obj ){ //删除新闻栏目
				T.ajax({
					url : URL.news.delNewsColumn , 
					data : {id:obj.id},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			mynewslist : function( obj ){ //我的新闻栏目列表
				T.ajax({
					url : URL.news.mynewslist , 
					type : 'get',
					data : {
						publish : obj.publish,
						page:obj.page,
						pageSize:obj.pageSize
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},			
			recommendColumnlist : function( obj ){
				T.ajax({					
					url : URL.news.recommendColumnlist , 
					data : obj.obj,
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			recommend : function( obj ){
				T.ajax({					
					url : URL.news.recommend ,
					type : 'post' ,
					data : {
						id : obj.id,
						recommendTitle : obj.recommendTitle,
						recommendDescription : obj.recommendDescription,
						recommendImages : obj.recommendImages,
						recommendColumnId : obj.recommendColumnId,
						position : obj.position,
						sort : obj.sort	
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})				
			},
			recommendNewsInfo : function(obj){
				T.ajax({					
					url : URL.news.recommendNewsInfo ,
					type : 'get' ,
					data : {
						id : obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})					
			},
			updateNewsColumn  : function( obj ){ //修改栏目
				T.ajax({
					url : URL.news.updateNewsColumn , 
					type : 'post',
					data : {
						id:obj.id,
						channelId:obj.channelId,//频道ID //不是必须
						columnName:obj.columnName,//不是必须
						listId:obj.listId,//预模版list接口返回的预模版ID. 不是必须
						detailId:obj.detailId,//预模版detail接口返回的预模版ID. 不是必须
						listTemplate2Id:obj.listTemplate2Id, //第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
						detailTemplate2Id:obj.detailTemplate2Id,//第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
						keywords:obj.keywords, //不是必须
						description:obj.description, //不是必须
						path : obj.path,
						fileName : obj.fileName,
						publishUrl : obj.publishUrl
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			}
			,relationColumnList : function( obj ){
				T.ajax({
					url : URL.news.relationColumnList , 
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			createRecommendColumn : function(obj) {
				T.ajax({
					url : URL.news.createRecommendColumn , 
					type : 'post',
					data : {						
						columnName:obj.columnName
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})	
			},
			updateRecommendColumn : function (obj) {
				T.ajax({
					url : URL.news.updateRecommendColumn , 
					type : 'post',
					data : {
						id:obj.id,
						columnName:obj.columnName
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})				
			},
			publish : function( obj ){
				T.ajax({
					url : URL.news.publish , 
					data : {id:obj.id},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			rescind : function( obj ){
				T.ajax({
					url : URL.news.rescind , 			
					data : {
						"id":obj.id,
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			recover : function( obj ){
				var newobj = {
					id : obj.id
				}
				if(obj.publish){
					newobj.publish = obj.publish;//可不传。如果传递1的话是 恢复并发布
				}
				T.ajax({
					url : URL.news.recover , 			
					data : newobj,
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			preview	 : function( obj ){
				T.ajax({
					url : URL.news.preview , 			
					data : {
						"id":obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			}	
		},
		category : { //部门分类
			listCategory : function( obj ){ // 部门分类列表
				var newobj = {}
				if(obj.info){
					newobj.info = obj.info;
				}
				T.ajax({
					url : URL.category.listCategory , 
					data : newobj,
					type : 'get',
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},

			delCategory : function( obj ) { // 删除部门
				T.ajax({

					url : URL.category.delCategory ,
					type : 'get',
					data : {id : obj.id},
					success : function(_data) {						
						obj.callback(_data);
					}
				})
			},

			createCategory : function(obj) { //创建分类
				T.ajax({
					url : URL.category.createCategory,
					type : 'post',
					data : {categoryName: obj.categoryName, categoryDesc: obj.categoryDesc},
					success : function(_data) {
						obj.callback(_data);
					}
				})
			},

			updateCategory : function(obj) {				
				T.ajax({
					url : URL.category.updateCategory,
					type : 'post',
					data : {
						id : obj.id,
						categoryName: obj.categoryName, 
						categoryDesc: obj.categoryDesc
					},
					success : function(_data) {
						obj.callback(_data);
					}
				})
			}
		},
		channel : {//取频道分类管理
			listChannel : function( obj ){ //栏目列表
				var newobj = {}
				if(obj.info){
					newobj.info = obj.info;
				}
				T.ajax({
					url : URL.channel.listChannel , 
					data : newobj,
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			currentChannelList : function( obj ){
				T.ajax({
					url : URL.channel.currentChannelList , 
					data : {categoryId:obj.categoryId},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},

			createChannel : function( obj ){
				T.ajax({
					url : URL.channel.createChannel , 
					type : 'post',
					data : { 
						categoryId   : obj.categoryId,
						channelName  : obj.channelName,
						channelUrl   : obj.channelUrl,
						channelPath  : obj.channelPath,
						templatePath : obj.templatePath,
						channelDesc  : obj.channelDesc,
						rsyncModelName : obj.rsyncModelName			
					},
					success : function( _data ){						
						obj.callback(_data);
					},

					error : function() {						
					}
				})
			},

			updateChannel : function( obj ){
				T.ajax({
					url : URL.channel.updateChannel , 
					type : 'post',
					data : { 
						id 					 : obj.id,
						categoryId   : obj.categoryId,
						channelName  : obj.channelName,
						channelUrl   : obj.channelUrl,
						channelPath  : obj.channelPath,
						templatePath : obj.templatePath,
						channelDesc  : obj.channelDesc	,
						rsyncModelName : obj.rsyncModelName							
					},
					success : function( _data ){						
						obj.callback(_data);
					},

					error : function() {						
					}
				})
			},		
			delChannel : function( obj ){ //栏目列表
				T.ajax({
					url     : URL.channel.delChannel , 
					data    : {
						id : obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			}				

		},
		image : {
			imageslist : function( obj ){ //栏目列表
				T.ajax({
					url : URL.images.imageslist , 
					type : 'get',
					data : {
						page : obj.page,
						pageSize : obj.pageSize
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})
			},
			createImagesClassify : function( obj ){ //栏目列表
				T.ajax({
					url : URL.images.createImagesClassify , 
					type : 'post',
					data : {
						classifyName : obj.classifyName
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			imagesclassifylist : function( obj ){ //栏目列表
				T.ajax({
					url : URL.images.imagesclassifylist , 
					type : 'get',
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},updateImagesClassify : function( obj ){
				T.ajax({
					url : URL.images.updateImagesClassify , 
					type : 'post',
					data : {
						classifyName : obj.classifyName,
						id : obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},delImagesClassify : function( obj ){
				T.ajax({
					url : URL.images.delImagesClassify , 
					data : {
						id : obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},imagesclassifyalllist : function( obj ){
				T.ajax({
					url : URL.images.imagesclassifyalllist , 
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			imagesclassify : function( obj ){ //栏目列表
				T.ajax({
					url : URL.images.imagesclassify , 
					type : 'get',
					data : { id : obj.id },
					success : function( _data ){
						obj.callback(_data);
					}
				})
			},
			createImages : function(obj) {
				T.ajax({
					url : URL.images.createImages , 
					type : 'post',
					data : {
						imageUrl : obj.imageUrl,
						imageWidthPixel : obj.imageWidthPixel, 
						imageHeightPixel : obj.imageHeightPixel, // 图片宽像素  图片上传接口返回
						orgWidthPixel : obj.orgWidthPixel, //原始长像素  图片上传接口返回
						orgHeightPixel : obj.orgHeightPixel, //原始宽像素  图片上传接口返回
						imageTitle : obj.imageTitle,
						keyword : obj.keyword,
						imagesClassifyId : obj.imagesClassifyId,
						imagePath : obj.imagePath,
						watermark : obj.watermark, //是否水印 1、0
						compress : obj.compress, //是否压缩
						fid : obj.fid, //图片上传接口返回
						size : obj.size, //图片上传接口返回
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})				
			},
			updateImages : function(obj) {
				T.ajax({
					url : URL.images.updateImages , 
					type : 'post',
					data : {
						id : obj.id,
						imageUrl : obj.imageUrl,
						imageWidthPixel : obj.imageWidthPixel, 
						imageHeightPixel : obj.imageHeightPixel, // 图片宽像素  图片上传接口返回
						orgWidthPixel : obj.orgWidthPixel, //原始长像素  图片上传接口返回
						orgHeightPixel : obj.orgHeightPixel, //原始宽像素  图片上传接口返回
						imageTitle : obj.imageTitle,
						imagePath : obj.imagePath,
						keyword : obj.keyword,
						imagesClassifyId : obj.imagesClassifyId,
						watermark : obj.watermark, //是否水印 1、0
						compress : obj.compress, //是否压缩
						fid : obj.fid, //图片上传接口返回
						size : obj.size, //图片上传接口返回
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})				
			},
			delImage : function( obj ){ //栏目列表
				var newobj = {
					id : obj.id
				}
				if(obj.force){
					newobj.force = obj.force;
				}
				T.ajax({
					url : URL.images.delImages , 
					type : 'get',
					data : newobj,
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})
			},					
			imageBase : function( obj ){ //栏目列表
				T.ajax({
					url : URL.images.imagesBase , 
					type : 'get',
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})
			},		
			createImageBase : function( obj ){ //栏目列表
				T.ajax({
					url : URL.images.createImagesBase , 
					type : 'post',
					data : {
						baseUrl : obj.baseUrl,
						basePath : obj.basePath
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})
			},	
			updateImageBase : function( obj ){ //栏目列表
				T.ajax({
					url : URL.images.updateImagesBase , 
					type : 'post',
					data : {
						id : obj.id,
						baseUrl : obj.baseUrl,
						basePath : obj.basePath
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})
			}								
		},
		video : {
			createVideoClassify : function(obj) {
				T.ajax({
					url : URL.video.createVideoClassify , 
					type : 'post',
					data : {classifyName:obj.classifyName},
					success : function( _data ){
						obj.callback(_data);
					}
				})				
			},videoclassifyalllist : function(obj) {
				T.ajax({
					url : URL.video.videoclassifyalllist , 
					success : function( _data ){
						obj.callback(_data);
					}
				})				
			},videoclassify : function(obj) {
				T.ajax({
					url : URL.video.videoclassify , 
					data : {
						id : obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})				
			},videoclassifylist : function(obj) {
				T.ajax({
					url : URL.video.videoclassifylist , 
					data : {
						page : obj.page,
						pageSize : obj.pageSize
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})				
			},updateVideoClassify : function(obj) {
				T.ajax({
					url : URL.video.updateVideoClassify , 
					type : 'post',
					data : {
						classifyName:obj.classifyName,
						id:obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})				
			},videoBase : function(obj) {
				T.ajax({
					url : URL.video.videoBase , 
					type : 'get',
					data : {},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})				
			},
			updateVideoBase : function(obj){
				T.ajax({
					url : URL.video.updateVideoBase , 
					type : 'post',
					data : {
						id : obj.id,
						baseUrl : obj.baseUrl,
						basePath : obj.basePath
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})	
			},
			createVideoBase : function(obj){
				T.ajax({
					url : URL.video.createVideoBase , 
					type : 'post',
					data : {						
						baseUrl : obj.baseUrl,
						basePath : obj.basePath
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})	
			},			
			videolist : function( obj ){ //获取视频列表
				T.ajax({
					url : URL.video.videolist , 
					type : 'get',
					data : {
						page : obj.page,
						pageSize : obj.pageSize
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})
			},

			delVideo : function( obj ){ //获取视频列表
				var newobj = {
					id : obj.id
				}
				if(obj.force){
					newobj.force = obj.force
				}
				T.ajax({
					url : URL.video.delVideo , 
					type : 'get',
					data : newobj,
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})
			},
			createVideo : function( obj ){ //获取视频列表
				T.ajax({
					url : URL.video.createVideo , 
					type : 'post',
					data : {
						videoTitle: obj.videoTitle,
					  videoDesc: obj.videoDesc,
					  videoUrl: obj.videoUrl,
					  videoPath: obj.videoPath,
					  fileName: obj.fileName				
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})
			},
			updateVideo : function( obj ){ //获取视频列表
				T.ajax({
					url : URL.video.updateVideo , 
					type : 'post',
					data : {
						id : obj.id,
						videoTitle: obj.videoTitle,
					  videoDesc: obj.videoDesc,
					  videoUrl: obj.videoUrl,
					  videoPath: obj.videoPath,
					  fileName: obj.fileName				
					},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})
			}							

		},
		template : { //模版
			listTemplate : function( obj ){//模版列表［分页］ 接口
				T.ajax({
					url : URL.template.listTemplate ,
					data : {
						page : obj.page,
						pageSize : obj.pageSize,
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			template : function( obj ){//读取所有的模版对应的关系列表 接口
				T.ajax({
					url : URL.template.listTemplate , 
					data : {
						"templateId":obj.templateId,
						"relationType":obj.relationType //默认0 
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			templateInfo : function( obj ){//模版详细信息 接口
				T.ajax({
					url : URL.template.templateInfo , 
					data : {id:obj.id},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			relation : function( obj ){//模版详细信息 接口
				T.ajax({
					url : URL.template.relation , 
					data : {
						"templateId":obj.templateId,
						"relationType":obj.relationType //默认0 
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			createTemplate : function( obj ){//读取所有的模版对应的关系列表 接口
				T.ajax({
					url : URL.template.createTemplate , 
					type : 'POST',
					data : {
						"templateName":obj.templateName,
						"templateDesc":obj.templateDesc,
						"filename":obj.filename,
						"path":obj.path,
						"templateClassify":obj.templateClassify,
						"job":obj.job, //是否定时生成。1是定时生成。0是触发生成
						"encoded":obj.encoded,
						"channelId":obj.channelId,//频道ID
						"sortNum":obj.sortNum,//排序值
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			listTemplateBycolumnId : function( obj ){//读取所有的模版对应的关系列表 接口
				T.ajax({
					url : URL.template.listTemplateBycolumnId , 
					data : {
						"columnId":obj.columnId
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			delRelationByColumnList : function( obj ){//读取所有的模版对应的关系列表 接口
				T.ajax({
					url : URL.template.delRelationByColumnList , 
					type : 'POST',
					data : {
						"templateId":obj.templateId, //模版ID
						"relationId":obj.relationId, //新闻栏目ID
						"relationType":obj.relationType //使用1即可
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			updateTemplate : function( obj ){//模版修改 接口
				T.ajax({
					url : URL.template.updateTemplate , 
					type : 'POST',
					data : {
						id : obj.id,
						"templateName":obj.templateName,
						"templateDesc":obj.templateDesc,
						"filename":obj.filename,
						"path":obj.path,
						"templateClassify":obj.templateClassify,
						"job":obj.job, //是否定时生成。1是定时生成。0是触发生成
						"encoded":obj.encoded,
						"channelId":obj.channelId,//频道ID
						"sortNum":obj.sortNum,//排序值
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			delTemplate  : function( obj ){//删除模版
				T.ajax({
					url : URL.template.delTemplate , 
					data : {
						id : obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			downTemplate  : function( obj ){//模版下载
				window.location.href = URL.template.downTemplate + "?id=" + obj.id;
				// T.ajax({
				// 	url : URL.template.downTemplate , 
				// 	data : {
				// 		id : obj.id
				// 	},
				// 	success : function( _data ){
				// 		obj.callback(_data);
				// 	}
				// });
			},
			createRelation : function( obj ){//新增模版关系 接口
				T.ajax({
					url : URL.template.createRelation , 
					loadding : false,
					type : 'post',
					data : {
						"templateId":obj.templateId,
						"relationId":obj.relationId,
						"relationType":obj.relationType
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			delRelation : function( obj ){//新增模版关系 接口
				T.ajax({
					url : URL.template.delRelation , 
					loadding : false,
					type:'post',
					data : {
						"templateId":obj.templateId,
						"relationId":obj.relationId,
						"relationType":obj.relationType
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			uploadTemplate : function( obj ){//上传模板 接口
				T.ajax({
					url : URL.template.uploadTemplate , 
					type:'post',
					data : {
						"baseCode":obj.baseCode,
						"id":obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			createTemplate2 : function( obj ){
				T.ajax({
					url : URL.template.createTemplate2 , 
					type:'post',
					data : {
						"templateName":obj.templateName,
						"filename":obj.filename,
						"path":obj.path,
						"templateClassify":obj.templateClassify,
						"encoded":obj.encoded
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			listTemplate2 : function( obj ){
				T.ajax({
					url : URL.template.listTemplate2 ,										
					data : {
						page : obj.page,
						pageSize : obj.pageSize
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			delTemplate2 : function( obj ){
				T.ajax({
					url : URL.template.delTemplate2 ,
					data : {
						id : obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			uploadTemplate2 : function( obj ){//上传模板 接口
				T.ajax({
					url : URL.template.uploadTemplate2 , 
					type:'post',
					data : {
						"baseCode":obj.baseCode,
						"id":obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},			
			downTemplate2 : function( obj ){
				window.location.href = URL.template.downTemplate2 + "?id=" + obj.id;
				// T.ajax({
				// 	url : URL.template.downTemplate2 ,
				// 	data : {
				// 		id : obj.id
				// 	},
				// 	success : function( _data ){
				// 		obj.callback(_data);
				// 	}
				// });
			},
			template2Info : function( obj ){
				T.ajax({
					url : URL.template.template2Info ,
					data : {
						id : obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			template2base : function(obj){
				T.ajax({
					url : URL.template.template2base ,
					data : {},
					success : function( _data ){
						obj.callback(_data);
					}
				});				
			},
			updateTemplate2base : function(obj) {
				T.ajax({
					url : URL.template.updateTemplate2base ,
					type : 'post',
					data : {
						id : obj.id,
						basePath : obj.basePath
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});				
			},

			updateTemplate2 : function(obj ){
				T.ajax({
					url : URL.template.updateTemplate2 ,
					type : 'post',
					data : {
						id : obj.id,
						"templateName":obj.templateName,
						"filename":obj.filename,
						"path":obj.path,
						"templateClassify":obj.templateClassify,
						"encoded":obj.encoded
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			}
		},
		topic : { //专题
			createTopicColumn : function( obj ){//新建专题分类
				T.ajax({
					url : URL.topic.createTopicColumn , 
					type : 'POST',
					data : {name:obj.name},
					success : function( _data ){
						obj.callback(_data)
					}
				});
			},
			createTopic : function( obj ){//新建专题分类
				T.ajax({
					url : URL.topic.createTopic , 
					type : 'POST',
					data : {
						"topicTitle":obj.topicTitle,
						"topicContent":obj.topicContent,
						"topicPath":obj.topicPath,
						"topicFilename":obj.topicFilename,
						"topicClassifyId":obj.topicClassifyId,//专题分类ID
						"categoryId":obj.categoryId,//部门类别ID
						"channelId":obj.channelId, //频道ID
						"releaseTime":obj.releaseTime, //发布时间
						"keyword":obj.keyword,
						"description":obj.description,
						"topicColumnId":obj.topicColumnId, //专题栏目ID(做系列专题使用)
					},
					success : function( _data ){
						obj.callback(_data)
					}
				});
			},
			updateTopic : function( obj ){//新建专题分类
				T.ajax({
					url : URL.topic.updateTopic , 
					type : 'POST',
					data : {
						id : obj.id,
						"topicTitle":obj.topicTitle,
						"topicContent":obj.topicContent,
						"topicPath":obj.topicPath,
						"topicFilename":obj.topicFilename,
						"topicClassifyId":obj.topicClassifyId,//专题分类ID
						"categoryId":obj.categoryId,//部门类别ID
						"channelId":obj.channelId, //频道ID
						"releaseTime":obj.releaseTime, //发布时间
						"keyword":obj.keyword,
						"description":obj.description,
						"topicColumnId":obj.topicColumnId, //专题栏目ID(做系列专题使用)
					},
					success : function( _data ){
						obj.callback(_data)
					}
				});
			}
			,listTopic : function( obj ){//模版列表［分页］ 接口
				T.ajax({
					url : URL.topic.listTopic , 
					data : {
						"pageSize":obj.pageSize,
			            "page":obj.page,
					},
					success : function( _data ){
						obj.callback(_data)
					}
				});
			},
			topicInfo : function( obj ){//专题详情 接口
				T.ajax({
					url : URL.topic.topicInfo , 
					data : {id:obj.id},
					success : function( _data ){
						obj.callback(_data)
					}
				});
			},
			topicClassifyList : function( obj ){//模版列表［分页］ 接口
				T.ajax({
					url : URL.topic.topicClassifyList , 
					success : function( _data ){
						obj.callback(_data)
					}
				});
			},
			topicColumnList : function( obj ){//专题分类栏目列表 接口
				T.ajax({
					url : URL.topic.topicColumnList , 
					success : function( _data ){
						obj.callback(_data)
					}
				});
			},
			delTopicColumn : function( obj ){//删除分类栏目列表
				T.ajax({
					url : URL.topic.delTopicColumn ,
					data : {id:obj.id}, 
					success : function( _data ){
						obj.callback(_data)
					}
				});
			},
			delTopic : function( obj ){//删除分类栏目列表
				T.ajax({
					url : URL.topic.delTopic ,
					data : {id:obj.id}, 
					success : function( _data ){
						obj.callback(_data)
					}
				});
			},
			delTopicClassify : function( obj ){//删除专题分类 
				T.ajax({
					url : URL.topic.delTopicClassify ,
					data : {id:obj.id}, 
					success : function( _data ){
						obj.callback(_data)
					}
				});
			},
			updateTopicColumn: function( obj ){//删除分类栏目列表
				T.ajax({
					url : URL.topic.updateTopicColumn ,
					type : 'POST',
					data : {id:obj.id,name:obj.name}, 
					success : function( _data ){
						obj.callback(_data)
					}
				});
			},
			createTopicClassify: function( obj ){//更新专题分类
				T.ajax({
					url : URL.topic.createTopicClassify ,
					type : 'POST',
					data : {name:obj.name}, 
					success : function( _data ){
						obj.callback(_data)
					}
				});
			},			
			updateTopicClassify: function( obj ){//更新专题分类
				T.ajax({
					url : URL.topic.updateTopicClassify ,
					type : 'POST',
					data : {id:obj.id,name:obj.name}, 
					success : function( _data ){
						obj.callback(_data)
					}
				});
			},
			preview: function( obj ){//专题预览	
				T.ajax({
					url : URL.topic.preview ,
					type : 'get',
					data : {id:obj.id}, 
					success : function( _data ){
						obj.callback(_data)
					}
				});
			}
			
		},
		userchannel : { //用户频道编辑权限
			channelId:function( callback ){//根据频道ID获取用户列表 接口
				T.ajax({
					url : URL.userchannel.channelId , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data);
					}
				});
			},
			userId:function( callback ){ //根据用户ID获取频道列表
				T.ajax({
					url : URL.userchannel.userId , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data);
					}
				});
			},
			createUserChannel:function( obj ){
				T.ajax({
					url : URL.userchannel.createUserChannel , 
					type : 'post',
					data : {
						userId : obj.userId,
						channelId : obj.channelId
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});				
			},
			delUserChannel:function( obj ){
				T.ajax({
					url : URL.userchannel.delUserChannel , 
					type : 'post',
					data : {
						userId : obj.userId,
						channelId : obj.channelId
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});				
			},
			userChannelIds : function(obj) {
				T.ajax({
					url : URL.userchannel.userChannelIds , 
					type : 'get',
					data : {
						userId : obj.userId			
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});						
			}
		},
		fragment : {
			list : function( obj ){ //获取碎片列表
				T.ajax({
					url : URL.fragment.list , 
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			listFragment : function( obj ){ //获取碎片列表
				T.ajax({
					url : URL.fragment.listFragment , 
					type : 'get',
					data : {
						page     : obj.page,
						pageSize : obj.pageSize
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			findFragment : function( obj ){ //获取碎片详细信息
				T.ajax({
					url : URL.fragment.findFragment , 
					type : 'get',
					data : {
						id : obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});				
			},
			delFragment : function( obj ){ //删除碎片
				T.ajax({
					url : URL.fragment.delFragment , 
					type : 'get',
					data : {
						id : obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});						
			},
			editFragment : function( obj ){
				T.ajax({
					url : URL.fragment.editFragment, 
					type : 'post',
					data : {
						id : obj.id,
						values : obj.values.toString()
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});							
			},
			fragmentMap : function( obj ){ //获取编辑碎片的Map维护信息
				T.ajax({
					url : URL.fragment.fragmentMap , 
					type : 'get',
					data : {
						id : obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});							
			},
			updateFragment : function( obj ){ //修改碎片
				T.ajax({
					url : URL.fragment.updateFragment, 
					type : 'post',
					data : {
						id : obj.id,
						channelId : obj.channelId,
						fragmentClassifyId : obj.fragmentClassifyId,
						fragmentName : obj.fragmentName,
						sortNum : obj.sortNum,
						fragmentModel : obj.fragmentModel
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});				
			},
			createFragment : function( obj ){ //创建碎片信息
				T.ajax({
					url : URL.fragment.createFragment, 
					type : 'post',
					data : {
						channelId : obj.channelId,
						fragmentClassifyId : obj.fragmentClassifyId,
						fragmentName : obj.fragmentName,
						sortNum : obj.sortNum,
						fragmentModel : obj.fragmentModel
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			listHistory : function( callback ){ //碎片编辑的历史纪录［分页查询］
				T.ajax({
					url : URL.fragment.listHistory , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data);
					}
				});
			},
			listClassify : function( obj ){ //碎片分类列表
				T.ajax({
					url : URL.fragment.listClassify , 
					type : 'get',
					data : {},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			createClassify : function( obj ){ //新建碎片分类
				T.ajax({
					url : URL.fragment.createClassify , 
					type : 'post',
					data : {
						classifyName : obj.classifyName
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			updateClassify : function( obj ){ //分类修改
				T.ajax({
					url : URL.fragment.updateClassify , 
					type : 'post',
					data : {
						id : obj.id,
						classifyName : obj.classifyName
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});				
			},
			delClassify : function( obj ){ //删除分类
				T.ajax({
					url : URL.fragment.delClassify , 
					type : 'get',
					data : {
						id : obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});				
			},
			publish : function( obj ){ //发布
				T.ajax({
					url : URL.fragment.publish , 
					type : 'get',
					data : {
						id : obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});	
			}
		},
		upload : {
			uploadImage : function( obj ){ //发布
				T.ajax({
					url : URL.upload.uploadImage , 
					type : 'post',
					data : {
						"baseCode":obj.baseCode,
						"suffix":obj.suffix,//"文件后缀png|jpg"
						"watermark":obj.watermark, //是否水印
						"width":obj.width, //需要压缩的长度 可不传
						"height":obj.height //需要压缩的高度  可不传
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});	
			},
			cancelVideo : function( obj ){ //视频取消
				T.ajax({
					url : URL.upload.cancelVideo , 
					type : 'post',
					data : {
						"fileName":obj.fileName
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});	
			}
		},
		search : {
			searchNew: function( obj ){
				T.ajax({
					url : URL.search.searchNew , 
					type : 'post',
					data : {
						//所有参数都不是必传项
						"id" : obj.newsId,
						"buildUserName" : obj.buildUserName,
						"lastModifyUserName" : obj.lastModifyUserName,
						"condition":obj.condition,
						"author":obj.author,
						"source":obj.source,
						"categoryId":obj.categoryId,//部门分类ID
						"channelId":obj.channelId,//频道ID
						"columnId":obj.columnId,//栏目ID
						"platform":obj.platform, //平台,
						"startTime":obj.startTime,//创建时间
						"endTime":obj.endTime,//创建时间
						delTag : obj.delTag,
						publish:obj.publish,
						"page":obj.page,
						"pageSize":obj.pageSize
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			searchTopic : function( obj ){
				T.ajax({
					url : URL.search.searchTopic , 
					type : 'post',
					data : {
						//所有参数都不是必传项
						"condition":obj.condition,
						"topicClassifyId":obj.topicClassifyId,//专题分类ID
						"categoryId":obj.categoryId,//部门分类ID
						"channelId":obj.channelId,//频道ID
						"topicColumnId":obj.topicColumnId,//系列专题类型ID
						"releaseTime":obj.releaseTime, //发布时间,
						"startTime":obj.startTime,//创建时间
						"endTime":obj.endTime,//创建时间
						"page":obj.page,
						"pageSize":obj.pageSize
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			searchImages : function( obj ){
				T.ajax({
					url : URL.search.searchImages , 
					type : 'post',
					data : {
						//所有参数都不是必传项
						"condition":obj.condition,
						"imagesClassifyId":obj.imagesClassifyId,
						"page":obj.page,
						"pageSize":obj.pageSize
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			searchVideo : function( obj ){
				T.ajax({
					url : URL.search.searchVideo , 
					type : 'post',
					data : {
						//所有参数都不是必传项
						"condition":obj.condition,
						"videoClassifyId":obj.videoClassifyId,
						"page":obj.page,
						"pageSize":obj.pageSize
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},			
			searchUser : function( obj ){
				T.ajax({
					url : URL.search.searchUser , 	
					type : 'post',				
					data : {
						//所有参数都不是必传项
						"condition":obj.condition,
						"page":obj.page,
						"pageSize":obj.pageSize
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},	
			searchFragment : function( obj ){
				T.ajax({
					url : URL.search.searchFragment , 	
					type : 'post',				
					data : {
						//所有参数都不是必传项
						"condition":obj.condition,
						"fragmentClassifyId" : obj.fragmentClassifyId,
						"channelId" : obj.channelId,
						"page":obj.page,
						"pageSize":obj.pageSize
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			searchTemplate : function( obj ){
				T.ajax({
					url : URL.search.searchTemplate , 	
					type : 'post',				
					data : {
						//所有参数都不是必传项
						"condition":obj.condition,						
						"channelId" : obj.channelId,
						"page":obj.page,
						"pageSize":obj.pageSize
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},	
			searchTemplate2 : function( obj ){
				T.ajax({
					url : URL.search.searchTemplate2 , 	
					type : 'post',				
					data : {
						//所有参数都不是必传项
						"condition":obj.condition,						
						"page":obj.page,
						"pageSize":obj.pageSize
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			}							
		},
		publishInfo : {
			list: function( obj ){
				T.ajax({
					url : URL.publishInfo.list , 
					data : {
						page:obj.page,
						pageSize:obj.pageSize,
						status:obj.status,//状态 
						triggerId:obj.triggerId,//ID 对应的新闻、专题、碎片、推荐 的ID
						triggerType:obj.triggerType//1|2|3|4 //新闻、专题、碎片、推荐 
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			},
			detail: function( obj ){
				T.ajax({
					url : URL.publishInfo.detail , 
					data : {
						id : obj.id
					},
					success : function( _data ){
						obj.callback(_data);
					}
				});
			}						
		}
	}
	return public;
});