define(["app","./columnForm","../data/getData","form","position","fixedNav"],function(e,t,i){e.directive("newscolumnAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(e,a){e.$parent.menu.push({name:"新闻栏目编辑"}),//栏目
e.save=function(e){//保存
var t,l,n;$.each(e.selects,function(){"channelId"==this.title&&(t=this.id),"listTemplate2Id"==this.title&&(l=this.id),"detailTemplate2Id"==this.title&&(n=this.id)}),i.news.createNewsColumn({channelId:t,//频道ID
columnName:e.columnName,listId:e.listId,//预模版list接口返回的预模版ID. 不是必须
detailId:e.detailId,//预模版detail接口返回的预模版ID. 不是必须
listTemplate2Id:l,//第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
detailTemplate2Id:n,//第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
keywords:e.keywords,//不是必须
description:e.description,//不是必须
callback:function(e){layui.use(["layer"],function(){var t=layui.layer;t.msg(e.message),0==e.code&&a.go("newscolumn.list")})}})},t(function(t){e.formdata={//确认按钮
title:"新增栏目",list:t,submit:[{name:"确认新增",evt:"save",icon_cls:"save"}]},e.$apply()})}}})});