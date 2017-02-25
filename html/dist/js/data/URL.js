define(function(e){var t="/webapi";return{index:{index:t+"/index"},user:{login:t+"/user/login",loginOut:t+"/user/loginOut",userlist:t+"/user/userlist",//用户列表接口
currentUser:t+"/user/currentUser",//当前登录用户信息接口
createUser:t+"/user/createUser",//创建用户接口
updateUser:t+"/user/updateUser",//用户修改接口
delUser:t+"/user/delUser"},position:{listPosition:t+"/position/listPosition",createPosition:t+"/position/createPosition",updatePosition:t+"/position/updatePosition",delPosition:t+"/position/delPosition",setUserPosition:t+"/position/setUserPosition",delUserPosition:t+"/position/delUserPosition",listUserPosition:t+"/position/listUserPosition"},data:{//基础接口
all:t+"/data/all",compress:t+"/data/compress",//图片是否压缩选项列表接口
compressMode:t+"/data/compressMode",//按照宽｜高等比压缩选项接口
encoded:t+"/data/encoded",//模版支持的编码选项列表
job:t+"/data/job",//模版生成方式选项列表
permissionType:t+"/data/permissionType",//权限类型选项列表
relationType:t+"/data/relationType",//模版关系对应类型选项列表
showFlag:t+"/data/showFlag",//权限是否显示在左侧选项列表
templateClassify:t+"/data/templateClassify",//模版类型选项列表
watermark:t+"/data/watermark",//图片是否水印选项列表
buildMode:t+"/data/buildMode"},permission:{//权限
listPermission:t+"/permission/listPermission",listPositionPermission:t+"/permission/listPositionPermission",createPermission:t+"/permission/createPermission",updatePermission:t+"/permission/updatePermission",//权限修改
delPermission:t+"/permission/delPermission",//权限删除
setPositionPermissions:t+"/permission/setPositionPermissions",//批量设置用户组的权限
createPositionPermission:t+"/permission/createPositionPermission",//单个设置用户组权限
delPositionPermission:t+"/permission/delPositionPermission",//删除用户组权限
currentMenuPermission:t+"/permission/currentMenuPermission",//获取用户拥有的菜单栏权限 接口
currentButtonPermission:t+"/permission/currentButtonPermission"},pretemplate:{//预模版加载
listPreTemplate:t+"/pretemplate/listPreTemplate",list:t+"/pretemplate/list",detail:t+"/pretemplate/detail",save:t+"/pretemplate/save",update:t+"/pretemplate/update",delete:t+"/pretemplate/delete",preTemplateBase:t+"/pretemplate/preTemplateBase",baseUpdate:t+"/pretemplate/base/update",listTemplate2:t+"/template2/listTemplate2",listTemplate2detail:t+"/template2/listTemplate2/detail",listTemplate2list:t+"/template2/listTemplate2/list"},news:{previousColumn:t+"/news/previousColumn",newscolumn:t+"/newscolumn/newscolumn",//获取栏目信息
newscolumnlist:t+"/newscolumn/newscolumnlist",//栏目列表
newscolumn_list:t+"/newscolumn/list",//栏目列表分页
createNewsColumn:t+"/newscolumn/createNewsColumn",//创建栏目
delNewsColumn:t+"/newscolumn/delNewsColumn",//删除栏目
newslist:t+"/news/newslist",//新闻列表
newsdetail:t+"/news/newsdetail",//新闻详细信息
delNews:t+"/news/delNews",//删除新闻
createNews:t+"/news/createNews",//创建新闻
updateNews:t+"/news/updateNews",//修改新闻
updateNewsColumn:t+"/newscolumn/updateNewsColumn",//修改新闻
publish:t+"/news/publish",//新闻发布
relationColumnList:t+"/newscolumn/relationColumnList",mynewslist:t+"/news/mynewslist",//新闻列表
recommendColumnlist:t+"/news/recommendColumnlist",recommend:t+"/news/recommend",recommendNewsInfo:t+"/news/recommendNewsInfo",createRecommendColumn:t+"/news/createRecommendColumn",updateRecommendColumn:t+"/news/updateRecommendColumn"},category:{//部门分类
listCategory:t+"/category/listCategory",//获取部门分类列表
createCategory:t+"/category/createCategory",updateCategory:t+"/category/updateCategory",delCategory:t+"/category/delCategory"},channel:{//获取频道分类列表
listChannel:t+"/channel/listChannel",createChannel:t+"/channel/createChannel",updateChannel:t+"/channel/updateChannel",delChannel:t+"/channel/delChannel",channelListForCategory:t+"/channel/channelListForCategory",channelInfo:t+"/channel/channelInfo",currentChannelList:t+"/channel/currentChannelList"},upload:{//上传相关
uploadImage:t+"/upload/uploadImage",//上传图片接口
cancelVideo:t+"/upload/cancelVideo"},images:{//图片
imageslist:t+"/images/imageslist",delImages:t+"/images/delImages",updateImages:t+"/images/updateImages",//上传图片修改
createImages:t+"/images/createImages",createImagesBase:t+"/images/createImagesBase",updateImagesBase:t+"/images/updateImagesBase",//修改图片基础信息
imagesBase:t+"/images/imagesBase"},video:{//获取视频基础库
videoBase:t+"/video/videoBase",//获取视频基础库
updateVideoBase:t+"/video/updateVideoBase",//修改图片基础信息
createVideoBase:t+"/video/createVideoBase",//创建视频
createVideo:t+"/video/createVideo",//创建Video 接口
updateVideo:t+"/video/updateVideo",//修改Video 接口
delVideo:t+"/video/delVideo",//删除视频 接口
videolist:t+"/video/videolist",//获取视频列表 接口
uploadVideo:t+"/video/uploadVideo",//视频上传
uploadVideo2:t+"/upload/uploadVideo2"},template:{listTemplate:t+"/template/listTemplate",//模版列表［分页］
templateInfo:t+"/template/templateInfo",//模版详细信息
delTemplate:t+"/template/delTemplate",//删除模版
updateTemplate:t+"/template/updateTemplate",//模版修改 
createTemplate:t+"/template/createTemplate",//创建新模版
uploadTemplate:t+"/template/uploadTemplate",//模版上传
downTemplate:t+"/template/downTemplate",//模版上传
relation:t+"/template/relation",//读取所有的模版对应的关系列表 接口
updateRelations:t+"/template/updateRelations",//根据relationType 修改模版对应关系
createRelation:t+"/template/createRelation",//新增模版关系
delRelation:t+"/template/delRelation",//模版关系删除
redirect:t+"/template/redirect",//模版跳转
createTemplate2:t+"/template2/createTemplate2",//创建第二新模板
listTemplate2:t+"/template2/listTemplate2",//创建第二新模板
delTemplate2:t+"/template2/delTemplate2",//删除
uploadTemplate2:t+"/template2/uploadTemplate2",//模版上传
updateTemplate2:t+"/template2/updateTemplate2",downTemplate2:t+"/template2/downTemplate2",//下载
template2Info:t+"/template2/template2Info",//第二模版详细信息 接口
template2base:t+"/template2/template2Base",//第二模板基础信息
updateTemplate2base:t+"/template2/base/update"},topic:{//专题
listTopic:t+"/topic/listTopic",//分页专题列表 接口
topicInfo:t+"/topic/topicInfo",//
delTopic:t+"/topic/delTopic",//
publish:t+"/topic/publish",//
createTopic:t+"/topic/createTopic",//
updateTopic:t+"/topic/updateTopic",//
topicClassifyList:t+"/topic/topicClassifyList",//
createTopicClassify:t+"/topic/createTopicClassify",//
updateTopicClassify:t+"/topic/updateTopicClassify",//修改专题分类
delTopicClassify:t+"/topic/delTopicClassify",//删除专题分类
topicColumnList:t+"/topic/topicColumnList",//专题分类列表
createTopicColumn:t+"/topic/createTopicColumn",//专题分类列表
updateTopicColumn:t+"/topic/updateTopicColumn",//
delTopicColumn:t+"/topic/delTopicColumn"},userchannel:{//用户频道编辑权限
channelId:t+"/userchannel/list/channelId",//根据频道ID获取用户列表 
userId:t+"/userchannel/list/userId",//根据用户ID获取频道列表 
createUserChannel:t+"/userchannel/createUserChannel",//创建用户权限 
delUserChannel:t+"/userchannel/delUserChannel",//删除用户权限 
userChannelIds:t+"/userchannel/userchannelIds"},fragment:{listFragment:t+"/fragment/listFragment",//获取碎片列表
list:t+"/fragment/list",//获取碎片列表
findFragment:t+"/fragment/findFragment",//获取碎片详细信息
delFragment:t+"/fragment/delFragment",//删除碎片
editFragment:t+"/fragment/editFragment",//编辑碎片
fragmentMap:t+"/fragment/fragmentMap",//获取编辑碎片的Map维护信息
updateFragment:t+"/fragment/updateFragment",//修改碎片
createFragment:t+"/fragment/createFragment",//创建碎片信息
listHistory:t+"/fragment/listHistory",//碎片编辑的历史纪录［分页查询］
listClassify:t+"/fragment/listClassify",//碎片编辑的历史纪录［分页查询］
createClassify:t+"/fragment/createClassify",//分类列表
updateClassify:t+"/fragment/updateClassify",//分类修改
delClassify:t+"/fragment/delClassify",//删除分类
publish:t+"/fragment/publish"},search:{searchNew:t+"/search/searchNew",// post
searchTopic:t+"/search/searchTopic",// post
searchImages:t+"/search/searchImages",// post
searchVideo:t+"/search/searchVideo",// post
searchFragment:t+"/search/searchFragment",// post
searchTemplate:t+"/search/searchTemplate",// post
searchTemplate2:t+"/search/searchTemplate2",// post
searchUser:t+"/search/searchUser"}}});