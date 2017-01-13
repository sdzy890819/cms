
insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10000,'','用户管理系统','用户管理系统',1,'/webapi/',1,null,1,'user:*');
-- --------------
insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10012,'','用户列表','用户列表',2,'/webapi/user/userlist',101,10000,1,'user:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10013,'','新增用户','新增用户',2,'/webapi/user/createUser',100,10000,1,'user:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10014,'','删除用户','删除用户',2,'/webapi/user/delUser',150,10000,0,'user:delete');

-- -------------

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10001,'','部门分类管理','部门分类管理',1,'/webapi/',2,null,1,'category:*');
-- -------------

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10015,'','部门分类列表','部门分类列表',2,'/webapi/category/listCategory',201,10001,1,'category:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10016,'','新增部门分类','新增部门分类',2,'/webapi/category/createCategory',200,10001,1,'category:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10017,'','修改部门分类','修改部门分类',2,'/webapi/category/updateCategory',251,10001,0,'category:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10018,'','删除部门分类','删除部门分类',2,'/webapi/category/delCategory',252,10001,0,'category:delete');

-- -------------

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10002,'','频道管理','频道管理',1,'/webapi/',3,null,1,'channel:*');

-- -------------
insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10019,'','频道列表','频道列表',2,'/webapi/channel/listChannel',301,10002,1,'channel:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10020,'','新增频道','新增频道',2,'/webapi/channel/createChannel',300,10002,1,'channel:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10021,'','修改频道','修改频道',2,'/webapi/channel/updateChannel',350,10002,0,'channel:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10022,'','删除频道','删除频道',2,'/webapi/channel/delChannel',351,10002,0,'channel:delete');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10108,'','频道下用户列表','频道下的用户列表',2,'/webapi/userchannel/list/channelId',352,10002,0,'userchannel:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10109,'','创建用户权限','创建用户权限',2,'/webapi/userchannel/createUserChannel',353,10002,0,'userchannel:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10111,'','删除用户权限','删除用户权限',2,'/webapi/userchannel/delUserChannel',354,10002,0,'userchannel:delete');

-- -------------

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10003,'','碎片管理','碎片管理',1,'/webapi/',4,null,1,'fragment:*');

-- ---------------
insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(100023,'','碎片列表','碎片列表',2,'/webapi/fragment/listFragment',401,10003,1,'fragment:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(100024,'','删除碎片','删除碎片',2,'/webapi/fragment/delFragment',450,10003,0,'fragment:delete');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(100025,'','编辑碎片','编辑碎片',2,'/webapi/fragment/editFragment',451,10003,0,'fragment:edit');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(100026,'','修改碎片','修改碎片',2,'/webapi/fragment/updateFragment',452,10003,0,'fragment:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(100027,'','创建碎片','创建碎片',2,'/webapi/fragment/createFragment',400,10003,1,'fragment:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(100028,'','碎片历史纪录','碎片历史纪录',2,'/webapi/fragment/listHistory',453,10003,0,'fragmenthistory:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(100029,'','碎片分类列表','碎片分类列表',2,'/webapi/fragment/listClassify',402,10003,1,'fragmentclassify:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(100030,'','创建碎片分类','创建碎片分类',2,'/webapi/fragment/createClassify',403,10003,1,'fragmentclassify:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(100031,'','修改碎片分类','修改碎片分类',2,'/webapi/fragment/updateClassify',454,10003,0,'fragmentclassify:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(100032,'','删除碎片分类','删除碎片分类',2,'/webapi/fragment/delClassify',455,10003,0,'fragmentclassify:delete');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(100033,'','碎片发布','碎片发布',2,'/webapi/fragment/publish',456,10003,0,'fragment:publish');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(100075,'','碎片检索','碎片检索',2,'/webapi/search/searchFragment',457,10003,0,'fragment:search');

-- ---------------

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10004,'','图片管理','图片管理',1,'/webapi/',5,null,1,'images:*');

-- -------------------------
insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10034,'','图片基础信息','图片基础信息',2,'/webapi/images/imagesBase',500,10004,1,'imagesbase:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10035,'','修改图片基础信息','修改图片基础信息',2,'/webapi/images/updateImagesBase',551,10004,0,'imagesbase:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10036,'','创建图片基础信息','创建图片基础信息',2,'/webapi/images/createImagesBase',552,10004,0,'imagesbase:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10037,'','图片上传','图片上传',2,'/webapi/images/createImages',501,10004,1,'images:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10120,'','图片列表','图片列表',2,'/webapi/images/imageslist',502,10004,1,'images:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10038,'','修改图片','修改图片',2,'/webapi/images/updateImages',553,10004,0,'images:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10039,'','删除图片','删除图片',2,'/webapi/images/delImages',554,10004,0,'images:delete');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10040,'','图片上传','图片上传',2,'/webapi/upload/uploadImage',555,10004,0,'images:upload');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10073,'','图片检索','图片检索',2,'/webapi/search/searchImages',556,10004,0,'images:search');

