define(["require","app","jquery","../data/getData","./classForm",,"formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(t,e,i,n,a){e.directive("fragmentListHistory",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(e,i,l,r,d){e.title="碎片历史纪录",e.$parent.menu.push({name:e.title}),//栏目
angular.extend(e,{add:function(t){//保存
i.alert({text:"你的ID为："+t,btn:["确定","取消"],fn:function(t){//确定
layer.close(t)}})},edit:function(e){//保存
t(["../common/editPop"],function(t){t.init({obj:e,list:a,$uibModal:l})})},del:function(t){//删除
i.alert({text:"你的ID为："+t,btn:["确定","取消"],fn:function(t){//确定
layer.close(t)}})},filter:[//过滤不需要展示的
"id","fragmentId","userId","fragmentClassifyId"]}),n.fragment.listHistory(function(t){e.listdata={//确认按钮
title:e.title,table:{select:!0,th:[{name:"碎片当前内容"},{name:"碎片名称"},{name:"当前时间"},{name:"操作",width:"120",class:"center"}],td:d.arr(t.data.list,e.filter),edit:[{cls:"edit",name:"编辑",evt:e.edit},{cls:"del",name:"删除",evt:e.del}]}},
// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
d.extendChild(e.listdata.table.td,e.listdata.table.edit,"edit"),e.$apply()})},link:function(t,e){}}})});