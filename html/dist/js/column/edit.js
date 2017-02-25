define(["app","./addForm","form","position","fixedNav"],function(e,t){e.directive("columnEdit",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(e){e.title="新增频道",e.$parent.menu.push({name:e.title}),//栏目
$.extend(e,{save:function(e){//保存
alert(e)},cancel:function(e){//取消
alert(e)}}),e.formdata={//确认按钮
title:e.title,list:t,submit:[{name:"确定",evt:"save",icon_cls:"save"},{name:"清空",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]}}}})});