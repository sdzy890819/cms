define(["require","app","jquery","../data/getData","./addForm","formlist","position","fixedNav","../moduls/service","../moduls/factory"],function(e,t,n,a,l){t.directive("columnList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(t,i,c,d,o){t.title="频道列表",t.$parent.menu.push({name:t.title}),//栏目
n.extend(t,{add:function(e){//保存
i.alert({text:"你的ID为："+e,btn:["确定","取消"],fn:function(e){//确定
layer.close(e)}})},edit:function(t){//保存
e(["../common/editPop"],function(e){e.init({obj:t,list:l,$uibModal:c})})},del:function(e){//删除
i.alert({text:"你的ID为："+e,btn:["确定","取消"],fn:function(e){//确定
layer.close(e)}})},filter:[//过滤不需要展示的
"id","categoryId"]}),a.channel.listChannel(function(e){var n=[{name:"频道名称",key:"channelName",width:"200"},{name:"频道域名",key:"channelUrl"},{name:"频道绝对路径",key:"channelPath"},{name:"模版位置",key:"templatePath"},{name:"频道说明",key:"channelDesc"},{name:"部门分类ID",key:"categoryId"},{name:"操作",width:"120",class:"center"}];t.listdata={//确认按钮
title:t.title,table:{select:!0,th:n,td:o.setArr(e.data,n),edit:[{cls:"edit",name:"编辑",evt:t.edit},{cls:"del",name:"删除",evt:t.del}]}},
// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
o.extendChild(t.listdata.table.td,t.listdata.table.edit,"edit"),t.$apply()})},link:function(e,t){}}})});