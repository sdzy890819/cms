define(["app","./form","../data/getData","../moduls/Tool","form","position","fixedNav"],function(e,t,i,n){e.directive("userpositionAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(e,n){e.$parent.menu.push({name:"新增用户组"}),e.save=function(e){//保存
i.position.createPosition({positionName:e.positionName,callback:function(e){layui.use(["layer"],function(){var t=layui.layer;t.msg(e.message),0==e.code&&n.go("userposition.list")})}})},e.rlease=function(e){},e.view=function(e){},e.cancel=function(e){},
//debugger;
e.formdata={//确认按钮
title:"新增分类",list:t,submit:[{name:"保存",evt:"save",icon_cls:"ok"}]}}}})});