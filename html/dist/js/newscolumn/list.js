define(["app","jquery","./columnForm","../data/getData","../common/editPop","formlist","position","fixedNav","../moduls/service","../moduls/factory"],function(app,$,list,getData,editPop){app.directive("newscolumnList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function($scope,pop,GenerateArrList,$uibModal,$state){function getDataList(){getData.news.newscolumn_list({page:page,pageSize:20,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){page!=obj.curr&&(page=obj.curr,getDataList())};var th=[{name:"ID",key:"id",width:"50"},{name:"栏目名",key:"columnName",width:"500"},{name:"频道ID",key:"channelId"},{name:"操作",width:"200",class:"center"}];$scope.listdata={title:$scope.title,table:{select:!0,th:th,td:GenerateArrList.setArr(_data.data.list,th),edit:[{cls:"edit",name:"编辑",evt:$scope.edit},{cls:"del",name:"删除",evt:$scope.del}]}},$.each($scope.listdata.table.td,function(i,obj){obj.listUrl&&(obj.list[1].href=obj.listUrl)}),GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,"edit"),$scope.$apply()}})}$scope.title="新闻栏目列表",$scope.$parent.menu.push({name:$scope.title}),angular.extend($scope,{edit:function(obj){function getAddForm(callback){getData.news.newscolumn({id:obj.id,callback:function(_data){callback(_data),detail=_data}})}var detail=null;editPop.init({obj:obj,list:list,updateData:getAddForm,save:function(obj,_detail){var channelId=_detail.channelId,listTemplate2Id=_detail.listTemplate2Id,detailTemplate2Id=_detail.detailTemplate2Id;$.each(obj.selects,function(){"channelId"==this.title&&(channelId=this.id),"listTemplate2Id"==this.title&&(listTemplate2Id=this.id),"detailTemplate2Id"==this.title&&(detailTemplate2Id=this.id)}),getData.news.updateNewsColumn({id:_detail.id,channelId:channelId,columnName:obj.columnName,listId:obj.listId,detailId:obj.detailId,listTemplate2Id:listTemplate2Id,detailTemplate2Id:detailTemplate2Id,keywords:obj.keywords,description:obj.description,callback:function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),setTimeout(function(){$state.reload()},300)})}})},callback:function(list,callback){callback(list)},$uibModal:$uibModal})},del:function(obj){obj.callback=function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),0==_data.code&&$("table").find("tr[data-id="+obj.id+"]").hide()})},pop.alert({text:'您确定要删除"'+obj.columnName+'"吗',btn:["确定","取消"],fn:function(){getData.news.delNewsColumn(obj)}})}});var page=1;getDataList()},link:function($scope,element){}}})});