define(["app","./addForm","../data/getData","form","position","fixedNav"],function(t,e,a){t.directive("fragmentAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(t,n){t.title="新增碎片",t.$parent.menu.push({name:t.title}),t.save=function(t,e){//保存
var i,l,r;$.each(t.selects,function(){"channelId"==this.title&&(i=this.id),"fragmentClassifyId"==this.title&&(l=this.id)}),r||(r=1e3),a.fragment.createFragment({channelId:i,fragmentClassifyId:l,fragmentName:t.fragmentName,fragmentModel:t.fragmentModel,sortNum:r,callback:function(t){layui.use(["layer"],function(){var e=layui.layer;e.msg(t.message),0==t.code&&n.go("fragment.list")})}})},t.cancel=function(t){//取消
alert(t)},e(function(e){t.formdata={//确认按钮
title:t.title,list:e,submit:[{name:"保存",evt:"save",icon_cls:"save"}]},t.$apply()})}}})});