-- ------------------------

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10005,'','视频管理','视频管理',1,'/webapi/',6,null,1,'video:*');

-- ------------------------
insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10041,'','视频基础信息','视频基础信息',2,'/webapi/video/videoBase',600,10005,1,'videobase:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10042,'','修改视频基础信息','修改视频基础信息',2,'/webapi/video/updateVideoBase',650,10005,0,'videobase:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10043,'','创建视频基础信息','创建视频基础信息',2,'/webapi/video/createVideoBase',651,10005,0,'videobase:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10044,'','上传视频','上传视频',2,'/webapi/video/createVideo',601,10005,1,'video:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10045,'','修改视频','修改视频',2,'/webapi/video/updateVideo',602,10005,0,'video:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10046,'','删除视频','删除视频',2,'/webapi/video/delVideo',652,10005,0,'video:delete');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10047,'','视频列表','视频列表',2,'/webapi/video/videolist',603,10005,1,'video:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10074,'','视频检索','视频检索',2,'/webapi/search/searchVideo',653,10005,0,'video:search');
-- ------------------------

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10006,'','新闻栏目管理','新闻栏目管理',1,'/webapi/',7,null,1,'newscolumn:*');

-- ------------------------
insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10048,'','栏目列表','栏目列表',2,'/webapi/newscolumn/newscolumnlist',701,10006,1,'newscolumn:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10049,'','创建栏目','创建栏目',2,'/webapi/newscolumn/createNewsColumn',700,10006,1,'newscolumn:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10050,'','修改栏目','修改栏目',2,'/webapi/newscolumn/updateNewsColumn',750,10006,0,'newscolumn:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10051,'','删除栏目','删除栏目',2,'/webapi/newscolumn/delNewsColumn',751,10006,0,'newscolumn:delete');

-- ------------------------

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10007,'','新闻管理','新闻管理',1,'/webapi/',8,null,1,'news:*');

-- -----------------------
insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10052,'','新闻列表','新闻列表',2,'/webapi/news/newslist',801,10007,1,'news:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10053,'','删除新闻','删除新闻',2,'/webapi/news/delNews',850,10007,1,'news:delete');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10054,'','创建新闻','创建新闻',2,'/webapi/news/createNews',800,10007,1,'news:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10055,'','修改新闻','修改新闻',2,'/webapi/news/updateNews',851,10007,0,'news:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10056,'','新闻发布','新闻发布',2,'/webapi/news/publish',852,10007,0,'news:publish');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10110,'','新闻预览','新闻预览',2,'/webapi/news/preview',853,10007,0,'news:preview');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10071,'','新闻检索','新闻检索',2,'/webapi/search/searchNew',854,10007,0,'news:search');

-- -----------------------

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10008,'','权限管理','权限管理',1,'/webapi/',9,null,1,'permission:*');
-- -----------------------
insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10057,'','权限列表','权限列表',2,'/webapi/permission/listPermission',901,10008,1,'permission:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10058,'','新增权限','新增权限',2,'/webapi/permission/createPermission',900,10008,1,'permission:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10059,'','修改权限','修改权限',2,'/webapi/permission/updatePermission',950,10008,0,'permission:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10060,'','删除权限','删除权限',2,'/webapi/permission/delPermission',951,10008,0,'permission:delete');

-- -----------------------

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10009,'','用户组管理','用户组管理',1,'/webapi/',10,null,1,'position:*');

-- -----------------------
insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10062,'','用户组赋权','用户组赋权',2,'/webapi/permission/listPositionPermission',1050,10009,0,'positionpermission:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10063,'','用户组权限设置','用户组权限设置',2,'/webapi/permission/createPositionPermission',1051,10009,0,'positionpermission:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10064,'','删除用户组权限','删除用户组权限',2,'/webapi/permission/delPositionPermission',1051,10009,0,'positionpermission:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10065,'','创建用户组','创建用户组',2,'/webapi/position/createPosition',1000,10009,1,'position:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10066,'','删除用户组','删除用户组',2,'/webapi/position/delPosition',1052,10009,0,'position:delete');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10067,'','修改用户组','修改用户组',2,'/webapi/position/updatePosition',1053,10009,0,'position:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10068,'','用户组列表','用户组列表',2,'/webapi/position/listPosition',1001,10009,1,'position:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10069,'','用户组添加用户设置','用户组添加用户设置',2,'/webapi/position/setUserPosition',1054,10009,0,'userposition:update');
-- -----------------------

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10010,'','模版管理','模版管理',1,'/webapi/',11,null,1,'template:*');

