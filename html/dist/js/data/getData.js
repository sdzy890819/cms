define(["./URL","jquery","./getInitInfo"],function(URL,$,initInfo){var T={getdata:function(obj){obj.data?obj.data.time=(new Date).getTime()+9999*Math.random():obj.data={time:(new Date).getTime()+9999*Math.random()},layui.use(["layer"],function(){var loadding;0!=obj.loadding&&(loadding=layer.load(1,{shade:.3})),$.ajax({url:obj.url,type:obj.type,dataType:obj.dataType,data:obj.data,success:function(_data){if(layer.close(loadding),0==_data.code)obj.success(_data);else{if(0==obj.alert)return void obj.success(_data);if(-110==_data.code)return void(window.location.href="/#/login");_data.code,layer.confirm(_data.message,{icon:2,title:"提示"},function(index){layer.close(index),location.reload()})}},error:function(){}})})},ajax:function(obj){obj.type=obj.type||"get",obj.dataType=obj.dataType||"json",T.getdata(obj)}};return{index:{index:function(obj){T.ajax({url:URL.index.index,type:"get",data:{},success:function(_data){obj.callback(_data)},error:function(){}})}},permission:{listPermission:function(obj){T.ajax({url:URL.permission.listPermission,type:"get",data:{},success:function(_data){obj.callback(_data)},error:function(){}})},currentMenuPermission:function(obj){T.ajax({url:URL.permission.currentMenuPermission,success:function(_data){obj.callback(_data)}})},currentButtonPermission:function(obj){T.ajax({url:URL.permission.currentButtonPermission,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},delPermission:function(obj){T.ajax({url:URL.permission.delPermission,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},createPermission:function(obj){T.ajax({url:URL.permission.createPermission,type:"post",data:{name:obj.name,description:obj.description,type:obj.type,url:obj.url,sort:obj.sort,parentId:obj.parentId,showFlag:obj.showFlag,platform:obj.platform,permission:obj.permission},success:function(_data){obj.callback(_data)}})},updatePermission:function(obj){T.ajax({url:URL.permission.updatePermission,type:"post",data:{id:obj.id,name:obj.name,description:obj.description,type:obj.type,url:obj.url,sort:obj.sort,parentId:obj.parentId,showFlag:obj.showFlag,platform:obj.platform,permission:obj.permission},success:function(_data){obj.callback(_data)}})},listPositionPermission:function(obj){T.ajax({url:URL.permission.listPositionPermission,type:"get",data:{positionId:obj.positionId},success:function(_data){obj.callback(_data)},error:function(){}})},setPositionPermissions:function(obj){T.ajax({url:URL.permission.setPositionPermissions,type:"post",data:{positionId:obj.positionId,permissionIds:obj.permissionIds},success:function(_data){obj.callback(_data)},error:function(){}})},createPositionPermission:function(obj){T.ajax({url:URL.permission.createPositionPermission,type:"post",data:{positionId:obj.positionId,permissionId:obj.permissionId},success:function(_data){obj.callback(_data)},error:function(){}})},delPositionPermission:function(obj){T.ajax({url:URL.permission.delPositionPermission,type:"post",data:{positionId:obj.positionId,permissionId:obj.permissionId},success:function(_data){obj.callback(_data)},error:function(){}})}},user:{currentUser:function(obj){$.ajax({url:URL.user.currentUser,success:function(_data){obj.callback(_data)}})},userlist:function(obj){T.ajax({url:URL.user.userlist,data:{page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)},error:function(){}})},createUser:function(obj){$.ajax({url:URL.user.createUser,type:"post",data:{userName:obj.userName,realName:obj.realName,positionIds:obj.positionIds,idfa:obj.idfa,pwd:obj.pwd,headImage:obj.headImage},success:function(_data){obj.callback(_data)}})},updateUser:function(obj){$.ajax({url:URL.user.updateUser,type:"post",data:{realName:obj.realName,idfa:obj.idfa,pwd:obj.pwd,headImage:obj.headImage,userId:obj.userId},success:function(_data){obj.callback(_data)}})},updateUser2:function(obj){$.ajax({url:URL.user.updateUser2,type:"post",data:{userId:obj.userId,realName:obj.realName,userName:obj.userName,pwd:obj.pwd,headImage:obj.headImage,idfa:obj.idfa},success:function(_data){obj.callback(_data)}})},delUser:function(obj){T.ajax({url:URL.user.delUser,data:{userId:obj.userId},success:function(_data){obj.callback(_data)}})},detail:function(obj){T.ajax({url:URL.user.detail,data:{userId:obj.userId},success:function(_data){obj.callback(_data)}})}},position:{listPosition:function(obj){T.ajax({url:URL.position.listPosition,data:{},success:function(_data){obj.callback(_data)},error:function(){}})},updatePosition:function(obj){T.ajax({url:URL.position.updatePosition,type:"post",data:{id:obj.id,positionName:obj.positionName},success:function(_data){obj.callback(_data)},error:function(){}})},createPosition:function(obj){T.ajax({url:URL.position.createPosition,type:"post",data:{positionName:obj.positionName},success:function(_data){obj.callback(_data)},error:function(){}})},delPosition:function(obj){T.ajax({url:URL.position.delPosition,type:"get",data:{id:obj.id},success:function(_data){obj.callback(_data)},error:function(){}})},listUserPosition:function(obj){T.ajax({url:URL.position.listUserPosition,data:{userId:obj.userId},success:function(_data){obj.callback(_data)},error:function(){}})},setUserPosition:function(obj){T.ajax({url:URL.position.setUserPosition,data:{userId:obj.userId,positionId:obj.positionId},success:function(_data){obj.callback(_data)},error:function(){}})},delUserPosition:function(obj){T.ajax({url:URL.position.delUserPosition,data:{userId:obj.userId,positionId:obj.positionId},success:function(_data){obj.callback(_data)},error:function(){}})}},data:{all:function(obj){$.ajax({url:URL.data.all,success:function(_data){obj.callback(_data)}})},compress:function(callback){T.ajax({url:URL.data.compress,type:"get",data:{},success:function(_data){callback(_data)},error:function(){}})},compressMode:function(callback){T.ajax({url:URL.data.compressMode,type:"get",data:{},success:function(_data){callback(_data)},error:function(){}})},encoded:function(callback){T.ajax({url:URL.data.encoded,type:"get",data:{},success:function(_data){callback(_data)},error:function(){}})},job:function(callback){T.ajax({url:URL.data.job,type:"get",data:{},success:function(_data){callback(_data)},error:function(){}})},permissionType:function(callback){T.ajax({url:URL.data.permissionType,type:"get",data:{},success:function(_data){callback(_data)},error:function(){}})},relationType:function(callback){T.ajax({url:URL.data.relationType,type:"get",data:{},success:function(_data){callback(_data)},error:function(){}})},showFlag:function(callback){T.ajax({url:URL.data.showFlag,type:"get",data:{},success:function(_data){callback(_data)},error:function(){}})},templateClassify:function(obj){T.ajax({url:URL.data.templateClassify,success:function(_data){obj.callback(_data)}})},watermark:function(callback){T.ajax({url:URL.data.watermark,type:"get",data:{},success:function(_data){callback(_data)},error:function(){}})},buildMode:function(callback){T.ajax({url:URL.data.buildMode,type:"get",data:{},success:function(_data){callback(_data)},error:function(){}})}},pretemplate:{list:function(obj){T.ajax({url:URL.pretemplate.list,success:function(_data){obj.callback(_data)}})},listTemplate2:function(obj){T.ajax({url:URL.pretemplate.listTemplate2,success:function(_data){obj.callback(_data)}})},listTemplate2list:function(obj){T.ajax({url:URL.pretemplate.listTemplate2list,success:function(_data){obj.callback(_data)}})},listTemplate2detail:function(obj){T.ajax({url:URL.pretemplate.listTemplate2detail,success:function(_data){obj.callback(_data)}})}},news:{previousColumn:function(obj){T.ajax({url:URL.news.previousColumn,success:function(_data){obj.callback(_data)}})},deletes:function(obj){T.ajax({url:URL.news.deletes,data:{ids:obj.ids},success:function(_data){obj.callback(_data)}})},rescinds:function(obj){T.ajax({url:URL.news.rescinds,data:{ids:obj.ids},success:function(_data){obj.callback(_data)}})},publishes:function(obj){T.ajax({url:URL.news.publishes,data:{ids:obj.ids},success:function(_data){obj.callback(_data)}})},createNews:function(obj){T.ajax({url:URL.news.createNews,type:"POST",data:{title:obj.title,subTitle:obj.subTitle,keyword:obj.keyword,description:obj.description,source:obj.source,author:obj.author,channelId:obj.channelId,columnId:obj.columnId,categoryId:obj.categoryId,content:obj.content,autoPublish:obj.autoPublish,timer:obj.timer,editPublishTime:obj.editPublishTime,field1:obj.field1,field2:obj.field2,field3:obj.field3,field4:obj.field4,field5:obj.field5,columnIds:obj.columnIds,publish:obj.publish},success:function(_data){obj.callback(_data)}})},createNewsColumn:function(obj){T.ajax({url:URL.news.createNewsColumn,type:"POST",data:{channelId:obj.channelId,columnName:obj.columnName,listId:obj.listId,detailId:obj.detailId,listTemplate2Id:obj.listTemplate2Id,detailTemplate2Id:obj.detailTemplate2Id,keywords:obj.keywords,description:obj.description,path:obj.path,fileName:obj.fileName,publishUrl:obj.publishUrl},success:function(_data){obj.callback(_data)}})},newscolumnlist:function(obj){T.ajax({url:URL.news.newscolumnlist,data:{channelId:obj.channelId},success:function(_data){obj.callback(_data)}})},newscolumn_list:function(obj){T.ajax({url:URL.news.newscolumn_list,data:{page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})},recommendList:function(obj){var newobj={page:obj.page,pageSize:obj.pageSizex};obj.recommendColumnId&&(newobj.recommendColumnId=obj.recommendColumnId),T.ajax({url:URL.news.recommendList,data:newobj,success:function(_data){obj.callback(_data)}})},deleteRecommend:function(obj){T.ajax({url:URL.news.deleteRecommend,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},deleteRecommendColumn:function(obj){T.ajax({url:URL.news.deleteRecommendColumn,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},newslist:function(obj){T.ajax({url:URL.news.newslist,type:"get",data:{page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})},newsManageList:function(obj){T.ajax({url:URL.news.newsManageList,type:"get",data:{page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})},newscolumn:function(obj){T.ajax({url:URL.news.newscolumn,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},newscolumn_recover:function(obj){T.ajax({url:URL.news.newscolumn_recover,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},newscolumn_manage:function(obj){T.ajax({url:URL.news.newscolumn_manage,data:{page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})},newsdetail:function(obj){T.ajax({url:URL.news.newsdetail,type:"get",data:{id:obj.id},success:function(_data){obj.callback(_data)}})},delNews:function(obj){T.ajax({url:URL.news.delNews,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},updateNews:function(obj){T.ajax({url:URL.news.updateNews,type:"POST",data:{title:obj.title,subTitle:obj.subTitle,keyword:obj.keyword,description:obj.description,source:obj.source,author:obj.author,channelId:obj.channelId,columnId:obj.columnId,columnIds:obj.columnIds,categoryId:obj.categoryId,content:obj.content,id:obj.id,field1:obj.field1,field2:obj.field2,field3:obj.field3,field4:obj.field4,field5:obj.field5,autoPublish:obj.autoPublish,timer:obj.timer,editPublishTime:obj.editPublishTime},success:function(_data){obj.callback(_data)}})},delNewsColumn:function(obj){T.ajax({url:URL.news.delNewsColumn,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},mynewslist:function(obj){T.ajax({url:URL.news.mynewslist,type:"get",data:{publish:obj.publish,page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})},recommendColumnlist:function(obj){T.ajax({url:URL.news.recommendColumnlist,success:function(_data){obj.callback(_data)}})},recommend:function(obj){T.ajax({url:URL.news.recommend,type:"post",data:{id:obj.id,recommendTitle:obj.recommendTitle,recommendDescription:obj.recommendDescription,recommendImages:obj.recommendImages,recommendColumnId:obj.recommendColumnId,sort:obj.sort},success:function(_data){obj.callback(_data)}})},recommendNewsInfo:function(obj){T.ajax({url:URL.news.recommendNewsInfo,type:"get",data:{id:obj.id},success:function(_data){obj.callback(_data)}})},updateNewsColumn:function(obj){T.ajax({url:URL.news.updateNewsColumn,type:"post",data:{id:obj.id,channelId:obj.channelId,columnName:obj.columnName,listId:obj.listId,detailId:obj.detailId,listTemplate2Id:obj.listTemplate2Id,detailTemplate2Id:obj.detailTemplate2Id,keywords:obj.keywords,description:obj.description,path:obj.path,fileName:obj.fileName,publishUrl:obj.publishUrl},success:function(_data){obj.callback(_data)}})},relationColumnList:function(obj){T.ajax({url:URL.news.relationColumnList,success:function(_data){obj.callback(_data)}})},createRecommendColumn:function(obj){T.ajax({url:URL.news.createRecommendColumn,type:"post",data:{columnName:obj.columnName},success:function(_data){obj.callback(_data)}})},updateRecommendColumn:function(obj){T.ajax({url:URL.news.updateRecommendColumn,type:"post",data:{id:obj.id,columnName:obj.columnName},success:function(_data){obj.callback(_data)}})},publish:function(obj){T.ajax({url:URL.news.publish,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},rescind:function(obj){T.ajax({url:URL.news.rescind,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},recover:function(obj){var newobj={id:obj.id};obj.publish&&(newobj.publish=obj.publish),T.ajax({url:URL.news.recover,data:newobj,success:function(_data){obj.callback(_data)}})},preview:function(obj){T.ajax({url:URL.news.preview,data:{id:obj.id},success:function(_data){obj.callback(_data)}})}},category:{listCategory:function(obj){var newobj={};obj.info&&(newobj.info=obj.info),T.ajax({url:URL.category.listCategory,data:newobj,type:"get",success:function(_data){obj.callback(_data)}})},delCategory:function(obj){T.ajax({url:URL.category.delCategory,type:"get",data:{id:obj.id},success:function(_data){obj.callback(_data)}})},createCategory:function(obj){T.ajax({url:URL.category.createCategory,type:"post",data:{categoryName:obj.categoryName,categoryDesc:obj.categoryDesc},success:function(_data){obj.callback(_data)}})},updateCategory:function(obj){T.ajax({url:URL.category.updateCategory,type:"post",data:{id:obj.id,categoryName:obj.categoryName,categoryDesc:obj.categoryDesc},success:function(_data){obj.callback(_data)}})}},channel:{listChannel:function(obj){var newobj={};obj.info&&(newobj.info=obj.info),T.ajax({url:URL.channel.listChannel,data:newobj,success:function(_data){obj.callback(_data)}})},currentChannelList:function(obj){T.ajax({url:URL.channel.currentChannelList,data:{categoryId:obj.categoryId},success:function(_data){obj.callback(_data)}})},createChannel:function(obj){T.ajax({url:URL.channel.createChannel,type:"post",data:{categoryId:obj.categoryId,channelName:obj.channelName,channelUrl:obj.channelUrl,channelPath:obj.channelPath,templatePath:obj.templatePath,channelDesc:obj.channelDesc,rsyncModelName:obj.rsyncModelName},success:function(_data){obj.callback(_data)},error:function(){}})},updateChannel:function(obj){T.ajax({url:URL.channel.updateChannel,type:"post",data:{id:obj.id,categoryId:obj.categoryId,channelName:obj.channelName,channelUrl:obj.channelUrl,channelPath:obj.channelPath,templatePath:obj.templatePath,channelDesc:obj.channelDesc,rsyncModelName:obj.rsyncModelName},success:function(_data){obj.callback(_data)},error:function(){}})},delChannel:function(obj){T.ajax({url:URL.channel.delChannel,data:{id:obj.id},success:function(_data){obj.callback(_data)}})}},image:{imageslist:function(obj){T.ajax({url:URL.images.imageslist,type:"get",data:{page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)},error:function(){}})},createImages:function(obj){T.ajax({url:URL.images.createImages,type:"post",data:{imageUrl:obj.imageUrl,imageWidthPixel:obj.imageWidthPixel,imageHeightPixel:obj.imageHeightPixel,orgWidthPixel:obj.orgWidthPixel,orgHeightPixel:obj.orgHeightPixel,imageTitle:obj.imageTitle,imagePath:obj.imagePath,watermark:obj.watermark,compress:obj.compress,fid:obj.fid,size:obj.size},success:function(_data){obj.callback(_data)},error:function(){}})},updateImages:function(obj){T.ajax({url:URL.images.updateImages,type:"post",data:{id:obj.id,imageUrl:obj.imageUrl,imageWidthPixel:obj.imageWidthPixel,imageHeightPixel:obj.imageHeightPixel,orgWidthPixel:obj.orgWidthPixel,orgHeightPixel:obj.orgHeightPixel,imageTitle:obj.imageTitle,imagePath:obj.imagePath,watermark:obj.watermark,compress:obj.compress,fid:obj.fid,size:obj.size},success:function(_data){obj.callback(_data)},error:function(){}})},delImage:function(obj){var newobj={id:obj.id};obj.force&&(newobj.force=obj.force),T.ajax({url:URL.images.delImages,type:"get",data:newobj,success:function(_data){obj.callback(_data)},error:function(){}})},imageBase:function(obj){T.ajax({url:URL.images.imagesBase,type:"get",success:function(_data){obj.callback(_data)},error:function(){}})},createImageBase:function(obj){T.ajax({url:URL.images.createImagesBase,type:"post",data:{baseUrl:obj.baseUrl,basePath:obj.basePath},success:function(_data){obj.callback(_data)},error:function(){}})},updateImageBase:function(obj){T.ajax({url:URL.images.updateImagesBase,type:"post",data:{id:obj.id,baseUrl:obj.baseUrl,basePath:obj.basePath},success:function(_data){obj.callback(_data)},error:function(){}})}},video:{videoBase:function(obj){T.ajax({url:URL.video.videoBase,type:"get",data:{},success:function(_data){obj.callback(_data)},error:function(){}})},updateVideoBase:function(obj){T.ajax({url:URL.video.updateVideoBase,type:"post",data:{id:obj.id,baseUrl:obj.baseUrl,basePath:obj.basePath},success:function(_data){obj.callback(_data)},error:function(){}})},createVideoBase:function(obj){T.ajax({url:URL.video.createVideoBase,type:"post",data:{baseUrl:obj.baseUrl,basePath:obj.basePath},success:function(_data){obj.callback(_data)},error:function(){}})},videolist:function(obj){T.ajax({url:URL.video.videolist,type:"get",data:{page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)},error:function(){}})},delVideo:function(obj){var newobj={id:obj.id};obj.force&&(newobj.force=obj.force),T.ajax({url:URL.video.delVideo,type:"get",data:newobj,success:function(_data){obj.callback(_data)},error:function(){}})},createVideo:function(obj){T.ajax({url:URL.video.createVideo,type:"post",data:{videoTitle:obj.videoTitle,videoDesc:obj.videoDesc,videoUrl:obj.videoUrl,videoPath:obj.videoPath,fileName:obj.fileName},success:function(_data){obj.callback(_data)},error:function(){}})},updateVideo:function(obj){T.ajax({url:URL.video.updateVideo,type:"post",data:{id:obj.id,videoTitle:obj.videoTitle,videoDesc:obj.videoDesc,videoUrl:obj.videoUrl,videoPath:obj.videoPath,fileName:obj.fileName},success:function(_data){obj.callback(_data)},error:function(){}})}},template:{listTemplate:function(obj){T.ajax({url:URL.template.listTemplate,data:{page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})},template:function(obj){T.ajax({url:URL.template.listTemplate,data:{templateId:obj.templateId,relationType:obj.relationType},success:function(_data){obj.callback(_data)}})},templateInfo:function(obj){T.ajax({url:URL.template.templateInfo,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},relation:function(obj){T.ajax({url:URL.template.relation,data:{templateId:obj.templateId,relationType:obj.relationType},success:function(_data){obj.callback(_data)}})},createTemplate:function(obj){T.ajax({url:URL.template.createTemplate,type:"POST",data:{templateName:obj.templateName,templateDesc:obj.templateDesc,filename:obj.filename,path:obj.path,templateClassify:obj.templateClassify,job:obj.job,encoded:obj.encoded,channelId:obj.channelId,sortNum:obj.sortNum},success:function(_data){obj.callback(_data)}})},listTemplateBycolumnId:function(obj){T.ajax({url:URL.template.listTemplateBycolumnId,data:{columnId:obj.columnId},success:function(_data){obj.callback(_data)}})},delRelationByColumnList:function(obj){T.ajax({url:URL.template.delRelationByColumnList,type:"POST",data:{templateId:obj.templateId,relationId:obj.relationId,relationType:obj.relationType},success:function(_data){obj.callback(_data)}})},updateTemplate:function(obj){T.ajax({url:URL.template.updateTemplate,type:"POST",data:{id:obj.id,templateName:obj.templateName,templateDesc:obj.templateDesc,filename:obj.filename,path:obj.path,templateClassify:obj.templateClassify,job:obj.job,encoded:obj.encoded,channelId:obj.channelId,sortNum:obj.sortNum},success:function(_data){obj.callback(_data)}})},delTemplate:function(obj){T.ajax({url:URL.template.delTemplate,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},downTemplate:function(obj){window.location.href=URL.template.downTemplate+"?id="+obj.id},createRelation:function(obj){T.ajax({url:URL.template.createRelation,loadding:!1,type:"post",data:{templateId:obj.templateId,relationId:obj.relationId,relationType:obj.relationType},success:function(_data){obj.callback(_data)}})},delRelation:function(obj){T.ajax({url:URL.template.delRelation,loadding:!1,type:"post",data:{templateId:obj.templateId,relationId:obj.relationId,relationType:obj.relationType},success:function(_data){obj.callback(_data)}})},uploadTemplate:function(obj){T.ajax({url:URL.template.uploadTemplate,type:"post",data:{baseCode:obj.baseCode,id:obj.id},success:function(_data){obj.callback(_data)}})},createTemplate2:function(obj){T.ajax({url:URL.template.createTemplate2,type:"post",data:{templateName:obj.templateName,filename:obj.filename,path:obj.path,templateClassify:obj.templateClassify,encoded:obj.encoded},success:function(_data){obj.callback(_data)}})},listTemplate2:function(obj){T.ajax({url:URL.template.listTemplate2,data:{page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})},delTemplate2:function(obj){T.ajax({url:URL.template.delTemplate2,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},uploadTemplate2:function(obj){T.ajax({url:URL.template.uploadTemplate2,type:"post",data:{baseCode:obj.baseCode,id:obj.id},success:function(_data){obj.callback(_data)}})},downTemplate2:function(obj){window.location.href=URL.template.downTemplate2+"?id="+obj.id},template2Info:function(obj){T.ajax({url:URL.template.template2Info,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},template2base:function(obj){T.ajax({url:URL.template.template2base,data:{},success:function(_data){obj.callback(_data)}})},updateTemplate2base:function(obj){T.ajax({url:URL.template.updateTemplate2base,type:"post",data:{id:obj.id,basePath:obj.basePath},success:function(_data){obj.callback(_data)}})},updateTemplate2:function(obj){T.ajax({url:URL.template.updateTemplate2,type:"post",data:{id:obj.id,templateName:obj.templateName,filename:obj.filename,path:obj.path,templateClassify:obj.templateClassify,encoded:obj.encoded},success:function(_data){obj.callback(_data)}})}},topic:{createTopicColumn:function(obj){T.ajax({url:URL.topic.createTopicColumn,type:"POST",data:{name:obj.name},success:function(_data){obj.callback(_data)}})},createTopic:function(obj){T.ajax({url:URL.topic.createTopic,type:"POST",data:{topicTitle:obj.topicTitle,topicContent:obj.topicContent,topicPath:obj.topicPath,topicFilename:obj.topicFilename,topicClassifyId:obj.topicClassifyId,categoryId:obj.categoryId,channelId:obj.channelId,releaseTime:obj.releaseTime,keyword:obj.keyword,description:obj.description,topicColumnId:obj.topicColumnId},success:function(_data){obj.callback(_data)}})},updateTopic:function(obj){T.ajax({url:URL.topic.updateTopic,type:"POST",data:{id:obj.id,topicTitle:obj.topicTitle,topicContent:obj.topicContent,topicPath:obj.topicPath,topicFilename:obj.topicFilename,topicClassifyId:obj.topicClassifyId,categoryId:obj.categoryId,channelId:obj.channelId,releaseTime:obj.releaseTime,keyword:obj.keyword,description:obj.description,topicColumnId:obj.topicColumnId},success:function(_data){obj.callback(_data)}})},listTopic:function(obj){T.ajax({url:URL.topic.listTopic,data:{pageSize:obj.pageSize,page:obj.page},success:function(_data){obj.callback(_data)}})},topicInfo:function(obj){T.ajax({url:URL.topic.topicInfo,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},topicClassifyList:function(obj){T.ajax({url:URL.topic.topicClassifyList,success:function(_data){obj.callback(_data)}})},topicColumnList:function(obj){T.ajax({url:URL.topic.topicColumnList,success:function(_data){obj.callback(_data)}})},delTopicColumn:function(obj){T.ajax({url:URL.topic.delTopicColumn,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},delTopic:function(obj){T.ajax({url:URL.topic.delTopic,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},delTopicClassify:function(obj){T.ajax({url:URL.topic.delTopicClassify,data:{id:obj.id},success:function(_data){obj.callback(_data)}})},updateTopicColumn:function(obj){T.ajax({url:URL.topic.updateTopicColumn,type:"POST",data:{id:obj.id,name:obj.name},success:function(_data){obj.callback(_data)}})},createTopicClassify:function(obj){T.ajax({url:URL.topic.createTopicClassify,type:"POST",data:{name:obj.name},success:function(_data){obj.callback(_data)}})},updateTopicClassify:function(obj){T.ajax({url:URL.topic.updateTopicClassify,type:"POST",data:{id:obj.id,name:obj.name},success:function(_data){obj.callback(_data)}})},preview:function(obj){T.ajax({url:URL.topic.preview,type:"get",data:{id:obj.id},success:function(_data){obj.callback(_data)}})}},userchannel:{channelId:function(callback){T.ajax({url:URL.userchannel.channelId,type:"get",data:{},success:function(_data){callback(_data)}})},userId:function(callback){T.ajax({url:URL.userchannel.userId,type:"get",data:{},success:function(_data){callback(_data)}})},createUserChannel:function(obj){T.ajax({url:URL.userchannel.createUserChannel,type:"post",data:{userId:obj.userId,channelId:obj.channelId},success:function(_data){obj.callback(_data)}})},delUserChannel:function(obj){T.ajax({url:URL.userchannel.delUserChannel,type:"post",data:{userId:obj.userId,channelId:obj.channelId},success:function(_data){obj.callback(_data)}})},userChannelIds:function(obj){T.ajax({url:URL.userchannel.userChannelIds,type:"get",data:{userId:obj.userId},success:function(_data){obj.callback(_data)}})}},fragment:{list:function(obj){T.ajax({url:URL.fragment.list,success:function(_data){obj.callback(_data)}})},listFragment:function(obj){T.ajax({url:URL.fragment.listFragment,type:"get",data:{page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})},findFragment:function(obj){T.ajax({url:URL.fragment.findFragment,type:"get",data:{id:obj.id},success:function(_data){obj.callback(_data)}})},delFragment:function(obj){T.ajax({url:URL.fragment.delFragment,type:"get",data:{id:obj.id},success:function(_data){obj.callback(_data)}})},editFragment:function(obj){T.ajax({url:URL.fragment.editFragment,type:"post",data:{id:obj.id,values:obj.values.toString()},success:function(_data){obj.callback(_data)}})},fragmentMap:function(obj){T.ajax({url:URL.fragment.fragmentMap,type:"get",data:{id:obj.id},success:function(_data){obj.callback(_data)}})},updateFragment:function(obj){T.ajax({url:URL.fragment.updateFragment,type:"post",data:{id:obj.id,channelId:obj.channelId,fragmentClassifyId:obj.fragmentClassifyId,fragmentName:obj.fragmentName,sortNum:obj.sortNum,fragmentModel:obj.fragmentModel},success:function(_data){obj.callback(_data)}})},createFragment:function(obj){T.ajax({url:URL.fragment.createFragment,type:"post",data:{channelId:obj.channelId,fragmentClassifyId:obj.fragmentClassifyId,fragmentName:obj.fragmentName,sortNum:obj.sortNum,fragmentModel:obj.fragmentModel},success:function(_data){obj.callback(_data)}})},listHistory:function(callback){T.ajax({url:URL.fragment.listHistory,type:"get",data:{},success:function(_data){callback(_data)}})},listClassify:function(obj){T.ajax({url:URL.fragment.listClassify,type:"get",data:{},success:function(_data){obj.callback(_data)}})},createClassify:function(obj){T.ajax({url:URL.fragment.createClassify,type:"post",data:{classifyName:obj.classifyName},success:function(_data){obj.callback(_data)}})},updateClassify:function(obj){T.ajax({url:URL.fragment.updateClassify,type:"post",data:{id:obj.id,classifyName:obj.classifyName},success:function(_data){obj.callback(_data)}})},delClassify:function(obj){T.ajax({url:URL.fragment.delClassify,type:"get",data:{id:obj.id},success:function(_data){obj.callback(_data)}})},publish:function(obj){T.ajax({url:URL.fragment.publish,type:"get",data:{id:obj.id},success:function(_data){obj.callback(_data)}})}},upload:{uploadImage:function(obj){T.ajax({url:URL.upload.uploadImage,type:"post",data:{baseCode:obj.baseCode,suffix:obj.suffix,watermark:obj.watermark,width:obj.width,height:obj.height},success:function(_data){obj.callback(_data)}})},cancelVideo:function(obj){T.ajax({url:URL.upload.cancelVideo,type:"post",data:{fileName:obj.fileName},success:function(_data){obj.callback(_data)}})}},search:{searchNew:function(obj){T.ajax({url:URL.search.searchNew,type:"post",data:{id:obj.newsId,buildUserName:obj.buildUserName,lastModifyUserName:obj.lastModifyUserName,condition:obj.condition,author:obj.author,source:obj.source,categoryId:obj.categoryId,channelId:obj.channelId,columnId:obj.columnId,platform:obj.platform,startTime:obj.startTime,endTime:obj.endTime,delTag:obj.delTag,publish:obj.publish,page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})},searchTopic:function(obj){T.ajax({url:URL.search.searchTopic,type:"post",data:{condition:obj.condition,topicClassifyId:obj.topicClassifyId,categoryId:obj.categoryId,channelId:obj.channelId,topicColumnId:obj.topicColumnId,releaseTime:obj.releaseTime,startTime:obj.startTime,endTime:obj.endTime,page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})},searchImages:function(obj){T.ajax({url:URL.search.searchImages,type:"post",data:{condition:obj.condition,page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})},searchVideo:function(obj){T.ajax({url:URL.search.searchVideo,type:"post",data:{condition:obj.condition,page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})},searchUser:function(obj){T.ajax({url:URL.search.searchUser,type:"post",data:{condition:obj.condition,page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})},searchFragment:function(obj){T.ajax({url:URL.search.searchFragment,type:"post",data:{condition:obj.condition,fragmentClassifyId:obj.fragmentClassifyId,channelId:obj.channelId,page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})},searchTemplate:function(obj){T.ajax({url:URL.search.searchTemplate,type:"post",data:{condition:obj.condition,channelId:obj.channelId,page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})},searchTemplate2:function(obj){T.ajax({url:URL.search.searchTemplate2,type:"post",data:{condition:obj.condition,page:obj.page,pageSize:obj.pageSize},success:function(_data){obj.callback(_data)}})}},publishInfo:{list:function(obj){T.ajax({url:URL.publishInfo.list,data:{page:obj.page,pageSize:obj.pageSize,status:obj.status,triggerId:obj.triggerId,triggerType:obj.triggerType},success:function(_data){obj.callback(_data)}})},detail:function(obj){T.ajax({url:URL.publishInfo.detail,data:{id:obj.id},success:function(_data){obj.callback(_data)}})}}}});