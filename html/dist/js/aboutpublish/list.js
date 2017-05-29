define(["require","app","jquery","search","./searchForm","./addForm","../common/editPop","../data/getData","../moduls/Tool","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(require,app,$,search,searchForm,list,editPop,getData,Tool){app.directive("publishinfoList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function($scope,pop,$uibModal,$css,GenerateArrList,$state,$timeout){function setList(_data){var th=[{name:"id",key:"id",width:"70"},{name:"触发类型",key:"triggerTypeStr",width:"70"},{name:"触发ID",key:"triggerId",width:"80",class:"center"},{name:"触发的模版",key:"templateTypeStr"},{name:"模版ID",key:"templateId",width:"80",class:"center"},{name:"创建时间",key:"createTimeStr",width:"80",class:"center"},{name:"操作信息",key:"message",width:"160",class:"center"},{name:"操作",width:"40",class:"center"}];$scope.listdata={title:$scope.title+"（共"+_data.data.page.count+"条数据）",table:{select:!0,th:th,td:GenerateArrList.setArr(_data.data.list,th),edit:[{cls:"",name:"查看",evt:$scope.look}]}},$.each($scope.listdata.table.td,function(i,obj){obj.publish&&(obj.list[2].href=obj.url)}),GenerateArrList.extendType($scope.listdata.table.td,th,["width","name","key"]),GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,"edit"),$scope.$apply()}function search(){searchForm(function(data){$.each(data,function(i,obj){"select"==obj.type&&(obj.callback=function(_object){})}),$scope.getSearchList=function(page,status,obj,triggerType){getData.publishInfo.list({page:page,pageSize:20,status:status,triggerId:obj.lastModifyUserName,triggerType:triggerType,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){page!=obj.curr&&(page=obj.curr,$scope.getSearchList(page,status,obj,triggerType))},$scope.searchform.search={count:_data.data.page.count,name:obj.condition},setList(_data)}})},$scope.searchform={list:data,return:function(){$scope.searchform.search=null,page=1,searchPage=1,$scope.$$childHead.current=1,getDataList()},submit:function(obj,data){$scope.isSearch=!0;var status,triggerType,page=1;$.each(obj.selects,function(){"statusStr"==this.title&&(status=this.type),"triggerTypeStr"==this.title&&(triggerType=this.type)}),$scope.getSearchList(page,status,obj,triggerType)}}})}function getDataList(){$scope.isSearch=!1,getData.publishInfo.list({page:page,pageSize:20,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){page!=obj.curr&&(page=obj.curr,getDataList())},setList(_data)}})}$scope.title="日志列表",$scope.$parent.menu.push({name:$scope.title}),angular.extend($scope,{isSearch:!1,getNewList:function(){$scope.isSearch?$scope.getSearchList():getDataList()},info:function(obj){pop.alert({text:"去相关页面，因为还没有页面所以这样提示：<br>ID为："+obj.id,btn:["确定","取消"]})},look:function(obj){require(["./showDetial"],function(editPopList){function getList(callback){getData.publishInfo.detail({id:obj.id,callback:function(_data){callback(_data)}})}obj.size="sm",editPopList.init({obj:null,list:getList,$uibModal:$uibModal})})}}),search();var page=1;getDataList()},link:function($scope,element){}}})});