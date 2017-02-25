define(["app","./addForm","../data/getData","../moduls/Tool","form","position","fixedNav"],function(t,e,i,c){t.directive("topicAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(t,a){t.title="新增专题",t.$parent.menu.push({name:t.title}),t.rlease=function(t){//发布
var e,c,n,l;$.each(t.selects,function(){"channelId"==this.title&&(e=this.id),"topicColumnId"==this.title&&(c=this.id),"categoryId"==this.title&&(n=this.id),"topicClassifyId"==this.title&&(l=this.id)}),i.topic.createTopic({topicTitle:t.topicTitle,topicContent:t.topicContent,topicPath:t.topicPath,topicFilename:t.topicFilename,topicClassifyId:l,//专题分类ID
categoryId:n,//部门类别ID
channelId:e,//频道ID
releaseTime:t.releaseTime,//发布时间
keyword:t.keyword,description:t.description,topicColumnId:c,//专题栏目ID(做系列专题使用)
callback:function(t){layui.use(["layer"],function(){var e=layui.layer;e.msg(t.message),0==t.code&&a.go("topic.list")})}})},e(function(e){$.each(e,function(e,a){"content"==a.title&&(a.width="800px"),"select"==a.type&&(a.callback=function(e){"categoryId"==e.title&&i.channel.currentChannelList({categoryId:e.obj.id,callback:function(i){var n=[a.select[1][0]];a.select[1]=n,a.select[1]=a.select[1].concat(c.changeObjectName(i.data,[{name:"channelName",newName:"name"}])),t.$apply(),e.callback()}})})}),
//debugger;
t.formdata={//确认按钮
title:t.title,list:e,submit:[{name:"确认发布",evt:"rlease",icon_cls:"ok"},{name:"清空",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]},t.$apply()})}}})});