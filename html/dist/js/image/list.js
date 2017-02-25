define(["require","app","jquery","search","./searchForm","../data/getData","./addForm",,"formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(e,t,a,i,n,l,r){t.directive("imageList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(t,i,c,d,m){function o(e){//设置要显示的列表
var i=[{name:"图片ID",key:"id"},{name:"图片标题",key:"imageTitle"},{name:"图片地址",key:"imageUrl",width:"200"},{name:"预览图",key:"imageUrl",width:"50"},{name:"图片宽度",key:"imageWidthPixel"},{name:"图片高度",key:"imageHeightPixel"},{name:"操作",width:"150",class:"center"}];t.listdata={//确认按钮
title:t.title,table:{select:!0,th:i,td:m.setArr(e.data.list,i),edit:[{cls:"edit",name:"编辑",evt:t.edit},{cls:"del",name:"删除",evt:t.del}]}},
// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
a.each(t.listdata.table.td,function(e,t){t.list[3].image=t.imageUrl,t.list[3].name=!1}),m.extendChild(t.listdata.table.td,t.listdata.table.edit,"edit"),t.$$phase||t.$apply()}function u(){l.image.imageslist({page:g,pageSize:20,callback:o})}
//end 显示列表
//搜索
function s(){var e=1;n(function(a){t.searchform={list:a,return:function(){//返回列表
u(),t.searchform.search=null,g=1,e=1,t.$$childHead.current=1},submit:function(a,i){function n(){l.search.searchImages({condition:a.condition,page:e,pageSize:20,callback:function(i){
//分页
t.page=i.data.page,t.page.jump=function(t){e!=t.curr&&(e=t.curr,n())},t.searchform.search={count:i.data.page.count,name:a.condition},o(i)}})}n()}},t.$$phase||t.$apply()})}t.title="图片列表",t.$parent.menu.push({name:t.title}),//栏目
angular.extend(t,{add:function(e){//保存
i.alert({text:"你的ID为："+e,btn:["确定","取消"],fn:function(e){//确定
layer.close(e)}})},edit:function(t){//保存
e(["./editImagePop"],function(e){function a(e){var a={};a.imageUrl=t.imageUrl,a.title=t.imageTitle,0==t.watermark?a.watermark="否":a.watermark="是",a.imageWidth=t.imageWidthPixel,a.imageHeight=t.imageHeightPixel;var i={data:a};e(i)}e.init({obj:t,list:r,$uibModal:c,updateData:a,callback:function(e,t){t(e)}})})},del:function(e){//删除
i.alert({text:"你确定删除："+e.imageTitle,btn:["确定","取消"],fn:function(t){//确定
l.image.delImage(e)}}),e.callback=function(t){layui.use(["layer"],function(){var i=layui.layer;i.msg(t.message),0==t.code&&a("table").find("tr[data-id="+e.id+"]").hide()})}},filter:[//过滤不需要展示的
"id","uploadUserId"]});
//显示列表
var g=1;u(),s()},link:function(e,t){}}})});