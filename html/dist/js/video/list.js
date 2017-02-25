define(["require","app","jquery","../data/getData","./addForm","search","./searchForm","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(e,t,a,i,n,c,d){t.directive("videoList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(t,c,l,o,r){function u(e){var a=[{name:"ID",key:"id",width:"50"},{name:"视频标题",key:"videoTitle",width:"200"},{name:"视频链接URL",key:"videoUrl"},{name:"操作",width:"120",class:"center"}];t.listdata={//确认按钮
title:t.title,table:{select:!0,th:a,td:r.setArr(e.data.list,a),edit:[{cls:"edit",name:"编辑",evt:t.edit},{cls:"del",name:"删除",evt:t.del}]}},
// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
r.extendChild(t.listdata.table.td,t.listdata.table.edit,"edit"),t.$apply()}function s(){i.video.videolist({page:p,pageSize:20,callback:function(e){
//分页
t.page=e.data.page,t.page.jump=function(e){p!=e.curr&&(p=e.curr,s())},u(e)}})}
//搜索
function f(){var e=1;d(function(a){t.searchform={list:a,return:function(){//返回列表
s(),t.searchform.search=null,p=1,e=1,t.$$childHead.current=1},submit:function(a,n){function c(){i.search.searchVideo({condition:a.condition,page:e,pageSize:20,callback:function(i){
//分页
t.page=i.data.page,t.page.jump=function(t){e!=t.curr&&(e=t.curr,c())},t.searchform.search={count:i.data.page.count,name:a.condition},u(i)}})}c()}},t.$$phase||t.$apply()})}t.title="视频管理",t.$parent.menu.push({name:t.title}),//栏目
angular.extend(t,{add:function(e){//保存
c.alert({text:"你的ID为："+e,btn:["确定","取消"],fn:function(e){//确定
layer.close(e)}})},edit:function(t){//保存
e(["./editVideoPop"],function(e){function a(e){var a={data:t};e(a)}e.init({obj:t,list:n,$uibModal:l,updateData:a,callback:function(e,t){t(e)}})})},del:function(e){//删除
c.alert({text:"你确定删除："+e.videoTitle,btn:["确定","取消"],fn:function(t){//确定
i.video.delVideo(e)}}),e.callback=function(t){layui.use(["layer"],function(){var i=layui.layer;i.msg(t.message),0==t.code&&a("table").find("tr[data-id="+e.id+"]").hide()})}},filter:[//过滤不需要展示的
"id","uploadUserId"]});var p=1;s(),f()},link:function(e,t){}}})});