-- ----------------------

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10076,'','模版检索','模版检索',2,'/webapi/search/searchTemplate',1150,10010,0,'template:search');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10077,'','第二模版检索','第二模版检索',2,'/webapi/search/searchTemplate2',1151,10010,0,'template2:search');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10078,'','第二模版列表','第二模版列表',2,'/webapi/template2/listTemplate2',1100,10010,1,'template2:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10079,'','删除第二模版','删除第二模版',2,'/webapi/template2/delTemplate2',1152,10010,0,'template2:delete');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10080,'','修改第二模版','修改第二模版',2,'/webapi/template2/updateTemplate2',1153,10010,0,'template2:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10081,'','创建第二模版','创建第二模版',2,'/webapi/template2/createTemplate2',1101,10010,1,'template2:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10082,'','第二模版上传','第二模版上传',2,'/webapi/template2/uploadTemplate2',1154,10010,0,'template2:upload');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10083,'','第二模版下载','第二模版下载',2,'/webapi/template2/downTemplate2',1155,10010,0,'template2:download');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10084,'','第二模版基础信息','第二模版基础信息',2,'/webapi/template2/template2Base',1102,10010,1,'template2base:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10085,'','修改第二模版基础信息','修改第二模版基础信息',2,'/webapi/template2/base/update',1156,10010,0,'template2base:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10086,'','模版列表','模版列表',2,'/webapi/template/listTemplate',1103,10010,1,'template:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10087,'','删除模版','删除模版',2,'/webapi/template/delTemplate',1157,10010,0,'template:delete');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10088,'','修改模版','修改模版',2,'/webapi/template/updateTemplate',1158,10010,0,'template:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10089,'','创建模版','创建模版',2,'/webapi/template/createTemplate',1104,10010,1,'template:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10090,'','模版上传','模版上传',2,'/webapi/template/uploadTemplate',1159,10010,0,'template:upload');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10091,'','模版下载','模版下载',2,'/webapi/template/downTemplate',1160,10010,0,'template:download');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10092,'','关联关系','关联关系',2,'/webapi/template/relation',1161,10010,0,'templaterelation:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10093,'','新增模版关系','新增模版关系',2,'/webapi/template/createRelation',1162,10010,0,'templaterelation:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10094,'','修改模版关系[批量]','修改模版关系[批量]',2,'/webapi/template/updateRelations',1163,10010,0,'templaterelation:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10095,'','删除模版关系','删除模版关系',2,'/webapi/template/delRelation',1164,10010,0,'templaterelation:delete');

-- -----------------------

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10011,'','专题管理','专题管理',1,'/webapi/',12,null,1,'topic:*');

-- ----------------------

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10070,'','专题预览','专题预览',2,'/webapi/topic/preview',1250,10011,0,'topic:preview');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10072,'','专题检索','专题检索',2,'/webapi/search/searchTopic',1251,10011,0,'topic:search');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10096,'','专题列表','专题列表',2,'/webapi/topic/listTopic',1201,10011,1,'topic:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10097,'','专题删除','专题删除',2,'/webapi/topic/delTopic',1252,10011,0,'topic:delete');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10098,'','专题发布','专题发布',2,'/webapi/topic/publish',1253,10011,0,'topic:publish');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10099,'','创建专题','创建专题',2,'/webapi/topic/createTopic',1200,10011,1,'topic:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10100,'','修改专题','修改专题',2,'/webapi/topic/updateTopic',1254,10011,0,'topic:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10101,'','专题分类列表','专题分类列表',2,'/webapi/topic/topicClassifyList',1202,10011,1,'topicclassify:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10102,'','新建专题分类','新建专题分类',2,'/webapi/topic/createTopicClassify',1203,10011,1,'topicclassify:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10103,'','修改专题分类','修改专题分类',2,'/webapi/topic/updateTopicClassify',1255,10011,0,'topicclassify:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10104,'','删除专题分类','删除专题分类',2,'/webapi/topic/delTopicClassify',1256,10011,0,'topicclassify:delete');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10105,'','系列专题分类列表','系列专题分类列表',2,'/webapi/topic/topicColumnList',1204,10011,1,'topiccolumn:read');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10112,'','新建系列专题分类','新建系列专题分类',2,'/webapi/topic/createTopicColumn',1205,10011,1,'topiccolumn:write');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10106,'','修改系列专题分类','修改系列专题分类',2,'/webapi/topic/updateTopicColumn',1257,10011,0,'topiccolumn:update');

insert into permission(id,last_modify_user_id,name,description,type,url,sort,parent_id,show_flag,permission)
values(10107,'','删除系列专题分类','删除系列专题分类',2,'/webapi/topic/delTopicColumn',1258,10011,0,'topiccolumn:delete');


-- ----------------------


