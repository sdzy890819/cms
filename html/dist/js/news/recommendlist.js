define(["require","app","jquery","search","./recommendlistForm","../common/editPop","../data/getData","../moduls/Tool","../upload/index","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(require,app,$,search,searchForm,editPop,getData,Tool,upload){app.directive("newsRecommendList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function($scope,pop,$uibModal,$css,GenerateArrList,$state,Upload){function setList(_data){var th=[{name:"推荐名",key:"title"},{name:"排序",key:"paixue"},{name:"推荐人",key:"recommendUserName"},{name:"推荐栏目",key:"recommendColumnName"},{name:"操作",width:"220",class:"center"}],list=_data.data.list;$.each(list,function(i,obj){obj.paixue=(i+1)*page});var td=GenerateArrList.setArr(list,th);$scope.listdata={title:$scope.title+"（共"+_data.data.page.count+"条数据）",table:{select:!0,th:th,td:td,edit:[{cls:"edit",name:"修改推荐",evt:$scope.edit},{cls:"del",name:"取消推荐",evt:$scope.del}]}},$.each($scope.listdata.table.td,function(i,obj){obj.url&&(obj.list[0].href=obj.url)}),GenerateArrList.extendType($scope.listdata.table.td,th,["width","name","key"]),GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,"edit"),$scope.$apply()}function getDataList(){$scope.isSearch=!1,getData.news.recommendList({page:page,pageSize:20,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){page!=obj.curr&&(page=obj.curr,getDataList())},setList(_data)}})}$scope.title="推荐新闻列表",$scope.$parent.menu.push({name:$scope.title}),angular.extend($scope,{isSearch:!1,getNewList:function(){$scope.isSearch?$scope.getSearchList():getDataList()},edit:function(obj){require(["./recommendListEditForm"],function(list){function getAddForm(callback,editPopScope){getData.news.recommendNewsInfo({id:obj.id,callback:function(_data){_data.data.position=obj.paixue,callback(_data),$(".layui-upload-button").unbind().click(function(){upload.init({data:{obj:{},title:"上传图片",name:"请选择图片",type:"image",event:function(file,$uibModalInstance){imageInfo=file;var suffix=imageInfo.name.match(/\w+$/)[0];Upload.base64DataUrl(imageInfo).then(function(urls){var image="<img src='"+file.$ngfDataUrl+"'width='50px' class='thumb'>";$(".imagePre").empty().append(image),urls&&getData.upload.uploadImage({baseCode:urls.split(",")[1],suffix:suffix,watermark:0,callback:function(_data){var data=_data.data;$scope.imgInfo=data,editPopScope.updateData({recommendImages:data.imageUrl})}})}),$uibModalInstance.dismiss("cancel")}},$uibModal:$uibModal})})}})}var newsId=obj.id;editPop.init({obj:obj,$uibModal:$uibModal,list:list,updateData:getAddForm,save:function(obj,_detail){var recommendColumnId=_detail.recommendColumnId;if($.each(obj.selects,function(){"recommendColumnId"==this.title&&(recommendColumnId=this.id)}),void 0==recommendColumnId)return void alert("请选择推荐栏目");var imgsrc=$scope.imgInfo?$scope.imgInfo.imageUrl:"";getData.news.recommend({id:newsId,recommendTitle:obj.recommendTitle,recommendDescription:obj.recommendDescription,recommendImages:imgsrc,recommendColumnId:recommendColumnId,position:obj.position,sort:obj.sort,callback:function(_data){layui.use(["layer"],function(){layui.layer.msg(_data.message),0==_data.code&&$scope.getNewList()})}})},callback:function(list,callback){callback(list)}})})},del:function(obj){obj.callback=function(_data){layui.use(["layer"],function(){layui.layer.msg(_data.message),0==_data.code&&$scope.getNewList()})},pop.alert({text:'您确定要取消推荐吗"'+obj.title+'"吗',btn:["确定","取消"],fn:function(){getData.news.deleteRecommend(obj)}})}}),function(){searchForm(function(data){$scope.searchform={list:data,return:function(){$scope.searchform.search=null,page=1,searchPage=1,$scope.$$childHead.current=1,getDataList()},submit:function(obj,data){function getSearchList(){getData.news.recommendList({recommendColumnId:recommendColumnId,page:page,pageSize:20,callback:function(_data){_data.data.list=_data.data.list||[],$scope.page=_data.data.page,$scope.page.jump=function(obj){page!=obj.curr&&(page=obj.curr,getSearchList())},$scope.searchform.search={count:_data.data.page.count,name:obj.condition},setList(_data)}})}$scope.isSearch=!0;var recommendColumnId,page=1;$.each(obj.selects,function(){"recommendColumnId"==this.title&&(recommendColumnId=this.id)}),getSearchList(),$scope.getSearchList=getSearchList}}},{st:"sortByColumnName"})}();var page=1;getDataList()},link:function($scope,element){}}})});