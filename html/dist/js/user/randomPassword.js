define(["app","form","position","fixedNav","../moduls/service"],function(t,e){t.directive("userRandomPassword",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function(t,e){function n(t,e){var n=t;if(!e)var e="~!@#$%^&*()_+abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";var a="";for(x=0;x<n;x++){var r=Math.floor(Math.random()*e.length);a+=e.charAt(r)}return a}t.title="用户密码随机生成",t.$parent.menu.push({name:t.title}),angular.extend(t,{save:function(t){//保存
alert(t)},cancel:function(t){//取消
alert(t)},rendomPwd:function(t,a){//生成密码
var r=n(9),l=$(a).parent().parent().prev().find("input");l.val(r),e.alert({title:"生成密码成功",text:"请记住您的密码："+r,btn:["确定"],fn:function(t){//确定
layer.close(t)}})},edit:{//导航操作按钮
list:[{name:"保存",evt:t.save,cls:"add"}]}}),t.formdata={//确认按钮
title:t.title,list:[[{title:"title",name:"用户密码",type:"password"},{title:"button",name:"生成密码",type:"button",evt:t.rendomPwd}]],submit:[{name:"保存",evt:"save",icon_cls:"save"},{name:"取消",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]}}}})});