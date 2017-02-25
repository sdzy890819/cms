define(["require","app","jquery","../data/getData","./addForm","../moduls/Tool","../common/editPop","../template/relationPop","../upload/index","search","./searchForm","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(e,t,a,n,i,l,c,o,d,u,s){t.directive("template2List",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(e,t,u,m,r,p,f){function h(t){a.each(t.data.list,function(e,a){//时间格示化
a.releaseTime=new Date(a.releaseTime).format("yyyy-MM-dd h:m:s"),1==a.publish&&//需要加链接 把topicUrl值 复制到 href 生成新的 href
l.changeObjectName(t.data.list,[{name:"topicUrl",newName:"href"}])});var n=[{name:"模版名称",key:"templateName",width:"200"},
//{name:'模版说明' , key:'templateDesc' },
//{name:'文件名',width:'90' , key:'filename'},
//{name:'发布目录',width:'100' , key:'path'},
{name:"模版分类",width:"200",key:"templateClassifyStr"},{name:"编码",width:"80",class:"center",key:"encoded"},
//{name:'排序值', width:'90',class:'center' , key:'sortNum'},
{name:"操作",width:"250",class:"center"}];e.listdata={//确认按钮
title:e.title,table:{select:!0,th:n,td:r.setArr(t.data.list,n),edit:[{cls:"down",name:"下载",evt:e.down},{cls:"upload",name:"上传",evt:e.upload},//'exe|dmg'
// {cls : 'add', name : '关联',evt:$scope.relation},
{cls:"edit",name:"编辑",evt:e.edit},{cls:"del",name:"删除",evt:e.del}]}},r.extendType(e.listdata.table.td,e.listdata.table.th,["width","name"]),//把TH 中的出name属性以外的属性合传给td
r.extendChild(e.listdata.table.td,e.listdata.table.edit,"edit"),a.each(e.listdata.table.td,function(e,t){
// if(item.upload==1){//1是上传过。0是未上传
// 	var arr = [];
// 	$.each(item.list.edit,function( j , obj ){
// 		if(obj.name!='下载'){
// 			arr.push(obj);
// 		}
// 	});
// 	item.list.edit = arr;
// }
var n=[];a.each(t.list.edit,function(e,a){"关联"==a.name&&1==t.job||"下载"==a.name&&0==t.upload||n.push(a)}),t.list.edit=n}),e.$apply()}function b(){n.template.listTemplate2({page:g,pageSize:20,callback:function(t){
//分页
e.page=t.data.page,e.page.jump=function(e){g!=e.curr&&(g=e.curr,b())},h(t)}})}
//搜索
function y(){var t=1;s(function(a){e.searchform={list:a,return:function(){//返回列表
b(),e.searchform.search=null,g=1,t=1,e.$$childHead.current=1},submit:function(a,i){function l(){n.search.searchTemplate2({condition:a.condition,page:t,pageSize:20,callback:function(n){
//分页
e.page=n.data.page,e.page.jump=function(e){t!=e.curr&&(t=e.curr,l())},e.searchform.search={count:n.data.page.count,name:a.condition},void 0==n.data.list&&(n.data.list=[]),h(n)}})}l()}}})}e.title="第二套模版列表",e.$parent.menu.push({name:e.title}),//栏目
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
n.template.template2Info({id:e.id,callback:function(e){
//_data.data.releaseTime = new Date(_data.data.releaseTime).format('yyyy-MM-dd h:m:s');
t(e)}})}c.init({obj:e,list:i,updateData:t,save:function(e,t){//保存 新增 确认 等
var i;a.each(e.selects,function(){"templateClassify"==this.title&&(i=this.type)}),n.template.updateTemplate2({id:t.id,templateName:e.templateName,filename:e.filename,path:e.path,templateClassify:i,encoded:e.encoded,callback:function(e){layui.use(["layer"],function(){var t=layui.layer;t.msg(e.message),setTimeout(function(){f.reload()},300)})}})},callback:function(e,t){//返回获取的数据 用于操作
t(e)},$uibModal:u})},del:function(e){//删除
e.callback=function(t){//删除成功
layui.use(["layer"],function(){var n=layui.layer;n.msg(t.message),0==t.code&&a("table").find("tr[data-id="+e.id+"]").hide()})},t.alert({text:'您确定要删除"'+e.templateName+'"吗',btn:["确定","取消"],fn:function(){n.template.delTemplate2(e)}})},down:function(e){n.template.downTemplate2({id:e.id,callback:function(){}})},upload:function(e){d.init({obj:e,data:{title:"上传文件",name:"请选择文件",type:"file",event:function(t,a){p.base64DataUrl(t).then(function(t){t=t.split(",")[1],n.template.uploadTemplate2({baseCode:t,id:e.id,callback:function(e){layui.use(["layer"],function(){var t=layui.layer;t.msg(e.message)}),setTimeout(function(){a.dismiss("cancel")},400)}})})}},$uibModal:u})},relation:function(e){//关联
o.init({obj:e,callback:function(e,t){//返回获取的数据 用于操作
t(e)},$uibModal:u})}});var g=1;b(),y()},link:function(e,t,a){}}})});