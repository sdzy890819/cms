define(["require","app","jquery","../data/getData","./addForm",,"formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(t,e,n,i,l){e.directive("jurisdictionList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(e,n,a,s,o){e.title="权限列表",e.$parent.menu.push({name:e.title}),//栏目
angular.extend(e,{add:function(t){//保存
n.alert({text:"你的ID为："+t,btn:["确定","取消"],fn:function(t){//确定
layer.close(t)}})},edit:function(e){//保存
t(["../common/editPop"],function(t){t.init({obj:e,list:l,$uibModal:a})})},del:function(t){//删除
n.alert({text:"你的ID为："+t,btn:["确定","取消"],fn:function(t){//确定
layer.close(t)}})},permission:function(t){n.alert({text:"你的ID为："+t,btn:["确定","取消"],fn:function(t){//确定
layer.close(t)}})},filter:[//过滤不需要展示的
{id:"parentId"},"parentId","type","showFlag"]}),i.permission.listPermission(function(t){e.listdata={//确认按钮
title:e.title,table:{select:!0,th:[{name:"名称",width:"200"},{name:"说明"},{name:"url"},{name:"sort",class:"center"},{name:"permission",class:"center"},{name:"操作",width:"200",class:"center"}],td:o.arr(t.data.permissions,e.filter),edit:[{cls:"edit",name:"设置权限",evt:e.permission},{cls:"edit",name:"编辑",evt:e.edit},{cls:"del",name:"删除",evt:e.del}]},submit:[{name:"全选",evt:function(t,e,n){e.selectAll(n)},icon_cls:"ok"},{name:"设置权限",evt:function(t,n,i){n.delAll(function(t){e.permission(t)})},icon_cls:"edit"}]},o.extendType(e.listdata.table.td,e.listdata.table.th,["width","name"]),//把TH 中的出name属性以外的属性合传给td
o.extendChild(e.listdata.table.td,e.listdata.table.edit,"edit"),e.$apply()})},link:function(t,e){}}})});