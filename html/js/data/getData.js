define(['./URL','jquery'],function(URL,$){
	return {
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
		}
	}
});