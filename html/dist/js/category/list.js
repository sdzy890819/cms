define(["app","jquery","require","../data/getData","./addForm","./edit","formlist","position","fixedNav","../moduls/service","../moduls/factory"],function(t,e,a,i,l,n){t.directive("categoryList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(t,a,d,c,r){function o(){i.category.listCategory({callback:function(e){var a=[{name:"分类名",key:"categoryName",width:"200"},{name:"分类说明",key:"categoryDesc"},{name:"操作",width:"120",class:"center"}];t.listdata={//确认按钮
title:t.title,table:{select:!0,th:a,td:r.setArr(e.data,a),edit:[{cls:"edit",name:"编辑",evt:t.edit},{cls:"del",name:"删除",evt:t.del}]}},
// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
r.extendChild(t.listdata.table.td,t.listdata.table.edit,"edit"),t.$apply()}})}t.title="部门列表",t.$parent.menu.push({name:t.title}),//部门分类
angular.extend(t,{edit:function(t){//保存
function e(e){//填充数据
var a={data:t};e(a)}n.init({id:t.id,obj:t,list:l,updateData:e,callback:function(t,e){e(t)},$uibModal:d})},del:function(t){//保存
a.alert({text:"您确定要删除"+t.categoryName+"吗",btn:["确定","取消"],fn:function(){i.category.delCategory(t)}}),t.callback=function(a){layui.use(["layer"],function(){var i=layui.layer;i.msg(a.message),0==a.code&&e("table").find("tr[data-id="+t.id+"]").hide()})}},filter:[//过滤不需要展示的
"id"]}),o()},link:function(t,e){}}})});