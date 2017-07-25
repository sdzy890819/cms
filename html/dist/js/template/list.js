define(["require","app","jquery","../data/getData","./addForm","../moduls/Tool","../common/editPop","./relationPop","../upload/index","search","./searchForm","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(e,t,a,i,n,l,c,d,o,s,u){t.directive("templateList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function(e,t,s,m,r,p,f){function h(t){a.each(t.data.list,function(e,a){a.releaseTime=new Date(a.releaseTime).format("yyyy-MM-dd h:m:s"),1==a.publish&&l.changeObjectName(t.data.list,[{name:"topicUrl",newName:"href"}])});var i=[{name:"id",key:"id",width:"50"},{name:"模版名称",key:"templateName",width:"200"},{name:"模版分类",key:"templateClassifyStr"},{name:"编码",width:"80",class:"center",key:"encoded"},{name:"创建人",key:"createUserName",width:60},{name:"创建时间",key:"createTimeStr",width:80},{name:"修改人",key:"lastModifyUserName",width:60},{name:"修改时间",key:"updateTimeStr",width:80},{name:"操作",width:150,class:"center"}];e.listdata={title:e.title,table:{select:!0,th:i,td:r.setArr(t.data.list,i),edit:[{cls:"down",name:"下载",evt:e.down},{cls:"upload",name:"上传",evt:e.upload},{cls:"add",name:"关联",evt:e.relation},{cls:"edit",name:"编辑",evt:e.edit},{cls:"del",name:"删除",evt:e.del}]}},r.extendType(e.listdata.table.td,e.listdata.table.th,["width","name"]),r.extendChild(e.listdata.table.td,e.listdata.table.edit,"edit"),a.each(e.listdata.table.td,function(e,t){t.publish&&(null!=t.publishUrl?t.list[0].href=t.publishUrl:t.list[0].href="/webapi/template/redirect/"+t.id);var i=[];a.each(t.list.edit,function(e,a){"关联"==a.name&&1==t.job||"下载"==a.name&&0==t.upload||i.push(a)}),t.list.edit=i}),e.$apply()}function b(){i.template.listTemplate({page:y,pageSize:20,callback:function(t){e.page=t.data.page,e.page.jump=function(e){y!=e.curr&&(y=e.curr,b())},h(t)}})}e.title="模版列表",e.$parent.menu.push({name:e.title}),angular.extend(e,{add:function(e){t.alert({text:"你的ID为："+e,btn:["确定","取消"],fn:function(e){layer.close(e)}})},edit:function(e){c.init({obj:e,list:n,updateData:function(t){i.template.templateInfo({id:e.id,callback:function(e){0==e.data.job?e.data.job="触发生成":e.data.job="定时生成",t(e),b()}})},save:function(e,t){var n,l;a.each(e.selects,function(){"templateClassify"==this.title&&(n=this.type),"channelId"==this.title&&(l=this.id)}),i.template.updateTemplate({id:t.id,templateName:e.templateName,templateDesc:e.templateDesc,filename:e.filename,path:e.path,templateClassify:n,job:"触发生成"==e.job?0:1,encoded:e.encoded,channelId:l,sortNum:e.sortNum,callback:function(e){layui.use(["layer"],function(){layui.layer.msg(e.message),b()})}})},callback:function(e,t){t(e)},$uibModal:s})},del:function(e){e.callback=function(t){layui.use(["layer"],function(){layui.layer.msg(t.message),0==t.code&&a("table").find("tr[data-id="+e.id+"]").hide()})},t.alert({text:'您确定要删除"'+e.templateName+'"吗',btn:["确定","取消"],fn:function(){i.template.delTemplate(e)}})},down:function(e){i.template.downTemplate({id:e.id,callback:function(){b()}})},upload:function(e){o.init({obj:e,data:{title:"上传文件",name:"请选择文件",type:"file",event:function(t,a){p.base64DataUrl(t).then(function(t){t=t.split(",")[1],i.template.uploadTemplate({baseCode:t,id:e.id,callback:function(e){layui.use(["layer"],function(){layui.layer.msg(e.message)}),setTimeout(function(){a.dismiss("cancel"),b()},400)}})})}},$uibModal:s})},relation:function(e){d.init({obj:e,callback:function(e,t){t(e)},$uibModal:s})}});var y=1;b(),function(){var t=1;u(function(n){e.searchform={list:n,return:function(){e.searchform.search=null,y=1,t=1,e.$$childHead.current=1,b()},submit:function(n,l){function c(){i.search.searchTemplate({condition:n.condition,channelId:d,page:t,pageSize:20,callback:function(a){e.page=a.data.page,e.page.jump=function(e){t!=e.curr&&(t=e.curr,c())},e.searchform.search={count:a.data.page.count,name:n.condition},void 0==a.data.list&&(a.data.list=[]),h(a)}})}var d;a.each(n.selects,function(){"channelId"==this.title&&(d=this.id)}),c()}},e.$apply()})}()},link:function(e,t){}}})});