define(["require","app","jquery","../data/getData","./classForm",,"formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(t,e,a,i,l){e.directive("fragmentClassList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(e,n,s,c,d,r){e.title="碎片分类列表",e.$parent.menu.push({name:e.title}),//栏目
angular.extend(e,{edit:function(e){//保存
t(["../common/editPop"],function(t){function a(t){var a={data:e};t(a)}t.init({obj:e,list:l,$uibModal:s,updateData:a,save:function(t,e){i.fragment.updateClassify({id:e.id,classifyName:t.classifyName,callback:function(t){layui.use(["layer"],function(){var e=layui.layer;e.msg(t.message),r.reload()})}})},callback:function(t,e){e(t)}})})},del:function(t){//删除
n.alert({text:"你确定删除"+t.classifyName+"吗?",btn:["确定","取消"],fn:function(e){//确定										
i.fragment.delClassify(t)}}),t.callback=function(e){layui.use(["layer"],function(){var i=layui.layer;i.msg(e.message),0==e.code&&a("table").find("tr[data-id="+t.id+"]").hide()})}},filter:[//过滤不需要展示的
"id"]}),i.fragment.listClassify({callback:function(t){var a=[{name:"名称",key:"classifyName"},{name:"操作",width:"120",class:"center"}];e.listdata={//确认按钮
title:e.title,table:{select:!0,th:a,td:d.setArr(t.data,a),edit:[{cls:"edit",name:"编辑",evt:e.edit},{cls:"del",name:"删除",evt:e.del}]}},
// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
d.extendChild(e.listdata.table.td,e.listdata.table.edit,"edit"),e.$apply()}})},link:function(t,e){}}})});