define(["app","./addForm","form","position","fixedNav"],function(e,t){e.directive("userchannelAddUser",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(e){e.title="创建用户权限",e.$parent.menu.push({name:e.title}),e.save=function(e){//保存
alert(e)},e.cancel=function(e){//取消
alert(e)},e.formdata={//确认按钮
title:e.title,list:t,submit:[{name:"保存",evt:"save",icon_cls:"save"},{name:"清空",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]}}}})});