define(["require","app","jquery","search","./searchForm","../data/getData","./addForm","../common/editPop","../moduls/Tool","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(require,app,$,search,searchForm,getData,list,editPop,Tool){app.directive("topicList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function($scope,pop,$uibModal,$css,GenerateArrList,$state){function setList(_data){$.each(_data.data.list,function(i,obj){obj.releaseTime=new Date(obj.releaseTime).format("yyyy-MM-dd h:m:s"),1==obj.publish&&Tool.changeObjectName(_data.data.list,[{name:"topicUrl",newName:"href"}])});var th=[{name:"专题标题",key:"topicTitle",changeObjectName:[{name:"topicUrl",newName:"href"}],width:"400"},{name:"专题相对路径",key:"topicPath"},{name:"专题文件名",key:"topicFilename"},{name:"发布时间",key:"releaseTime"},{name:"操作",width:"180",class:"center"}];$scope.listdata={title:$scope.title,table:{select:!0,th:th,td:GenerateArrList.setArr(_data.data.list,th),edit:[{cls:"edit",name:"编辑",evt:$scope.edit},{cls:"del",name:"删除",evt:$scope.del},{cls:"edit",name:"预览",href:"/webapi/topic/preview/"}]}},GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,"edit"),$scope.$apply()}function getDataList(){getData.topic.listTopic({page:page,pageSize:20,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){page!=obj.curr&&(page=obj.curr,getDataList())},setList(_data)}})}$scope.title="专题列表",$scope.$parent.menu.push({name:$scope.title}),angular.extend($scope,{add:function(id){pop.alert({text:"你的ID为："+id,btn:["确定","取消"],fn:function(index){layer.close(index)}})},edit:function(obj){function updateData(callback,formList){getData.topic.topicInfo({id:obj.id,callback:function(_data){_data.data.releaseTime=new Date(_data.data.releaseTime).format("yyyy-MM-dd h:m:s"),formList?($.each(formList,function(i,obj){"select"==obj.type&&getData.channel.currentChannelList({categoryId:_data.categoryId,callback:function(_data){var arr=[obj.select[1][0]];obj.select[1]=arr,obj.select[1]=obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:"channelName",newName:"name"}])),$scope.$apply()}})}),callback(formList)):callback(_data)}})}editPop.init({obj:obj,list:list,updateData:updateData,save:function(obj,_detail){var channelId,topicColumnId,categoryId,topicClassifyId;$.each(obj.selects,function(){"channelId"==this.title&&(channelId=this.id),"topicColumnId"==this.title&&(topicColumnId=this.id),"categoryId"==this.title&&(categoryId=this.id),"topicClassifyId"==this.title&&(topicClassifyId=this.id)}),getData.topic.updateTopic({id:_detail.id,topicTitle:obj.topicTitle,topicContent:obj.topicContent,topicPath:obj.topicPath,topicFilename:obj.topicFilename,topicClassifyId:topicClassifyId,categoryId:categoryId,channelId:channelId,releaseTime:obj.releaseTime,keyword:obj.keyword,description:obj.description,topicColumnId:topicColumnId,callback:function(_data){layui.use(["layer"],function(){layui.layer.msg(_data.message),setTimeout(function(){$state.reload()},300)})}})},callback:function(list,callback){$.each(list,function(i,obj){"content"==obj.title&&(obj.width="800px"),"select"==obj.type&&(obj.callback=function(_object){"categoryId"==_object.title&&getData.channel.currentChannelList({categoryId:_object.obj.id,callback:function(_data){var arr=[obj.select[1][0]];obj.select[1]=arr,obj.select[1]=obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:"channelName",newName:"name"}])),$scope.$apply(),_object.callback()}})})}),updateData(function(data){callback(data)},list)},$uibModal:$uibModal})},del:function(obj){obj.callback=function(_data){layui.use(["layer"],function(){layui.layer.msg(_data.message),0==_data.code&&$("table").find("tr[data-id="+obj.id+"]").hide()})},pop.alert({text:'您确定要删除"'+obj.topicTitle+'"吗',btn:["确定","取消"],fn:function(){getData.topic.delTopic(obj)}})},preview:function(obj){getData.topic.preview(obj)}});var page=1;getDataList(),function(){var searchPage=1;searchForm(function(data){$.each(data,function(i,obj){obj.callback=function(_object){"categoryId"==_object.title&&getData.channel.currentChannelList({categoryId:_object.obj.id,callback:function(_data){var arr=[obj.select[1][0]];obj.select[1]=arr,obj.select[1]=obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:"channelName",newName:"name"}])),$scope.$apply(),_object.callback()}})}}),$scope.searchform={list:data,return:function(){getDataList(),$scope.searchform.search=null,page=1,searchPage=1,$scope.$$childHead.current=1},submit:function(obj,data){function getSearchList(){getData.search.searchTopic({condition:obj.condition,topicClassifyId:topicClassifyId,categoryId:categoryId,channelId:channelId,topicColumnId:topicColumnId,releaseTime:obj.releaseTime,startTime:obj.startTime,endTime:obj.endTime,page:searchPage,pageSize:20,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){searchPage!=obj.curr&&(searchPage=obj.curr,getSearchList())},$scope.searchform.search={count:_data.data.page.count,name:obj.condition},setList(_data)}})}var channelId,topicColumnId,categoryId,topicClassifyId;$.each(obj.selects,function(){"channelId"==this.title&&(channelId=this.id),"topicColumnId"==this.title&&(topicColumnId=this.id),"categoryId"==this.title&&(categoryId=this.id),"topicClassifyId"==this.title&&(topicClassifyId=this.id)}),getSearchList()}},$scope.$apply()})}()},link:function($scope,element){}}})});