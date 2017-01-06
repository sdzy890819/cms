define(['./URL','jquery'],function(URL,$){
	var public = {
		permission : {//权限
			listPermission:function( callback ){ //权限列表接口
				$.ajax({
					url : URL.permission.listPermission , 
					type : 'get',
					data : {},
					success : function( _data ){
						setTimeout(function(){
							callback({
							    "code":0,
							    "message":"成功",
							    "data":{
							        
						            "permission":{
						                "name":"名称",
						                "description":"说明",
						                "type":1,//type 1 是 menu、2 是 button
						                "url":"http://www/",
						                "sort":1, //排序
						                "parentId":1, //父ID
						                "showFlag":1, //1展示、0 不展示。展示的话 就在左侧菜单展示
						                "permission":"user:read" //权限CODE代码
						            },
						            "permissions":[
						                {
						                    "name":"名称",
						                    "description":"说明",
						                    "type":1,//type 1 是 menu、2 是 button
						                    "url":"http://www/",
						                    "sort":1, //排序
						                    "parentId":1, //父ID
						                    "showFlag":1, //1展示、0 不展示。展示的话 就在左侧菜单展示
						                    "permission":"user:read" //权限CODE代码
						                },
						                {
						                    "name":"名称",
						                    "description":"说明",
						                    "type":1,//type 1 是 menu、2 是 button
						                    "url":"http://www/",
						                    "sort":1, //排序
						                    "parentId":1, //父ID
						                    "showFlag":1, //1展示、0 不展示。展示的话 就在左侧菜单展示
						                    "permission":"user:read" //权限CODE代码
						                }
						            ]
							        
							    }
							});
						}, 1000);
					},
					error : function(){}
				})
			},
			currentButtonPermission : function( callback ){ //获取用户Menu下的Button权限
				$.ajax({
					url : URL.permission.currentButtonPermission , 
					type : 'get',
					data : {},
					success : function(_data){
						callback({
						    "code":0,
						    "message":"成功",
						    "data":[
				                {
				                    "name":"名称",
				                    "description":"说明",
				                    "type":2,//type 1 是 menu、2 是 button
				                    "url":"http://www/",
				                    "sort":1, //排序
				                    "parentId":1, //父ID
				                    "showFlag":1, //1展示、0 不展示。展示的话 就在左侧菜单展示
				                    "permission":"user:read" //权限CODE代码
				                },
				                {
				                    "name":"名称",
				                    "description":"说明",
				                    "type":2,//type 1 是 menu、2 是 button
				                    "url":"http://www/",
				                    "sort":1, //排序
				                    "parentId":1, //父ID
				                    "showFlag":1, //1展示、0 不展示。展示的话 就在左侧菜单展示
				                    "permission":"user:read" //权限CODE代码
				                }
				            ]
						});
					},
					error : function(){}
				})
			}
		},
		user : {
			currentUser : function( callback ){ //当前登录用户信息接口
				$.ajax({
					url : URL.user.currentUser , 
					type : 'get',
					data : {},
					success : function(_data){
						callback({
						    "code":0,
						    "message":"成功",
						    "data":{
						        "id":1,
						        "headImage":"http://xxx/aa.png",//头像
						        "realName":"真实名",//真实名
						        "userId":"110820091891029920", //用户ID
						        "lastModifyUserId":"10111920300192" //修改人
						    }
						});
					},
					error : function(){}
				})
			},
			userlist : function( callback ){ //栏目列表
				$.ajax({
					url : URL.user.userlist , 
					type : 'get',
					data : {},
					success : function( _data ){
						setTimeout(function(){
							callback({
							    "code":0,
							    "message":"成功",
							    "data":{
							        "page":{
							            "count":10, //总数
							            "pageCount":1, //总页数
							            "page":1, //当前页
							            "pageSize":20 //每页数量
							        },
							        "list":[
								        {
								            "id":1,
								            "headImage":"http://xxx/aa.png",//头像
								            "realName":"真实名",//真实名
								            "userId":"110820091891029920", //用户ID
								            "lastModifyUserId":"10111920300192" //修改人
								        }
							        ]
							    }
							});
						}, 1000);
					},
					error : function(){}
				})
			}
		},
		data : {//基础接口
			compress : function(callback){//图片是否压缩选项列表接口
				$.ajax({
					url : URL.data.compress , 
					type : 'get',
					data : {},
					success : function( _data ){
						
					},
					error : function(){}
				})
			},
			compressMode : function(callback){//按照宽｜高等比压缩选项接口
				$.ajax({
					url : URL.data.compressMode , 
					type : 'get',
					data : {},
					success : function( _data ){
						
					},
					error : function(){}
				})
			},
			encoded : function(callback){//模版支持的编码选项列表
				$.ajax({
					url : URL.data.encoded , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback({
							"code":0,
						    "data":[
					            {
					                    "type":1,
					                    "name":"UTF-8"
					            },
					            {
					                    "type":2,
					                    "name":"GBK"
					            },
					            {
					                    "type":3,
					                    "name":"BIG5"
					            }
						    ],
						    "message":"成功!"
						})
					},
					error : function(){}
				})
			},
			job : function(callback){//模版生成方式选项列表
				$.ajax({
					url : URL.data.job , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback({
							"code":0,
						    "data":[
					            {
					                    "type":1,
					                    "name":"定时生成"
					            },
					            {
					                    "type":0,
					                    "name":"触发生成"
					            }
						    ],
						    "message":"成功!"
						})
					},
					error : function(){}
				})
			},
			permissionType : function(callback){//权限类型选项列表
				$.ajax({
					url : URL.data.permissionType , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback({
							"code":0,
						    "data":[
					            {
					                    "type":1,
					                    "name":"MENU"
					            },
					            {
					                    "type":2,
					                    "name":"BUTTON"
					            }
						    ],
						    "message":"成功!"
						})
					},
					error : function(){}
				})
			},
			relationType : function(callback){//模版关系对应类型选项列表
				$.ajax({
					url : URL.data.relationType , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback({
						    "code":0,
						    "data":[
						            {
						                    "type":3,
						                    "name":"专题分类ID"
						            },
						            {
						                    "type":2,
						                    "name":"碎片ID"
						            },
						            {
						                    "type":1,
						                    "name":"栏目ID"
						            }
						    ],
						    "message":"成功!"
						})
					},
					error : function(){}
				})
			},
			showFlag : function(callback){//权限是否显示在左侧选项列表
				$.ajax({
					url : URL.data.showFlag , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback({
						    "code":0,
						    "data":[
						            {
						                    "type":1,
						                    "name":"YES"
						            },
						            {
						                    "type":0,
						                    "name":"NO"
						            }
						    ],
						    "message":"成功!"
						})
					},
					error : function(){}
				})
			},
			templateClassify : function(callback){//模版类型选项列表
				$.ajax({
					url : URL.data.templateClassify , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback({
						    "code":0,
						    "data":[
						            {
						                    "type":1,
						                    "name":"首页"
						            },
						            {
						                    "type":2,
						                    "name":"列表页"
						            },
						            {
						                    "type":3,
						                    "name":"详情页"
						            },
						            {
						                    "type":4,
						                    "name":"碎片页"
						            }
						    ],
						    "message":"成功!"
						})
					},
					error : function(){}
				})
			},
			watermark : function(callback){//图片是否水印选项列表
				$.ajax({
					url : URL.data.watermark , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback({
						    "code":0,
						    "data":[
						            {
						                    "type":1,
						                    "name":"水印"
						            },
						            {
						                    "type":0,
						                    "name":"不打水印"
						            }
						    ],
						    "message":"成功!"
						})
					},
					error : function(){}
				})
			},
			buildMode : function(callback){//图片是否水印选项列表
				$.ajax({
					url : URL.data.buildMode , 
					type : 'get',
					data : {},
					success : function( _data ){
						callback({
						    "code":0,
						    "data":[
						        {
						            "type":1,
						            "name":"随机生成"
						        },
						        {
						            "type":2,
						            "name":"栏目ID"
						        }
						    ],
						    "message":"成功!"
						})
					},
					error : function(){}
				})
			}
		},
		news : {
			newscolumnlist : function( callback ){ //栏目列表
				$.ajax({
					url : URL.news.newscolumnlist , 
					type : 'get',
					data : {},
					success : function( _data ){
						setTimeout(function(){
							callback({
							    "code":0,
							    "message":"成功",
							    "data":{
							        "page":{
							            "pageSize":20,
							            "count":100,
							            "pageCount":5,
							            "page":1
							        },
							        "list":[
							            {
							                "columnName":"栏目名",
							                "channelId":"频道ID",
							                "id":1
							            }
							        ]
							    }
							});
						}, 1000);
					},
					error : function(){}
				})
			},
			newslist : function( callback ){ //栏目列表
				$.ajax({
					url : URL.news.newslist , 
					type : 'get',
					data : {},
					success : function( _data ){
						setTimeout(function(){
							callback({
							    "code":0,
							    "message":"成功",
							    "data":{
							        "page":{
							            "pageSize":20,
							            "count":100,
							            "pageCount":5,
							            "page":1
							        },
							        "list":[
							            {
							                "id":1,
							                "title":"标题",
							                "source":"来源",
							                "author":"作者",
							                "channelId":10,//频道ID
							                "columnId":10,//栏目ID
							                "write_user_id":"123123213123123123",//撰稿人
							                "writeUserName":"撰稿人",
							                "platform":1,
							                "platformStr":"平台名称"
							            }
							        ]
							    }
							});
						}, 1000);
					},
					error : function(){}
				})
			}
		},
		category : { //部门分类
			listCategory : function( callback ){ //栏目列表
				$.ajax({
					url : URL.category.listCategory , 
					type : 'get',
					data : {},
					success : function( _data ){
						setTimeout(function(){
							callback({
							    "code":0,
							    "message":"成功",
							    "data":[
							        {
							            "categoryName":"分类名",
							            "categoryDesc":"分类说明",
							            "id":100
							        }
							    ]
							});
						}, 1000);
					},
					error : function(){}
				})
			}
		},
		channel : {//取频道分类管理
			listChannel : function( callback ){ //栏目列表
				$.ajax({
					url : URL.category.listCategory , 
					type : 'get',
					data : {},
					success : function( _data ){
						setTimeout(function(){
							callback({
							    "code":0,
							    "message":"成功",
							    "data":[
							        {
							            "channelName":"频道名称",
							            "channelUrl":"频道域名",
							            "channelPath":"频道绝对路径",
							            "templatePath":"模版位置",
							            "channelDesc":"频道说明",
							            "categoryId":1, //部门分类ID
							            "id":1
							        }
							    ]
							});
						}, 1000);
					},
					error : function(){}
				})
			}
		},
		image : {
			imageslist : function( callback ){ //栏目列表
				$.ajax({
					url : URL.category.listCategory , 
					type : 'get',
					data : {},
					success : function( _data ){
						setTimeout(function(){
							callback({
							    "code":0,
							    "message":"成功",
							    "data":{
							        "page":{
							            "pageSize":20,
							            "count":100,
							            "pageCount":5,
							            "page":1
							        },
							        "list":[
							        	{
								            "imageUrl":"图片地址",
								            "imageWidthPixel":200, //图片长像素
								            "imageHeightPixel":100, // 图片宽像素
								            "orgWidthPixel":200, //原始长像素
								            "orgHeightPixel":100, //原始宽像素
								            "imageTitle":"图片标题",
								            "uploadUserId":"123213213123123",
								            "uploadTime":"上传时间",
								            "imagePath":"图片相对路径",
								            "watermark":1, //是否水印 1、0
								            "compress":1, //是否压缩
								            "platform":1, //平台
								            "id":1 //ID
							      		}
							        ]
							    }
							});
						}, 1000);
					},
					error : function(){}
				})
			}
		},
		video : {
			videolist : function( callback ){ //获取视频列表
				$.ajax({
					url : URL.video.videolist , 
					type : 'get',
					data : {},
					success : function( _data ){
						setTimeout(function(){
							callback({
							    "code":0,
							    "message":"成功",
							    "data":{
							        "page":{
							            "pageSize":20,
							            "count":100,
							            "pageCount":5,
							            "page":1
							        },
							        "list":[
							            {
							                "videoTitle":"视频标题",
							                "videoDesc":"视频说明",
							                "videoUrl":"视频链接URL",
							                "videoPath":"视频相对路径",
							                "uploadUserId":"111111111111111", //上传人
							                "uploadTime":"上传时间",
							                "platform":1, //平台
							                "id":1
							            }
							        ]       
							    }
							});
						}, 1000);
					},
					error : function(){}
				})
			}
		},
		template : { //模版
			listTemplate : function( callback ){//模版列表［分页］ 接口
				$.ajax({
					url : URL.template.listTemplate , 
					type : 'get',
					data : {},
					success : function( _data ){
						setTimeout(function(){
							callback({
							    "code":0,
							    "message":"成功",
							    "data":{
							        "page":{
							            "pageSize":20,
							            "count":100,
							            "pageCount":5,
							            "page":1
							        },
							        "list":[
							            {
							                "templateName":"模版名称",
							                "templateDesc":"模版说明",
							                "filename":"模版、发布文件名",
							                "path":"发布目录",
							                "templateClassify":1,
							                "templateClassifyStr":"模版分类、1为首页、2为列表页、3为详情页、4、碎片页",
							                "userId":"模版编辑人ID",
							                "job":1, //是否定时生成。1是定时生成。0是触发生成
							                "encoded":"目前支持GBK、UTF-8、BIG5、按照字符串形式存储",
							                "channelId":1,//频道ID
							                "sortNum":1,//排序值
							                "id":1
							            },
							            {
							                "templateName":"模版名称",
							                "templateDesc":"模版说明",
							                "filename":"模版、发布文件名",
							                "path":"发布目录",
							                "templateClassify":1,
							                "templateClassifyStr":"碎片页",
							                "userId":"模版编辑人ID",
							                "job":0, //是否定时生成。1是定时生成。0是触发生成
							                "encoded":"UTF-8",
							                "channelId":1,//频道ID
							                "sortNum":1,//排序值
							                "id":1
							            }
							        ]
							    }
							});
						}, 1000);
					},
					error : function(){}
				});
			}
		}
	}
	return public;
});