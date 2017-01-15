define(['./URL','jquery','./getInitInfo'],function(URL,$, initInfo){
	var T = {
		getdata : function( obj ){
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
					data : obj.data,
					success : function( _data ){
						layer.close(loadding);
						if(_data.code == 0 ){
							obj.success(_data);
						}else{
							if(_data.code == -1 ){//未登录
								initInfo.login();
							}else if(_data.code == -111 ){ //无权限

							}
							layer.confirm(_data.message, {icon: 2, title:'提示'}, function(index){
							  layer.close(index);
							});
						}
					},
					error : function(){}
				})
			});
		},
		ajax : function( obj ){
			obj.type = obj.type || 'get';
			if(!quanjing.user){
				initInfo.getUserInfo({
					callback : function(){
						T.getdata(obj);
					}
				})
			}else{				
				T.getdata(obj);
			}
		}
	};
	var public = {
		permission : {//权限
			listPermission:function( callback ){ //权限列表接口
				T.ajax({
					url : URL.permission.listPermission , 
					type : 'get',

					data : {},
					success : function( _data ){
							callback(_data);
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
			}
		},
		user : {
			currentUser : function( obj ){ //当前登录用户信息接口
				$.ajax({
					url : URL.user.currentUser , 
					type : 'get',
					dataType : 'json',
					success : function(_data){												
						obj.callback(_data);
					}
				})
			},
			userlist : function( obj ){ //栏目列表
				T.ajax({
					url : URL.user.userlist , 
					type : 'get',
					data : {page: obj.page, pageSize: obj.pageSize},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})
			}
		},
		data : {//基础接口
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
			templateClassify : function(callback){//模版类型选项列表
				T.ajax({
					url : URL.data.templateClassify , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data)
					},
					error : function(){}
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
					data : {page:obj.page,pageSize:obj.pageSize},
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
			newscolumn : function( obj ){ //获取获取栏目信息
				T.ajax({
					url : URL.news.newscolumn , 
					data : {id:obj.id},
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
						"content":obj.content,
						"id":obj.id,
						"field1":obj.field1,
						"field2":obj.field2,
						"field3":obj.field3,
						"field4":obj.field4,
						"field5":obj.field5,
						"autoPublish":obj.autoPublish, //1 是自动发布。0是不自动发布.默认不自动发布
						"timer":obj.timer //定时发布。
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
						description:obj.description //不是必须
					},
					success : function( _data ){
						obj.callback(_data);
					}
				})
			}
		},
		category : { //部门分类
			listCategory : function( obj ){ // 部门分类列表
				T.ajax({
					url : URL.category.listCategory , 
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
				T.ajax({
					url : URL.channel.listChannel , 
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
			}
		},
		image : {
			imageslist : function( callback ){ //栏目列表
				T.ajax({
					url : URL.category.listCategory , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data);
					},
					error : function(){}
				})
			}
		},
		video : {
			videolist : function( callback ){ //获取视频列表
				T.ajax({
					url : URL.video.videolist , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data);
					},
					error : function(){}
				})
			}
		},
		template : { //模版
			listTemplate : function( callback ){//模版列表［分页］ 接口
				T.ajax({
					url : URL.template.listTemplate , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data);
					},
					error : function(){}
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
			}
			,listTopic : function( callback ){//模版列表［分页］ 接口
				T.ajax({
					url : URL.topic.listTopic , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data)
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
			topicColumnList : function( obj ){//专题分类列表 接口
				T.ajax({
					url : URL.topic.topicColumnList , 
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
			createUserChannel:function( callback ){

			},
			delUserChannel:function( callback ){

			}
		},
		fragment : {
			listFragment : function( callback ){ //获取碎片列表
				T.ajax({
					url : URL.fragment.listFragment , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data);
					}
				});
			},
			findFragment : function( callback ){ //获取碎片详细信息
			},
			delFragment : function( callback ){ //删除碎片
			},
			editFragment : function( callback ){ //编辑碎片
			},
			fragmentMap : function( callback ){ //获取编辑碎片的Map维护信息
			},
			updateFragment : function( callback ){ //修改碎片
			},
			createFragment : function( callback ){ //创建碎片信息

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
			listClassify : function( callback ){ //碎片编辑的历史纪录［分页查询］
				T.ajax({
					url : URL.fragment.listClassify , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data);
					}
				});
			},
			createClassify : function( callback ){ //分类列表
				T.ajax({
					url : URL.fragment.createClassify , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data);
					}
				});
			},
			updateClassify : function( callback ){ //分类修改
			},
			delClassify : function( callback ){ //删除分类
				
			},
			publish : function( callback ){ //发布
			}
		}
	}
	return public;
});