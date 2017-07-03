define(["require","app","jquery","search","./searchForm","./columnForm","../data/getData","../common/editPop","formlist","position","fixedNav","../moduls/service","../moduls/factory"],function(require,app,$,search,searchForm,list,getData,editPop){app.directive("newscolumnManage",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function($scope,pop,GenerateArrList,$uibModal,$state){function setList(_data){var th=[{name:"ID",key:"id",width:"50"},{name:"栏目名",key:"columnName"},{name:"频道ID",key:"channelId",width:"50"},{name:"频道名称",key:"channelName"},{name:"创建人",key:"createUserName",width:60},{name:"创建时间",key:"createTimeStr",width:80},{name:"修改人",key:"lastModifyUserName",width:60},{name:"修改时间",key:"updateTimeStr",width:80},{name:"操作",width:150,class:"center"}];$scope.listdata={title:$scope.title,table:{select:!0,th:th,td:GenerateArrList.setArr(_data.data.list,th),edit:[{cls:"edit",name:"恢复",evt:$scope.recovery}]}},$.each($scope.listdata.table.td,function(i,obj){obj.listUrl&&(obj.list[1].href=obj.listUrl)}),GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,"edit"),$scope.$apply()}function search(){searchForm(function(data){$scope.searchform={list:data,return:function(){$scope.searchform.search=null,page=1,searchPage=1,$scope.$$childHead.current=1,getDataList()},submit:function(obj,data){function getSearchList(){getData.news.newscolumn_manage({channelId:channelId,page:page,pageSize:20,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){page!=obj.curr&&(page=obj.curr,getSearchList())},$scope.searchform.search={count:_data.data.page.count,name:obj.condition},setList(_data)}})}$scope.isSearch=!0;var channelId,page=1;$.each(obj.selects,function(){"channelId"==this.title&&(channelId=this.id)}),getSearchList(),$scope.getSearchList=getSearchList}},setTimeout(function(){var input=$('.layui-form input[name="condition"');$("<br>").insertBefore(input.parent().parent())},300)})}function getDataList(){$scope.isSearch=!1,getData.news.newscolumn_manage({page:page,pageSize:20,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){page!=obj.curr&&(page=obj.curr,getDataList())},setList(_data)}})}$scope.title="新闻栏目删除列表",$scope.$parent.menu.push({name:$scope.title}),angular.extend($scope,{recovery:function(obj){obj.callback=function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),0==_data.code&&$("table").find("tr[data-id="+obj.id+"]").hide()})},pop.alert({text:'您确定要恢复"'+obj.columnName+'"吗',btn:["确定","取消"],fn:function(){getData.news.newscolumn_recover(obj)}})}}),search();var page=1;getDataList()},link:function($scope,element){}}})});