define(["require","app","jquery","../data/getData","./addForm","../moduls/Tool","../common/editPop","../template/relationPop","../upload/index","search","./searchForm","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(require,app,$,getData,list,Tool,editPop,relationPop,upload,search,searchForm){app.directive("template2List",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function($scope,pop,$uibModal,$css,GenerateArrList,Upload,$state){function setList(_data){$.each(_data.data.list,function(i,obj){obj.releaseTime=new Date(obj.releaseTime).format("yyyy-MM-dd h:m:s"),1==obj.publish&&Tool.changeObjectName(_data.data.list,[{name:"topicUrl",newName:"href"}])});var th=[{name:"模版名称",key:"templateName"},{name:"模版分类",width:"200",key:"templateClassifyStr",width:80},{name:"编码",width:"80",class:"center",key:"encoded",width:60},{name:"创建人",key:"createUserName",width:60},{name:"创建时间",key:"createTimeStr",width:80},{name:"修改人",key:"lastModifyUserName",width:60},{name:"修改时间",key:"updateTimeStr",width:80},{name:"操作",width:100,class:"center"}];$scope.listdata={title:$scope.title,table:{select:!0,th:th,td:GenerateArrList.setArr(_data.data.list,th),edit:[{cls:"down",name:"下载",evt:$scope.down},{cls:"upload",name:"上传",evt:$scope.upload},{cls:"edit",name:"编辑",evt:$scope.edit},{cls:"del",name:"删除",evt:$scope.del}]}},GenerateArrList.extendType($scope.listdata.table.td,$scope.listdata.table.th,["width","name"]),GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,"edit"),$.each($scope.listdata.table.td,function(i,item){var arr=[];$.each(item.list.edit,function(j,obj){"关联"==obj.name&&1==item.job||"下载"==obj.name&&0==item.upload||arr.push(obj)}),item.list.edit=arr}),$scope.$apply()}function getDataList(){getData.template.listTemplate2({page:page,pageSize:20,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){page!=obj.curr&&(page=obj.curr,getDataList())},setList(_data)}})}$scope.title="第二套模版列表",$scope.$parent.menu.push({name:$scope.title}),angular.extend($scope,{add:function(id){pop.alert({text:"你的ID为："+id,btn:["确定","取消"],fn:function(index){layer.close(index)}})},edit:function(obj){function updateData(callback){getData.template.template2Info({id:obj.id,callback:function(_data){callback(_data)}})}editPop.init({obj:obj,list:list,updateData:updateData,save:function(obj,_detail){var templateClassify;$.each(obj.selects,function(){"templateClassify"==this.title&&(templateClassify=this.type)}),getData.template.updateTemplate2({id:_detail.id,templateName:obj.templateName,filename:obj.filename,path:obj.path,templateClassify:templateClassify,encoded:obj.encoded,callback:function(_data){layui.use(["layer"],function(){layui.layer.msg(_data.message),setTimeout(function(){getDataList()},300)})}})},callback:function(list,callback){callback(list)},$uibModal:$uibModal})},del:function(obj){obj.callback=function(_data){layui.use(["layer"],function(){layui.layer.msg(_data.message),0==_data.code&&$("table").find("tr[data-id="+obj.id+"]").hide()})},pop.alert({text:'您确定要删除"'+obj.templateName+'"吗',btn:["确定","取消"],fn:function(){getData.template.delTemplate2(obj)}})},down:function(obj){getData.template.downTemplate2({id:obj.id,callback:function(){}})},upload:function(obj){upload.init({obj:obj,data:{title:"上传文件",name:"请选择文件",type:"file",event:function(file,$uibModalInstance){Upload.base64DataUrl(file).then(function(urls){urls=urls.split(",")[1],getData.template.uploadTemplate2({baseCode:urls,id:obj.id,callback:function(_data){layui.use(["layer"],function(){layui.layer.msg(_data.message)}),setTimeout(function(){getDataList(),$uibModalInstance.dismiss("cancel")},400)}})})}},$uibModal:$uibModal})},relation:function(obj){relationPop.init({obj:obj,callback:function(list,callback){callback(list)},$uibModal:$uibModal})}});var page=1;getDataList(),function(){var searchPage=1;searchForm(function(data){$scope.searchform={list:data,return:function(){$scope.searchform.search=null,page=1,searchPage=1,$scope.$$childHead.current=1,getDataList()},submit:function(obj,data){function getSearchList(){getData.search.searchTemplate2({condition:obj.condition,page:searchPage,pageSize:20,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){searchPage!=obj.curr&&(searchPage=obj.curr,getSearchList())},$scope.searchform.search={count:_data.data.page.count,name:obj.condition},void 0==_data.data.list&&(_data.data.list=[]),setList(_data)}})}getSearchList()}}})}()},link:function($scope,element,attr){}}})});