define(["app","jquery","./columnForm","../data/getData","../common/editPop","formlist","position","fixedNav","../moduls/service","../moduls/factory"],function(e,t,a,i,l){e.directive("newscolumnList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(e,n,d,c,s){function o(){i.news.newscolumn_list({page:u,pageSize:20,callback:function(a){
//分页
e.page=a.data.page,e.page.jump=function(e){u!=e.curr&&(u=e.curr,o())};
//end 分页
var i=[{name:"ID",key:"id",width:"50"},{name:"栏目名",key:"columnName",width:"500"},{name:"频道ID",key:"channelId"},{name:"操作",width:"200",class:"center"}];e.listdata={//确认按钮
title:e.title,table:{select:!0,th:i,td:d.setArr(a.data.list,i),edit:[{cls:"edit",name:"编辑",evt:e.edit},/*	{cls : 'edit' , name : '添加权限到组',evt:$scope.edit},*/
{cls:"del",name:"删除",evt:e.del}]}},
//GenerateArrList.extendType($scope.listdata.table.td,th,['width','name','key']); //把TH 中的出name,key,width属性以外的属性合传给td
t.each(e.listdata.table.td,function(e,t){t.listUrl&&(t.list[1].href=t.listUrl)}),d.extendChild(e.listdata.table.td,e.listdata.table.edit,"edit"),e.$apply()}})}e.title="新闻栏目列表",e.$parent.menu.push({name:e.title}),//栏目
angular.extend(e,{edit:function(e){function n(t){//填充数据
i.news.newscolumn({id:e.id,callback:function(e){
//_data.data.writeTime = new Date(_data.data.writeTime).format('yyyy-MM-dd h:m:s');
t(e),d=e}})}//保存
var d=null;l.init({obj:e,list:a,updateData:n,save:function(e,a){//保存或新增
var l=a.channelId,n=a.listTemplate2Id,d=a.detailTemplate2Id;t.each(e.selects,function(){"channelId"==this.title&&(l=this.id),"listTemplate2Id"==this.title&&(n=this.id),"detailTemplate2Id"==this.title&&(d=this.id)}),i.news.updateNewsColumn({id:a.id,channelId:l,//频道ID
columnName:e.columnName,listId:e.listId,//预模版list接口返回的预模版ID. 不是必须
detailId:e.detailId,//预模版detail接口返回的预模版ID. 不是必须
listTemplate2Id:n,//第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
detailTemplate2Id:d,//第二套模版接口模版ID，不是必须。如果选择则传参。参考B19文档
keywords:e.keywords,//不是必须
description:e.description,//不是必须
callback:function(e){layui.use(["layer"],function(){var t=layui.layer;t.msg(e.message),setTimeout(function(){s.reload()},300)})}})},callback:function(e,t){//返回获取的数据 用于操作
t(e)},$uibModal:c})},del:function(e){//保存
e.callback=function(a){//删除成功
layui.use(["layer"],function(){var i=layui.layer;i.msg(a.message),0==a.code&&t("table").find("tr[data-id="+e.id+"]").hide()})},n.alert({text:'您确定要删除"'+e.columnName+'"吗',btn:["确定","取消"],fn:function(){i.news.delNewsColumn(e)}})}});/*$scope.navEdit = { //导航操作按钮
					//nav : [selectAll],
					list : [
						{
							name : '批量删除',
							event : function(id , scope , evt){
								scope.delAll(function( ids ){
									console.log(ids)
								});
							},
							cls :'red',
							icon_cls : 'remove'
						}
					]
				}*/
var u=1;o()},link:function(e,t){}}})});