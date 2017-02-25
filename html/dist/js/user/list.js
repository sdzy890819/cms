define(["require","app","jquery","../data/getData","./addForm","search","./searchForm","formlist","position","fixedNav","../moduls/service","../moduls/factory"],function(e,t,a,n,i,c,l){t.directive("userList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(t,i,c,d,r){function o(e){var n=[{name:"头像",key:"headImage",width:"200"},{name:"真实名称",key:"realName"},{name:"IDFA(MAC)",key:"idfa"},{name:"用户ID",key:"userId"},{name:"操作",width:"300",class:"center"}];a.each(e.data.list,function(e,t){t.idfa||(t.idfa="")}),t.listdata={//确认按钮
title:t.title,table:{select:!0,th:n,td:r.setArr(e.data.list,n),edit:[{cls:"edit",name:"所属频道",evt:t.editUserChannel},{cls:"edit",name:"用户组",evt:t.editUserPosition},{cls:"del",name:"删除",evt:t.del}]}},r.changeTypeName(t.listdata.table.td,[{name:"headImage",newName:"image"}]),a.each(t.listdata.table.td,function(e,t){t.list[0].image=t.headImage,t.list[0].name=!1}),r.extendChild(t.listdata.table.td,t.listdata.table.edit,"edit"),t.$apply()}function s(){n.user.userlist({page:m,pageSize:20,callback:function(e){
//分页
t.page=e.data.page,t.page.jump=function(e){m!=e.curr&&(m=e.curr,s())},o(e)}})}
//搜索
function u(){var e=1;l(function(a){t.searchform={list:a,return:function(){//返回列表
s(),t.searchform.search=null,m=1,e=1,t.$$childHead.current=1},submit:function(a,i){function c(){n.search.searchUser({condition:a.condition,page:e,pageSize:20,callback:function(n){
//分页
t.page=n.data.page,t.page.jump=function(t){e!=t.curr&&(e=t.curr,c())},t.searchform.search={count:n.data.page.count,name:a.condition},void 0==n.data.list&&(n.data.list=[]),o(n)}})}c()}},t.$$phase||t.$apply()})}t.title="用户列表",t.$parent.menu.push({name:t.title}),//栏目
a.extend(t,{add:function(e){//保存
i.alert({text:"你的ID为："+e,btn:["确定","取消"],fn:function(e){//确定
layer.close(e)}})},edit:function(e){},editUserChannel:function(t){e(["./channelPop"],function(e){e.init({obj:t,$uibModal:c})})},editUserPosition:function(t){e(["./positionPop"],function(e){e.init({obj:t,$uibModal:c})})},del:function(e){//删除
i.alert({text:"你确定删除："+e.realName,btn:["确定","取消"],fn:function(t){//确定
n.user.delUser(e)}}),e.callback=function(t){layui.use(["layer"],function(){var n=layui.layer;n.msg(t.message),0==t.code&&a("table").find("tr[data-id="+e.id+"]").hide()})}},filter:[//过滤不需要展示的
"id","userId","lastModifyUserId"],changeTypeName:[{name:"headImage",newName:"image"}]});var m=1;s(),u()},link:function(e,t){}}})});