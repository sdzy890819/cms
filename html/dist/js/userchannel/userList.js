define(["require","app","jquery","../data/getData","./addForm",,"formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(e,t,n,a,i){t.directive("userchannelUserList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(t,n,l,d,r){t.title="用户列表",t.$parent.menu.push({name:t.title}),//栏目
angular.extend(t,{add:function(e){//保存
n.alert({text:"你的ID为："+e,btn:["确定","取消"],fn:function(e){//确定
layer.close(e)}})},edit:function(t){//保存
e(["../common/editPop"],function(e){e.init({obj:t,list:i,$uibModal:l})})},del:function(e){//删除
n.alert({text:"你的ID为："+e,btn:["确定","取消"],fn:function(e){//确定
layer.close(e)}})},filter:[//过滤不需要展示的
"id","userId","lastModifyUserId"],changeTypeName:[{name:"headImage",newName:"image"}]}),a.userchannel.channelId(function(e){t.listdata={//确认按钮
title:t.title,table:{select:!0,th:[{name:"头像",width:"200"},{name:"真实名字"},{name:"操作",width:"120",class:"center"}],td:r.arr(e.data.list,t.filter),edit:[{cls:"edit",name:"编辑",evt:t.edit},{cls:"del",name:"删除",evt:t.del}]}},
// GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,['width','name']); //把TH 中的出name属性以外的属性合传给td
r.extendChild(t.listdata.table.td,t.listdata.table.edit,"edit"),t.$apply()})},link:function(e,t){}}})});