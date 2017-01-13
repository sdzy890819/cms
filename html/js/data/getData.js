define(['./URL','jquery','./getInitInfo'],function(URL,$, initInfo){
	var T = {
		getdata : function( obj ){
			$.ajax({
				url : obj.url , 
				type : obj.type,
				data : obj.data,
				success : function( _data ){
					if(_data.code == 0 ){
						obj.success(_data);
					}else if(_data.code == -1 ){//未登录
						initInfo.login();
					}
					
				},
				error : function(){}
			})
		},
		ajax : function( obj ){
			obj.type = obj.type || 'get';
			if(!quanjing.user){
				initInfo.getUserInfo(function(){
					T.getdata(obj);
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
			currentMenuPermission : function ( callback ){
				T.ajax({
					url : URL.permission.currentMenuPermission ,
					type : 'get',
					data : {},
					success : function(_data){						
						callback(_data);
					},
					error : function(){}
				})
			},
			currentButtonPermission : function( id, callback ){ //获取用户Menu下的Button权限
				T.ajax({
					url : URL.permission.currentButtonPermission , 
					type : 'get',
					data : {
						id : id
					},
					success : function(_data){
						callback(_data);
					},
					error : function(){}
				})
			}
		},
		user : {
			currentUser : function( callback ){ //当前登录用户信息接口
				T.ajax({
					url : URL.user.currentUser , 
					type : 'get',
					data : {},
					success : function(_data){
						callback(_data);
					},
					error : function(){}
				})
			},
			userlist : function( callback ){ //栏目列表
				T.ajax({
					url : URL.user.userlist , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data);
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
		news : {
			newscolumnlist : function( callback ){ //栏目列表
				T.ajax({
					url : URL.news.newscolumnlist , 
					type : 'get',
					success : function( _data ){
						callback(_data);
					}
				})
			},
			newslist : function( obj ){ //栏目列表
				T.ajax({
					url : URL.news.newslist , 
					type : 'get',
					data : {page:obj.page,pageSize:obj.pageSize},
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
					type : 'get',
					data : {id:obj.id},
					success : function( _data ){
						obj.callback(_data);
					},
					error : function(){}
				})
			}
		},
		category : { //部门分类
			listCategory : function( obj ){ //栏目列表
				T.ajax({
					url : URL.category.listCategory , 
					type : 'get',
					success : function( _data ){
						obj.callback(_data);
					}
				});
			}
		},
		channel : {//取频道分类管理
			listChannel : function( callback ){ //栏目列表
				T.ajax({
					url : URL.channel.listChannel , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data);
					},
					error : function(){}
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
			listTopic : function( callback ){//模版列表［分页］ 接口
				T.ajax({
					url : URL.topic.listTopic , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data)
					}
				});
			},
			topicClassifyList : function( callback ){//模版列表［分页］ 接口
				T.ajax({
					url : URL.topic.topicClassifyList , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback(_data)
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