define(["app","./addForm","form","position","fixedNav"],function(e,t){e.directive("jurisdictionAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(e){e.$parent.menu.push({name:"新增权限"}),angular.extend(e,{save:function(e){//保存
alert(e)},cancel:function(e){//取消
alert(e)}}),e.edit={//导航操作按钮
list:[{name:"保存",evt:e.save,cls:"add"}]},e.formdata={//确认按钮
title:"新增新闻",list:t,submit:[{name:"保存",evt:"save",icon_cls:"save"},{name:"取消",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]}}}})});