define(["require","app","jquery","../data/getData","./classForm","../common/editPop","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(t,e,a,i,l,n){e.directive("topicClassList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(t,e,a,c,s,o){t.title="专题分类列表",t.$parent.menu.push({name:t.title}),//栏目
angular.extend(t,{edit:function(t){//保存 obj为原始数据
function e(e){//填充数据
s.changeTypeName([t],[{name:"classifyName",newName:"name"}]),e({data:t})}n.init({obj:t,list:l,updateData:e,save:function(e,a){//保存 新增 确认 等 _obj为修改后的数据 _detail等于updateData 
i.topic.updateTopicClassify({id:t.id,name:e.name,callback:function(t){layui.use(["layer"],function(){var e=layui.layer;e.msg(t.message),setTimeout(function(){o.reload()},300)})}})},callback:function(t,e){//返回获取的数据 用于操作
e(t)},$uibModal:a})},del:function(t){//删除
t.callback=function(t){//删除成功
layui.use(["layer"],function(){var e=layui.layer;e.msg(t.message),setTimeout(function(){o.reload()},300)})},e.alert({text:"您确定要删除吗",btn:["确定","取消"],fn:function(){i.topic.delTopicClassify(t)}})}}),i.topic.topicClassifyList({callback:function(e){var a=[{name:"专题分类名称",key:"classifyName"},{name:"操作",width:"120",class:"center"}];t.listdata={//确认按钮
title:t.title,table:{select:!0,th:a,td:s.setArr(e.data,a),edit:[{cls:"edit",name:"编辑",evt:t.edit},{cls:"del",name:"删除",evt:t.del}]}},
// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
s.extendChild(t.listdata.table.td,t.listdata.table.edit,"edit"),t.$apply()}})},link:function(t,e){}}})});