define(["./URL","jquery","./getInitInfo"],function(e,a,t){var c={getdata:function(e){e.data?e.data.time=(new Date).getTime()+9999*Math.random():e.data={time:(new Date).getTime()+9999*Math.random()},layui.use(["layer"],function(){var t;0!=e.loadding&&(t=layer.load(1,{shade:.3})),a.ajax({url:e.url,type:e.type,dataType:e.dataType,data:e.data,success:function(a){if(layer.close(t),0==a.code)e.success(a);else{if(0==e.alert)return void e.success(a);if(a.code==-110)//未登录
return void(window.location.href="/#/login");a.code==-111,layer.confirm(a.message,{icon:2,title:"提示"},function(e){layer.close(e),location.reload()})}},error:function(){}})})},ajax:function(e){e.type=e.type||"get",e.dataType=e.dataType||"json",/*if(!quanjing.user){
				initInfo.getUserInfo({
					callback : function(){
						T.getdata(obj);
					}
				})
			}else{	*/
c.getdata(e)}},n={index:{index:function(a){c.ajax({url:e.index.index,type:"get",data:{},success:function(e){a.callback(e)},error:function(){}})}},permission:{//权限
listPermission:function(a){//权限列表接口
c.ajax({url:e.permission.listPermission,type:"get",data:{},success:function(e){a.callback(e)},error:function(){}})},currentMenuPermission:function(a){c.ajax({url:e.permission.currentMenuPermission,success:function(e){a.callback(e)}})},currentButtonPermission:function(a){//获取用户Menu下的Button权限
c.ajax({url:e.permission.currentButtonPermission,data:{id:a.id},success:function(e){a.callback(e)}})},delPermission:function(a){c.ajax({url:e.permission.delPermission,data:{id:a.id},success:function(e){a.callback(e)}})},createPermission:function(a){c.ajax({url:e.permission.createPermission,type:"post",data:{name:a.name,description:a.description,type:a.type,url:a.url,sort:a.sort,parentId:a.parentId,showFlag:a.showFlag,platform:a.platform,permission:a.permission},success:function(e){a.callback(e)}})},updatePermission:function(a){c.ajax({url:e.permission.updatePermission,type:"post",data:{id:a.id,name:a.name,description:a.description,type:a.type,url:a.url,sort:a.sort,parentId:a.parentId,showFlag:a.showFlag,platform:a.platform,permission:a.permission},success:function(e){a.callback(e)}})},listPositionPermission:function(a){c.ajax({url:e.permission.listPositionPermission,type:"get",data:{positionId:a.positionId},success:function(e){a.callback(e)},error:function(){}})},setPositionPermissions:function(a){c.ajax({url:e.permission.setPositionPermissions,type:"post",data:{positionId:a.positionId,permissionIds:a.permissionIds},success:function(e){a.callback(e)},error:function(){}})},createPositionPermission:function(a){c.ajax({url:e.permission.createPositionPermission,type:"post",data:{positionId:a.positionId,permissionId:a.permissionId},success:function(e){a.callback(e)},error:function(){}})},delPositionPermission:function(a){c.ajax({url:e.permission.delPositionPermission,type:"post",data:{positionId:a.positionId,permissionId:a.permissionId},success:function(e){a.callback(e)},error:function(){}})}},user:{currentUser:function(t){//当前登录用户信息接口
a.ajax({url:e.user.currentUser,success:function(e){t.callback(e)}})},userlist:function(a){//栏目列表
c.ajax({url:e.user.userlist,data:{page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)},error:function(){}})},createUser:function(t){//当前登录用户信息接口
a.ajax({url:e.user.createUser,type:"post",data:{userName:t.userName,realName:t.realName,idfa:t.idfa,pwd:t.pwd,headImage:t.headImage},success:function(e){t.callback(e)}})},updateUser:function(t){//当前登录用户信息接口
a.ajax({url:e.user.updateUser,type:"post",data:{realName:t.realName,idfa:t.idfa,pwd:t.pwd,headImage:t.headImage,userId:t.userId},success:function(e){t.callback(e)}})},delUser:function(a){//删除用户
c.ajax({url:e.user.delUser,data:{userId:a.userId},success:function(e){a.callback(e)},error:function(){}})}},position:{listPosition:function(a){c.ajax({url:e.position.listPosition,data:{},success:function(e){a.callback(e)},error:function(){}})},updatePosition:function(a){c.ajax({url:e.position.updatePosition,type:"post",data:{id:a.id,positionName:a.positionName},success:function(e){a.callback(e)},error:function(){}})},createPosition:function(a){c.ajax({url:e.position.createPosition,type:"post",data:{positionName:a.positionName},success:function(e){a.callback(e)},error:function(){}})},delPosition:function(a){c.ajax({url:e.position.delPosition,type:"get",data:{id:a.id},success:function(e){a.callback(e)},error:function(){}})},listUserPosition:function(a){c.ajax({url:e.position.listUserPosition,data:{userId:a.userId},success:function(e){a.callback(e)},error:function(){}})},setUserPosition:function(a){c.ajax({url:e.position.setUserPosition,data:{userId:a.userId,positionId:a.positionId},success:function(e){a.callback(e)},error:function(){}})},delUserPosition:function(a){c.ajax({url:e.position.delUserPosition,data:{userId:a.userId,positionId:a.positionId},success:function(e){a.callback(e)},error:function(){}})}},data:{//基础接口
all:function(t){//当前登录用户信息接口
a.ajax({url:e.data.all,success:function(e){t.callback(e)}})},compress:function(a){//图片是否压缩选项列表接口
c.ajax({url:e.data.compress,type:"get",data:{},success:function(e){a(e)},error:function(){}})},compressMode:function(a){//按照宽｜高等比压缩选项接口
c.ajax({url:e.data.compressMode,type:"get",data:{},success:function(e){a(e)},error:function(){}})},encoded:function(a){//模版支持的编码选项列表
c.ajax({url:e.data.encoded,type:"get",data:{},success:function(e){a(e)},error:function(){}})},job:function(a){//模版生成方式选项列表
c.ajax({url:e.data.job,type:"get",data:{},success:function(e){a(e)},error:function(){}})},permissionType:function(a){//权限类型选项列表
c.ajax({url:e.data.permissionType,type:"get",data:{},success:function(e){a(e)},error:function(){}})},relationType:function(a){//模版关系对应类型选项列表
c.ajax({url:e.data.relationType,type:"get",data:{},success:function(e){a(e)},error:function(){}})},showFlag:function(a){//权限是否显示在左侧选项列表
c.ajax({url:e.data.showFlag,type:"get",data:{},success:function(e){a(e)},error:function(){}})},templateClassify:function(a){//模版类型选项列表
c.ajax({url:e.data.templateClassify,success:function(e){a.callback(e)}})},watermark:function(a){//图片是否水印选项列表
c.ajax({url:e.data.watermark,type:"get",data:{},success:function(e){a(e)},error:function(){}})},buildMode:function(a){//图片是否水印选项列表
c.ajax({url:e.data.buildMode,type:"get",data:{},success:function(e){a(e)},error:function(){}})}},pretemplate:{//预模版加载
list:function(a){//预模版列表
c.ajax({url:e.pretemplate.list,success:function(e){a.callback(e)}})},listTemplate2:function(a){//预模版列表
c.ajax({url:e.pretemplate.listTemplate2,success:function(e){a.callback(e)}})},listTemplate2list:function(a){//获取list类型的第二模版列表 
c.ajax({url:e.pretemplate.listTemplate2list,success:function(e){a.callback(e)}})},listTemplate2detail:function(a){//获取list类型的第二模版列表 
c.ajax({url:e.pretemplate.listTemplate2detail,success:function(e){a.callback(e)}})}},news:{previousColumn:function(a){c.ajax({url:e.news.previousColumn,success:function(e){a.callback(e)}})},createNews:function(a){c.ajax({url:e.news.createNews,type:"POST",data:{title:a.title,subTitle:a.subTitle,keyword:a.keyword,description:a.description,source:a.source,author:a.author,channelId:a.channelId,//频道ID
columnId:a.columnId,//栏目ID
categoryId:a.categoryId,//部门分类ID
content:a.content,autoPublish:a.autoPublish,//1 是自动发布。0是不自动发布.默认不自动发布
timer:a.timer,//定时发布。//可不传,
field1:a.field1,field2:a.field2,field3:a.field3,field4:a.field4,field5:a.field5,publish:a.publish},success:function(e){a.callback(e)}})},createNewsColumn:function(a){c.ajax({url:e.news.createNewsColumn,type:"POST",data:{channelId:a.channelId,//频道ID
columnName:a.columnName,listId:a.listId,//预模版list接口返回的预模版ID. 不是必须
detailId:a.detailId,//预模版detail接口返回的预模版ID. 不是必须
listTemplate2Id:a.listTemplate2Id,//第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
detailTemplate2Id:a.detailTemplate2Id,//第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
keywords:a.keywords,//不是必须
description:a.description},success:function(e){a.callback(e)}})},newscolumnlist:function(a){//栏目列表
c.ajax({url:e.news.newscolumnlist,data:{channelId:a.channelId},success:function(e){a.callback(e)}})},newscolumn_list:function(a){//栏目列表
c.ajax({url:e.news.newscolumn_list,data:{page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)}})},newslist:function(a){//新闻栏目列表
c.ajax({url:e.news.newslist,type:"get",data:{page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)}})},newscolumn:function(a){//获取获取栏目信息
c.ajax({url:e.news.newscolumn,data:{id:a.id},success:function(e){a.callback(e)}})},newsdetail:function(a){//获取新闻详细信息
c.ajax({url:e.news.newsdetail,type:"get",data:{id:a.id},success:function(e){a.callback(e)}})},delNews:function(a){//删除新闻
c.ajax({url:e.news.delNews,data:{id:a.id},success:function(e){a.callback(e)}})},updateNews:function(a){//修改新闻
c.ajax({url:e.news.updateNews,type:"POST",data:{title:a.title,subTitle:a.subTitle,keyword:a.keyword,description:a.description,source:a.source,author:a.author,channelId:a.channelId,//频道ID
columnId:a.columnId,//栏目ID
categoryId:a.categoryId,content:a.content,id:a.id,field1:a.field1,field2:a.field2,field3:a.field3,field4:a.field4,field5:a.field5,autoPublish:a.autoPublish,//1 是自动发布。0是不自动发布.默认不自动发布
timer:a.timer},success:function(e){a.callback(e)}})},delNewsColumn:function(a){//删除新闻栏目
c.ajax({url:e.news.delNewsColumn,data:{id:a.id},success:function(e){a.callback(e)}})},mynewslist:function(a){//我的新闻栏目列表
c.ajax({url:e.news.mynewslist,type:"get",data:{publish:a.publish,page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)}})},recommendColumnlist:function(a){c.ajax({url:e.news.recommendColumnlist,success:function(e){a.callback(e)}})},recommend:function(a){c.ajax({url:e.news.recommend,type:"post",data:{id:a.id,recommendTitle:a.recommendTitle,recommendDescription:a.recommendDescription,recommendImages:a.recommendImages,recommendColumnId:a.recommendColumnId,sort:a.sort},success:function(e){a.callback(e)}})},recommendNewsInfo:function(a){c.ajax({url:e.news.recommendNewsInfo,type:"get",data:{id:a.id},success:function(e){a.callback(e)}})},updateNewsColumn:function(a){//修改栏目
c.ajax({url:e.news.updateNewsColumn,type:"post",data:{id:a.id,channelId:a.channelId,//频道ID //不是必须
columnName:a.columnName,//不是必须
listId:a.listId,//预模版list接口返回的预模版ID. 不是必须
detailId:a.detailId,//预模版detail接口返回的预模版ID. 不是必须
listTemplate2Id:a.listTemplate2Id,//第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
detailTemplate2Id:a.detailTemplate2Id,//第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
keywords:a.keywords,//不是必须
description:a.description},success:function(e){a.callback(e)}})},relationColumnList:function(a){c.ajax({url:e.news.relationColumnList,success:function(e){a.callback(e)}})},createRecommendColumn:function(a){c.ajax({url:e.news.createRecommendColumn,type:"post",data:{columnName:a.columnName},success:function(e){a.callback(e)}})},updateRecommendColumn:function(a){c.ajax({url:e.news.updateRecommendColumn,type:"post",data:{id:a.id,columnName:a.columnName},success:function(e){a.callback(e)}})},publish:function(a){c.ajax({url:e.news.publish,data:{id:a.id},success:function(e){a.callback(e)}})}},category:{//部门分类
listCategory:function(a){// 部门分类列表
c.ajax({url:e.category.listCategory,type:"get",success:function(e){a.callback(e)}})},delCategory:function(a){// 删除部门
c.ajax({url:e.category.delCategory,type:"get",data:{id:a.id},success:function(e){a.callback(e)}})},createCategory:function(a){//创建分类
c.ajax({url:e.category.createCategory,type:"post",data:{categoryName:a.categoryName,categoryDesc:a.categoryDesc},success:function(e){a.callback(e)}})},updateCategory:function(a){c.ajax({url:e.category.updateCategory,type:"post",data:{id:a.id,categoryName:a.categoryName,categoryDesc:a.categoryDesc},success:function(e){a.callback(e)}})}},channel:{//取频道分类管理
listChannel:function(a){//栏目列表
c.ajax({url:e.channel.listChannel,success:function(e){a.callback(e)}})},currentChannelList:function(a){c.ajax({url:e.channel.currentChannelList,data:{categoryId:a.categoryId},success:function(e){a.callback(e)}})},createChannel:function(a){c.ajax({url:e.channel.createChannel,type:"post",data:{categoryId:a.categoryId,channelName:a.channelName,channelUrl:a.channelUrl,channelPath:a.channelPath,templatePath:a.templatePath,channelDesc:a.channelDesc},success:function(e){a.callback(e)},error:function(){}})},updateChannel:function(a){c.ajax({url:e.channel.updateChannel,type:"post",data:{id:a.id,categoryId:a.categoryId,channelName:a.channelName,channelUrl:a.channelUrl,channelPath:a.channelPath,templatePath:a.templatePath,channelDesc:a.channelDesc},success:function(e){a.callback(e)},error:function(){}})},delChannel:function(a){//栏目列表
c.ajax({url:e.channel.delChannel,data:{id:a.id},success:function(e){a.callback(e)}})}},image:{imageslist:function(a){//栏目列表
c.ajax({url:e.images.imageslist,type:"get",data:{page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)},error:function(){}})},createImages:function(a){c.ajax({url:e.images.createImages,type:"post",data:{imageUrl:a.imageUrl,imageWidthPixel:a.imageWidthPixel,imageHeightPixel:a.imageHeightPixel,// 图片宽像素  图片上传接口返回
orgWidthPixel:a.orgWidthPixel,//原始长像素  图片上传接口返回
orgHeightPixel:a.orgHeightPixel,//原始宽像素  图片上传接口返回
imageTitle:a.imageTitle,imagePath:a.imagePath,watermark:a.watermark,//是否水印 1、0
compress:a.compress,//是否压缩
fid:a.fid,//图片上传接口返回
size:a.size},success:function(e){a.callback(e)},error:function(){}})},updateImages:function(a){c.ajax({url:e.images.updateImages,type:"post",data:{id:a.id,imageUrl:a.imageUrl,imageWidthPixel:a.imageWidthPixel,imageHeightPixel:a.imageHeightPixel,// 图片宽像素  图片上传接口返回
orgWidthPixel:a.orgWidthPixel,//原始长像素  图片上传接口返回
orgHeightPixel:a.orgHeightPixel,//原始宽像素  图片上传接口返回
imageTitle:a.imageTitle,imagePath:a.imagePath,watermark:a.watermark,//是否水印 1、0
compress:a.compress,//是否压缩
fid:a.fid,//图片上传接口返回
size:a.size},success:function(e){a.callback(e)},error:function(){}})},delImage:function(a){//栏目列表
c.ajax({url:e.images.delImages,type:"get",data:{id:a.id},success:function(e){a.callback(e)},error:function(){}})},imageBase:function(a){//栏目列表
c.ajax({url:e.images.imagesBase,type:"get",success:function(e){a.callback(e)},error:function(){}})},createImageBase:function(a){//栏目列表
c.ajax({url:e.images.createImagesBase,type:"post",data:{baseUrl:a.baseUrl,basePath:a.basePath},success:function(e){a.callback(e)},error:function(){}})},updateImageBase:function(a){//栏目列表
c.ajax({url:e.images.updateImagesBase,type:"post",data:{id:a.id,baseUrl:a.baseUrl,basePath:a.basePath},success:function(e){a.callback(e)},error:function(){}})}},video:{videoBase:function(a){c.ajax({url:e.video.videoBase,type:"get",data:{},success:function(e){a.callback(e)},error:function(){}})},updateVideoBase:function(a){c.ajax({url:e.video.updateVideoBase,type:"post",data:{id:a.id,baseUrl:a.baseUrl,basePath:a.basePath},success:function(e){a.callback(e)},error:function(){}})},createVideoBase:function(a){c.ajax({url:e.video.createVideoBase,type:"post",data:{baseUrl:a.baseUrl,basePath:a.basePath},success:function(e){a.callback(e)},error:function(){}})},videolist:function(a){//获取视频列表
c.ajax({url:e.video.videolist,type:"get",data:{page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)},error:function(){}})},delVideo:function(a){//获取视频列表
c.ajax({url:e.video.delVideo,type:"get",data:{id:a.id},success:function(e){a.callback(e)},error:function(){}})},createVideo:function(a){//获取视频列表
c.ajax({url:e.video.createVideo,type:"post",data:{videoTitle:a.videoTitle,videoDesc:a.videoDesc,videoUrl:a.videoUrl,videoPath:a.videoPath,fileName:a.fileName},success:function(e){a.callback(e)},error:function(){}})},updateVideo:function(a){//获取视频列表
c.ajax({url:e.video.updateVideo,type:"post",data:{id:a.id,videoTitle:a.videoTitle,videoDesc:a.videoDesc,videoUrl:a.videoUrl,videoPath:a.videoPath,fileName:a.fileName},success:function(e){a.callback(e)},error:function(){}})}},template:{//模版
listTemplate:function(a){//模版列表［分页］ 接口
c.ajax({url:e.template.listTemplate,data:{page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)}})},template:function(a){//读取所有的模版对应的关系列表 接口
c.ajax({url:e.template.listTemplate,data:{templateId:a.templateId,relationType:a.relationType},success:function(e){a.callback(e)}})},templateInfo:function(a){//模版详细信息 接口
c.ajax({url:e.template.templateInfo,data:{id:a.id},success:function(e){a.callback(e)}})},relation:function(a){//模版详细信息 接口
c.ajax({url:e.template.relation,data:{templateId:a.templateId,relationType:a.relationType},success:function(e){a.callback(e)}})},createTemplate:function(a){//读取所有的模版对应的关系列表 接口
c.ajax({url:e.template.createTemplate,type:"POST",data:{templateName:a.templateName,templateDesc:a.templateDesc,filename:a.filename,path:a.path,templateClassify:a.templateClassify,job:a.job,//是否定时生成。1是定时生成。0是触发生成
encoded:a.encoded,channelId:a.channelId,//频道ID
sortNum:a.sortNum},success:function(e){a.callback(e)}})},updateTemplate:function(a){//模版修改 接口
c.ajax({url:e.template.updateTemplate,type:"POST",data:{id:a.id,templateName:a.templateName,templateDesc:a.templateDesc,filename:a.filename,path:a.path,templateClassify:a.templateClassify,job:a.job,//是否定时生成。1是定时生成。0是触发生成
encoded:a.encoded,channelId:a.channelId,//频道ID
sortNum:a.sortNum},success:function(e){a.callback(e)}})},delTemplate:function(a){//删除模版
c.ajax({url:e.template.delTemplate,data:{id:a.id},success:function(e){a.callback(e)}})},downTemplate:function(a){//模版下载
window.location.href=e.template.downTemplate+"?id="+a.id},createRelation:function(a){//新增模版关系 接口
c.ajax({url:e.template.createRelation,loadding:!1,type:"post",data:{templateId:a.templateId,relationId:a.relationId,relationType:a.relationType},success:function(e){a.callback(e)}})},delRelation:function(a){//新增模版关系 接口
c.ajax({url:e.template.delRelation,loadding:!1,type:"post",data:{templateId:a.templateId,relationId:a.relationId,relationType:a.relationType},success:function(e){a.callback(e)}})},uploadTemplate:function(a){//上传模板 接口
c.ajax({url:e.template.uploadTemplate,type:"post",data:{baseCode:a.baseCode,id:a.id},success:function(e){a.callback(e)}})},createTemplate2:function(a){c.ajax({url:e.template.createTemplate2,type:"post",data:{templateName:a.templateName,filename:a.filename,path:a.path,templateClassify:a.templateClassify,encoded:a.encoded},success:function(e){a.callback(e)}})},listTemplate2:function(a){c.ajax({url:e.template.listTemplate2,data:{page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)}})},delTemplate2:function(a){c.ajax({url:e.template.delTemplate2,data:{id:a.id},success:function(e){a.callback(e)}})},uploadTemplate2:function(a){//上传模板 接口
c.ajax({url:e.template.uploadTemplate2,type:"post",data:{baseCode:a.baseCode,id:a.id},success:function(e){a.callback(e)}})},downTemplate2:function(a){window.location.href=e.template.downTemplate2+"?id="+a.id},template2Info:function(a){c.ajax({url:e.template.template2Info,data:{id:a.id},success:function(e){a.callback(e)}})},template2base:function(a){c.ajax({url:e.template.template2base,data:{},success:function(e){a.callback(e)}})},updateTemplate2base:function(a){c.ajax({url:e.template.updateTemplate2base,type:"post",data:{id:a.id,basePath:a.basePath},success:function(e){a.callback(e)}})},updateTemplate2:function(a){c.ajax({url:e.template.updateTemplate2,type:"post",data:{id:a.id,templateName:a.templateName,filename:a.filename,path:a.path,templateClassify:a.templateClassify,encoded:a.encoded},success:function(e){a.callback(e)}})}},topic:{//专题
createTopicColumn:function(a){//新建专题分类
c.ajax({url:e.topic.createTopicColumn,type:"POST",data:{name:a.name},success:function(e){a.callback(e)}})},createTopic:function(a){//新建专题分类
c.ajax({url:e.topic.createTopic,type:"POST",data:{topicTitle:a.topicTitle,topicContent:a.topicContent,topicPath:a.topicPath,topicFilename:a.topicFilename,topicClassifyId:a.topicClassifyId,//专题分类ID
categoryId:a.categoryId,//部门类别ID
channelId:a.channelId,//频道ID
releaseTime:a.releaseTime,//发布时间
keyword:a.keyword,description:a.description,topicColumnId:a.topicColumnId},success:function(e){a.callback(e)}})},updateTopic:function(a){//新建专题分类
c.ajax({url:e.topic.updateTopic,type:"POST",data:{id:a.id,topicTitle:a.topicTitle,topicContent:a.topicContent,topicPath:a.topicPath,topicFilename:a.topicFilename,topicClassifyId:a.topicClassifyId,//专题分类ID
categoryId:a.categoryId,//部门类别ID
channelId:a.channelId,//频道ID
releaseTime:a.releaseTime,//发布时间
keyword:a.keyword,description:a.description,topicColumnId:a.topicColumnId},success:function(e){a.callback(e)}})},listTopic:function(a){//模版列表［分页］ 接口
c.ajax({url:e.topic.listTopic,data:{pageSize:a.pageSize,page:a.page},success:function(e){a.callback(e)}})},topicInfo:function(a){//专题详情 接口
c.ajax({url:e.topic.topicInfo,data:{id:a.id},success:function(e){a.callback(e)}})},topicClassifyList:function(a){//模版列表［分页］ 接口
c.ajax({url:e.topic.topicClassifyList,success:function(e){a.callback(e)}})},topicColumnList:function(a){//专题分类栏目列表 接口
c.ajax({url:e.topic.topicColumnList,success:function(e){a.callback(e)}})},delTopicColumn:function(a){//删除分类栏目列表
c.ajax({url:e.topic.delTopicColumn,data:{id:a.id},success:function(e){a.callback(e)}})},delTopic:function(a){//删除分类栏目列表
c.ajax({url:e.topic.delTopic,data:{id:a.id},success:function(e){a.callback(e)}})},delTopicClassify:function(a){//删除专题分类 
c.ajax({url:e.topic.delTopicClassify,data:{id:a.id},success:function(e){a.callback(e)}})},updateTopicColumn:function(a){//删除分类栏目列表
c.ajax({url:e.topic.updateTopicColumn,type:"POST",data:{id:a.id,name:a.name},success:function(e){a.callback(e)}})},createTopicClassify:function(a){//更新专题分类
c.ajax({url:e.topic.createTopicClassify,type:"POST",data:{name:a.name},success:function(e){a.callback(e)}})},updateTopicClassify:function(a){//更新专题分类
c.ajax({url:e.topic.updateTopicClassify,type:"POST",data:{id:a.id,name:a.name},success:function(e){a.callback(e)}})}},userchannel:{//用户频道编辑权限
channelId:function(a){//根据频道ID获取用户列表 接口
c.ajax({url:e.userchannel.channelId,type:"get",data:{},success:function(e){a(e)}})},userId:function(a){//根据用户ID获取频道列表
c.ajax({url:e.userchannel.userId,type:"get",data:{},success:function(e){a(e)}})},createUserChannel:function(a){c.ajax({url:e.userchannel.createUserChannel,type:"post",data:{userId:a.userId,channelId:a.channelId},success:function(e){a.callback(e)}})},delUserChannel:function(a){c.ajax({url:e.userchannel.delUserChannel,type:"post",data:{userId:a.userId,channelId:a.channelId},success:function(e){a.callback(e)}})},userChannelIds:function(a){c.ajax({url:e.userchannel.userChannelIds,type:"get",data:{userId:a.userId},success:function(e){a.callback(e)}})}},fragment:{list:function(a){//获取碎片列表
c.ajax({url:e.fragment.list,success:function(e){a.callback(e)}})},listFragment:function(a){//获取碎片列表
c.ajax({url:e.fragment.listFragment,type:"get",data:{page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)}})},findFragment:function(a){//获取碎片详细信息
c.ajax({url:e.fragment.findFragment,type:"get",data:{id:a.id},success:function(e){a.callback(e)}})},delFragment:function(a){//删除碎片
c.ajax({url:e.fragment.delFragment,type:"get",data:{id:a.id},success:function(e){a.callback(e)}})},editFragment:function(a){c.ajax({url:e.fragment.editFragment,type:"post",data:{id:a.id,values:a.values.toString()},success:function(e){a.callback(e)}})},fragmentMap:function(a){//获取编辑碎片的Map维护信息
c.ajax({url:e.fragment.fragmentMap,type:"get",data:{id:a.id},success:function(e){a.callback(e)}})},updateFragment:function(a){//修改碎片
c.ajax({url:e.fragment.updateFragment,type:"post",data:{id:a.id,channelId:a.channelId,fragmentClassifyId:a.fragmentClassifyId,fragmentName:a.fragmentName,sortNum:a.sortNum,fragmentModel:a.fragmentModel},success:function(e){a.callback(e)}})},createFragment:function(a){//创建碎片信息
c.ajax({url:e.fragment.createFragment,type:"post",data:{channelId:a.channelId,fragmentClassifyId:a.fragmentClassifyId,fragmentName:a.fragmentName,sortNum:a.sortNum,fragmentModel:a.fragmentModel},success:function(e){a.callback(e)}})},listHistory:function(a){//碎片编辑的历史纪录［分页查询］
c.ajax({url:e.fragment.listHistory,type:"get",data:{},success:function(e){a(e)}})},listClassify:function(a){//碎片分类列表
c.ajax({url:e.fragment.listClassify,type:"get",data:{},success:function(e){a.callback(e)}})},createClassify:function(a){//新建碎片分类
c.ajax({url:e.fragment.createClassify,type:"post",data:{classifyName:a.classifyName},success:function(e){a.callback(e)}})},updateClassify:function(a){//分类修改
c.ajax({url:e.fragment.updateClassify,type:"post",data:{id:a.id,classifyName:a.classifyName},success:function(e){a.callback(e)}})},delClassify:function(a){//删除分类
c.ajax({url:e.fragment.delClassify,type:"get",data:{id:a.id},success:function(e){a.callback(e)}})},publish:function(a){//发布
c.ajax({url:e.fragment.publish,type:"get",data:{id:a.id},success:function(e){a.callback(e)}})}},upload:{uploadImage:function(a){//发布
c.ajax({url:e.upload.uploadImage,type:"post",data:{baseCode:a.baseCode,suffix:a.suffix,//"文件后缀png|jpg"
watermark:a.watermark,//是否水印
width:a.width,//需要压缩的长度 可不传
height:a.height},success:function(e){a.callback(e)}})},cancelVideo:function(a){//视频取消
c.ajax({url:e.upload.cancelVideo,type:"post",data:{fileName:a.fileName},success:function(e){a.callback(e)}})}},search:{searchNew:function(a){c.ajax({url:e.search.searchNew,type:"post",data:{
//所有参数都不是必传项
id:a.newsId,buildUserName:a.buildUserName,lastModifyUserName:a.lastModifyUserName,condition:a.condition,author:a.author,source:a.source,categoryId:a.categoryId,//部门分类ID
channelId:a.channelId,//频道ID
columnId:a.columnId,//栏目ID
platform:a.platform,//平台,
startTime:a.startTime,//创建时间
endTime:a.endTime,//创建时间
page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)}})},searchTopic:function(a){c.ajax({url:e.search.searchTopic,type:"post",data:{
//所有参数都不是必传项
condition:a.condition,topicClassifyId:a.topicClassifyId,//专题分类ID
categoryId:a.categoryId,//部门分类ID
channelId:a.channelId,//频道ID
topicColumnId:a.topicColumnId,//系列专题类型ID
releaseTime:a.releaseTime,//发布时间,
startTime:a.startTime,//创建时间
endTime:a.endTime,//创建时间
page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)}})},searchImages:function(a){c.ajax({url:e.search.searchImages,type:"post",data:{
//所有参数都不是必传项
condition:a.condition,page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)}})},searchVideo:function(a){c.ajax({url:e.search.searchVideo,type:"post",data:{
//所有参数都不是必传项
condition:a.condition,page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)}})},searchUser:function(a){c.ajax({url:e.search.searchUser,type:"post",data:{
//所有参数都不是必传项
condition:a.condition,page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)}})},searchFragment:function(a){c.ajax({url:e.search.searchFragment,type:"post",data:{
//所有参数都不是必传项
condition:a.condition,fragmentClassifyId:a.fragmentClassifyId,channelId:a.channelId,page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)}})},searchTemplate:function(a){c.ajax({url:e.search.searchTemplate,type:"post",data:{
//所有参数都不是必传项
condition:a.condition,channelId:a.channelId,page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)}})},searchTemplate2:function(a){c.ajax({url:e.search.searchTemplate2,type:"post",data:{
//所有参数都不是必传项
condition:a.condition,page:a.page,pageSize:a.pageSize},success:function(e){a.callback(e)}})}}};return n});