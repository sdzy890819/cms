define(["require","app","jquery","search","./searchForm","../data/getData","./addForm","../common/editPop","../moduls/Tool","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(e,t,a,i,c,n,l,o,s){t.directive("topicList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(e,t,i,d,r,u){function m(t){//设置要显示的列表
a.each(t.data.list,function(e,a){//时间格示化
a.releaseTime=new Date(a.releaseTime).format("yyyy-MM-dd h:m:s"),1==a.publish&&//需要加链接 把topicUrl值 复制到 href 生成新的 href
s.changeObjectName(t.data.list,[{name:"topicUrl",newName:"href"}])});var i=[{name:"专题标题",key:"topicTitle",changeObjectName:[{name:"topicUrl",newName:"href"}],width:"400"},
//{name:'专题内容' , key:'topicContent' },
{name:"专题相对路径",key:"topicPath"},{name:"专题文件名",key:"topicFilename"},{name:"发布时间",key:"releaseTime"},
//{name:'关键字' , key:'keyword' },
//{name:'描述、SEO标准' , key:'description' },
//{name:'URL' , key:'topicUrl' },
{name:"操作",width:"120",class:"center"}];e.listdata={//确认按钮
title:e.title,table:{select:!0,th:i,td:r.setArr(t.data.list,i),edit:[{cls:"edit",name:"编辑",evt:e.edit},{cls:"del",name:"删除",evt:e.del}]}},
// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
r.extendChild(e.listdata.table.td,e.listdata.table.edit,"edit"),e.$apply()}function p(){n.topic.listTopic({page:f,pageSize:20,callback:function(t){
//分页
e.page=t.data.page,e.page.jump=function(e){f!=e.curr&&(f=e.curr,p())},m(t)}})}
//end 显示列表
//搜索
function h(){var t=1;c(function(i){a.each(i,function(t,a){a.callback=function(t){"categoryId"==t.title&&n.channel.currentChannelList({categoryId:t.obj.id,callback:function(i){var c=[a.select[1][0]];a.select[1]=c,a.select[1]=a.select[1].concat(s.changeObjectName(i.data,[{name:"channelName",newName:"name"}])),e.$apply(),t.callback()}})}}),e.searchform={list:i,return:function(){//返回列表
p(),e.searchform.search=null,f=1,t=1,e.$$childHead.current=1},submit:function(i,c){function l(){n.search.searchTopic({condition:i.condition,topicClassifyId:r,//专题分类ID
categoryId:d,//部门分类ID
channelId:o,//频道ID
topicColumnId:s,//系列专题类型ID
releaseTime:i.releaseTime,//发布时间,
startTime:i.startTime,//创建时间
endTime:i.endTime,//创建时间
page:t,pageSize:20,callback:function(a){
//分页
e.page=a.data.page,e.page.jump=function(e){t!=e.curr&&(t=e.curr,l())},e.searchform.search={count:a.data.page.count,name:i.condition},m(a)}})}var o,s,d,r;a.each(i.selects,function(){"channelId"==this.title&&(o=this.id),"topicColumnId"==this.title&&(s=this.id),"categoryId"==this.title&&(d=this.id),"topicClassifyId"==this.title&&(r=this.id)}),l()}},e.$apply()})}e.title="专题列表",e.$parent.menu.push({name:e.title}),//栏目
angular.extend(e,{add:function(e){//保存
t.alert({text:"你的ID为："+e,btn:["确定","取消"],fn:function(e){//确定
layer.close(e)}})},edit:function(t){//保存
function c(i,c){//填充数据
n.topic.topicInfo({id:t.id,callback:function(t){t.data.releaseTime=new Date(t.data.releaseTime).format("yyyy-MM-dd h:m:s"),c?(a.each(c,function(a,i){"select"==i.type&&//填充二级 三级栏目
n.channel.currentChannelList({categoryId:t.categoryId,callback:function(t){var a=[i.select[1][0]];i.select[1]=a,i.select[1]=i.select[1].concat(s.changeObjectName(t.data,[{name:"channelName",newName:"name"}])),e.$apply()}})}),i(c)):i(t)}})}o.init({obj:t,list:l,updateData:c,save:function(e,t){//保存 新增 确认 等
var i,c,l,o;a.each(e.selects,function(){"channelId"==this.title&&(i=this.id),"topicColumnId"==this.title&&(c=this.id),"categoryId"==this.title&&(l=this.id),"topicClassifyId"==this.title&&(o=this.id)}),n.topic.updateTopic({id:t.id,topicTitle:e.topicTitle,topicContent:e.topicContent,topicPath:e.topicPath,topicFilename:e.topicFilename,topicClassifyId:o,//专题分类ID
categoryId:l,//部门类别ID
channelId:i,//频道ID
releaseTime:e.releaseTime,//发布时间
keyword:e.keyword,description:e.description,topicColumnId:c,//专题栏目ID(做系列专题使用)
callback:function(e){layui.use(["layer"],function(){var t=layui.layer;t.msg(e.message),setTimeout(function(){u.reload()},300)})}})},callback:function(t,i){//返回获取的数据 用于操作
a.each(t,function(t,a){"content"==a.title&&(a.width="800px"),"select"==a.type&&(a.callback=function(t){"categoryId"==t.title&&n.channel.currentChannelList({categoryId:t.obj.id,callback:function(i){var c=[a.select[1][0]];a.select[1]=c,a.select[1]=a.select[1].concat(s.changeObjectName(i.data,[{name:"channelName",newName:"name"}])),e.$apply(),t.callback()}})})}),c(function(e){//获取详情的数据，判断是否要新增字段，和更新二级，三级栏目 
i(e)},t)},$uibModal:i})},del:function(e){//删除
e.callback=function(t){//删除成功
layui.use(["layer"],function(){var i=layui.layer;i.msg(t.message),0==t.code&&a("table").find("tr[data-id="+e.id+"]").hide()})},t.alert({text:'您确定要删除"'+e.topicTitle+'"吗',btn:["确定","取消"],fn:function(){n.topic.delTopic(e)}})}});
//显示列表
var f=1;p(),h()},link:function(e,t){}}})});