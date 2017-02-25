define(["require","app","jquery","../data/getData","./addForm","../moduls/Tool","../common/editPop","./relationPop","../upload/index","search","./searchForm","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(e,t,a,n,i,l,c,o,d,s,u){t.directive("templateList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(e,t,s,m,r,p,f){function h(t){a.each(t.data.list,function(e,a){//时间格示化
a.releaseTime=new Date(a.releaseTime).format("yyyy-MM-dd h:m:s"),1==a.publish&&//需要加链接 把topicUrl值 复制到 href 生成新的 href
l.changeObjectName(t.data.list,[{name:"topicUrl",newName:"href"}])});var n=[{name:"模版名称",key:"templateName",width:"200"},
//{name:'模版说明' , key:'templateDesc' },
//{name:'文件名',width:'90' , key:'filename'},
//{name:'发布目录',width:'100' , key:'path'},
{name:"模版分类",key:"templateClassifyStr"},{name:"编码",width:"80",class:"center",key:"encoded"},
//{name:'排序值', width:'90',class:'center' , key:'sortNum'},
{name:"操作",width:"350",class:"center"}];e.listdata={//确认按钮
title:e.title,table:{select:!0,th:n,td:r.setArr(t.data.list,n),edit:[{cls:"down",name:"下载",evt:e.down},{cls:"upload",name:"上传",evt:e.upload},//'exe|dmg'
{cls:"add",name:"关联",evt:e.relation},{cls:"edit",name:"编辑",evt:e.edit},{cls:"del",name:"删除",evt:e.del}]}},r.extendType(e.listdata.table.td,e.listdata.table.th,["width","name"]),//把TH 中的出name属性以外的属性合传给td
r.extendChild(e.listdata.table.td,e.listdata.table.edit,"edit"),a.each(e.listdata.table.td,function(e,t){t.publish&&(t.list[0].href="/webapi/template/redirect/"+t.id);
// if(item.upload==1){//1是上传过。0是未上传
// var arr = [];
// $.each(item.list.edit,function( j , obj ){
// 	if(obj.name!='下载'){
// 		arr.push(obj);
// 	}
// });
// item.list.edit = arr;
// }
// if(item.job==1){//1是定时生成。0是触发生成
// 	var arr = [];
// 	$.each(item.list.edit,function( j , obj ){
// 		if(obj.name!='关联'){
// 			arr.push(obj);
// 		}
// 	});
// 	item.list.edit = arr;
// }
var n=[];a.each(t.list.edit,function(e,a){"关联"==a.name&&1==t.job||"下载"==a.name&&0==t.upload||n.push(a)}),t.list.edit=n}),e.$apply()}function b(){n.template.listTemplate({page:g,pageSize:20,callback:function(t){
//分页
e.page=t.data.page,e.page.jump=function(e){g!=e.curr&&(g=e.curr,b())},h(t)}})}
//搜索
function y(){var t=1;u(function(i){e.searchform={list:i,return:function(){//返回列表
b(),e.searchform.search=null,g=1,t=1,e.$$childHead.current=1},submit:function(i,l){function c(){n.search.searchTemplate({condition:i.condition,channelId:o,//频道ID
page:t,pageSize:20,callback:function(a){
//分页
e.page=a.data.page,e.page.jump=function(e){t!=e.curr&&(t=e.curr,c())},e.searchform.search={count:a.data.page.count,name:i.condition},void 0==a.data.list&&(a.data.list=[]),h(a)}})}var o;a.each(i.selects,function(){"channelId"==this.title&&(o=this.id)}),c()}},e.$apply()})}e.title="模版列表",e.$parent.menu.push({name:e.title}),//栏目
/*$scope.navEdit = { //导航操作按钮
					nav : [{
						name : '下载模版',
						event : function(obj , scope , evt){
							scope.getOneSelect($scope.down);
						},
						cls : 'down'
					}],
					list : [
						{
							name : '模版关联',
							event : function(obj , scope , evt){
								scope.getOneSelect($scope.relation);
							},
							cls : 'plus'
						},
						{
							name : '删除',
							event : function(obj , scope , evt){
								scope.getOneSelect($scope.del);
							},
							cls : 'del'
						}
					]
				}*/
angular.extend(e,{add:function(e){//保存
t.alert({text:"你的ID为："+e,btn:["确定","取消"],fn:function(e){//确定
layer.close(e)}})},edit:function(e){//保存
function t(t){//填充数据
n.template.templateInfo({id:e.id,callback:function(e){
//_data.data.releaseTime = new Date(_data.data.releaseTime).format('yyyy-MM-dd h:m:s');																		
0==e.data.job?e.data.job="触发生成":e.data.job="定时生成",t(e)}})}c.init({obj:e,list:i,updateData:t,save:function(e,t){//保存 新增 确认 等
var i,l;a.each(e.selects,function(){"templateClassify"==this.title&&(i=this.type),"channelId"==this.title&&(l=this.id)}),n.template.updateTemplate({id:t.id,templateName:e.templateName,templateDesc:e.templateDesc,filename:e.filename,path:e.path,templateClassify:i,job:"触发生成"==e.job?0:1,//是否定时生成。1是定时生成。0是触发生成
encoded:e.encoded,channelId:l,//频道ID
sortNum:e.sortNum,//排序值
callback:function(e){layui.use(["layer"],function(){var t=layui.layer;t.msg(e.message),setTimeout(function(){f.reload()},300)})}})},callback:function(e,t){//返回获取的数据 用于操作
t(e)},$uibModal:s})},del:function(e){//删除
e.callback=function(t){//删除成功
layui.use(["layer"],function(){var n=layui.layer;n.msg(t.message),0==t.code&&a("table").find("tr[data-id="+e.id+"]").hide()})},t.alert({text:'您确定要删除"'+e.templateName+'"吗',btn:["确定","取消"],fn:function(){n.template.delTemplate(e)}})},down:function(e){// 下载
n.template.downTemplate({id:e.id,callback:function(){}})},upload:function(e){d.init({obj:e,data:{title:"上传文件",name:"请选择文件",type:"file",event:function(t,a){p.base64DataUrl(t).then(function(t){t=t.split(",")[1],//不要BASE64 CODE 的前缀
n.template.uploadTemplate({baseCode:t,id:e.id,callback:function(e){layui.use(["layer"],function(){var t=layui.layer;t.msg(e.message)}),setTimeout(function(){a.dismiss("cancel")},400)}})})}},$uibModal:s})},relation:function(e){//关联
o.init({obj:e,callback:function(e,t){//返回获取的数据 用于操作
t(e)},$uibModal:s})}});var g=1;b(),y()},link:function(e,t){}}})});