define(["app","./addForm","../data/getData","../moduls/Tool","form","position","fixedNav"],function(e,t,a,l){e.directive("templateAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(e,l){e.title="新增模版",e.$parent.menu.push({name:e.title}),e.rlease=function(e){//发布
var t,n;console.log(e.selects),$.each(e.selects,function(){"templateClassify"==this.title&&(t=this.type),"channelId"==this.title&&(n=this.id)}),a.template.createTemplate({templateName:e.templateName,templateDesc:e.templateDesc,filename:e.filename,path:e.path,templateClassify:t,job:"定时生成"==e.job?1:0,//是否定时生成。1是定时生成。0是触发生成
encoded:e.encoded,channelId:n,//频道ID
sortNum:e.sortNum,//排序值
callback:function(e){layui.use(["layer"],function(){var t=layui.layer;t.msg(e.message),0==e.code&&l.go("template.list")})}})},t(function(t){e.data={sortNum:1e3},
//debugger;
e.formdata={//确认按钮
title:e.title,list:t,submit:[{name:"确认发布",evt:"rlease",icon_cls:"ok"},{name:"清空",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]},e.$apply()})}}})});