define(["app","./addForm","../data/getData","../moduls/Tool","form","position","fixedNav"],function(e,t,a,o){e.directive("categoryAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(e,o){e.$parent.menu.push({name:"新增部门分类"}),e.save=function(e){//保存
a.category.createCategory({categoryName:e.categoryName,categoryDesc:e.categoryDesc,callback:function(e){layui.use(["layer"],function(){var t=layui.layer;t.msg(e.message),0==e.code&&o.go("category.list")})}})},e.rlease=function(e){},e.view=function(e){},e.cancel=function(e){},t(function(t){
//debugger;
e.formdata={//确认按钮
title:"新增分类",list:t,submit:[{name:"保存",evt:"save",icon_cls:"ok"}]},e.$apply()})}}})});