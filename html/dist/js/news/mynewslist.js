define(["require","app","jquery","./addForm","../common/editPop","../data/getData","../moduls/Tool","search","./mysearchForm","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(require,app,$,list,editPop,getData,Tool,search,searchForm){app.directive("mynewsList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function($scope,pop,$uibModal,$css,GenerateArrList){function setList(_data){var th=[{name:"文章ID",key:"id",width:"50"},{name:"所属频道栏目",key:"channelAndColumnName",width:"70"},{name:"标题",key:"title"},{name:"作者",key:"author",width:"40",class:"center"},{name:"发布人",key:"buildUserName",width:"40",class:"center"},{name:"修改人",key:"lastModifyUserName",width:"40",class:"center"},{name:"媒体来源",key:"source",width:"40",class:"center"},{name:"发布时间",key:"buildTimeStr",width:"80",class:"center"},{name:"修改时间",key:"updateTimeStr",width:"80",class:"center"},{name:"状态",key:"publishStr",width:"40",class:"center"},{name:"操作",width:"50",class:"center"},{name:"权限",width:"50",class:"center"}];$.each(_data.data.list,function(i,obj){obj.channelAndColumnName=[obj.channelName,obj.columnName].join("-")}),$scope.listdata={title:$scope.title,table:{select:!0,th:th,td:GenerateArrList.setArr(_data.data.list,th),edit:[{cls:"",name:"编辑",evt:$scope.edit},{cls:"",name:" 推荐",evt:$scope.recommend}],permission:[{cls:"del",name:"删除",evt:$scope.del}]}},$.each($scope.listdata.table.td,function(i,obj){obj.publish&&(obj.list[2].href=obj.url)}),GenerateArrList.extendType($scope.listdata.table.td,th,["width","name","key"]),GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,"edit"),GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.permission,"permission"),$scope.$apply()}function search(){searchForm(function(data){$.each(data,function(i,obj){"select"==obj.type&&(obj.callback=function(_object){"categoryId"==_object.title?getData.channel.currentChannelList({categoryId:_object.obj.id,callback:function(_data){var arr=[obj.select[1][0]];obj.select[1]=arr,obj.select[1]=obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:"channelName",newName:"name"}])),$scope.$apply(),_object.callback()}}):"channelId"==_object.title&&getData.news.newscolumnlist({channelId:_object.obj.id,callback:function(_data){var arr=[obj.select[2][0]];obj.select[2]=arr,obj.select[2]=obj.select[2].concat(Tool.changeObjectName(_data.data,[{name:"columnName",newName:"name"}])),$scope.$apply(),_object.callback()}})})}),$scope.searchform={list:data,submit:function(obj,data){function getSearchList(){getData.news.mynewslist({publish:publish,page:page,pageSize:20,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){page!=obj.curr&&(page=obj.curr,getSearchList())},$scope.searchform.search={count:_data.data.page.count,name:obj.condition},void 0==_data.data.list&&(_data.data.list=[]),setList(_data)}})}var publish;"已发布"==obj.publish?publish=1:"未发布"==obj.publish?publish=0:"草稿"==obj.publish?publish=2:"已撤销"==obj.publish&&(publish=3),getSearchList(),$scope.getSearchList=getSearchList}}})}function getDataList(){getData.news.mynewslist({page:page,pageSize:20,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){page!=obj.curr&&(page=obj.curr,getDataList())},setList(_data)}})}$scope.title="我的新闻列表",$scope.$parent.menu.push({name:$scope.title}),angular.extend($scope,{edit:function(obj){function getAddForm(callback,formList){getData.news.newsdetail({id:obj.id,callback:function(_data){if(_data.data.writeTime=new Date(_data.data.writeTime).format("yyyy-MM-dd h:m:s"),formList){var maxNum,title,name,inputMaxNum,type,firstArr,lastArr,index=2;for($.each(formList,function(i,obj){"field1"==obj.title?(title=obj.title.replace(obj.title.match(/\d+$/)[0],""),name=obj.name,inputMaxNum=obj.inputMaxNum,type=obj.type,firstArr=formList.slice(0,i+1),lastArr=formList.slice(i+1),maxNum=obj.inputMaxNum+1):"select"==obj.type&&(getData.channel.currentChannelList({categoryId:_data.data.categoryId,callback:function(_data){var arr=[obj.select[1][0]];obj.select[1]=arr,obj.select[1]=obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:"channelName",newName:"name"}])),$scope.$apply()}}),getData.news.newscolumnlist({channelId:_data.data.channelId,callback:function(_data){var arr=[obj.select[2][0]];obj.select[2]=arr,obj.select[2]=obj.select[2].concat(Tool.changeObjectName(_data.data,[{name:"columnName",newName:"name"}])),$scope.$apply()}}))});index<maxNum;index++){var value=_data.data["field"+index];value&&firstArr.push({title:title+index,name:name+index,placeholder:"请输入扩展字段内容",num:index,inputMaxNum:inputMaxNum,type:type})}callback(firstArr.concat(lastArr))}else callback(_data)}})}editPop.init({obj:obj,list:list,updateData:getAddForm,save:function(obj,_detail){var channelId=_detail.channelId,columnId=_detail.columnId,categoryId=_detail.categoryId;$.each(obj.selects,function(){"channelId"==this.title&&(channelId=this.id),"columnId"==this.title&&(columnId=this.id),"categoryId"==this.title&&(categoryId=this.id)}),getData.news.updateNews({id:_detail.id,title:obj.title,subTitle:obj.subTitle,keyword:obj.keyword,description:obj.description,source:obj.source,author:obj.author,channelId:channelId,columnId:columnId,categoryId:categoryId,content:obj.html,autoPublish:"yes"==obj.show?1:0,timer:obj.writeTime,field1:obj.field1,field2:obj.field2,field3:obj.field3,field4:obj.field4,field5:obj.field5,callback:function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message)})}})},callback:function(list,callback){$.each(list,function(i,obj){"content"==obj.title&&(obj.width="600px"),"select"==obj.type&&(obj.callback=function(_object){"categoryId"==_object.title?getData.channel.currentChannelList({categoryId:_object.obj.id,callback:function(_data){var arr=[obj.select[1][0]];obj.select[1]=arr,obj.select[1]=obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:"channelName",newName:"name"}])),$scope.$apply(),_object.callback()}}):"channelId"==_object.title&&getData.news.newscolumnlist({channelId:_object.obj.id,callback:function(_data){var arr=[obj.select[2][0]];obj.select[2]=arr,obj.select[2]=obj.select[2].concat(Tool.changeObjectName(_data.data,[{name:"columnName",newName:"name"}])),$scope.$apply(),_object.callback()}})})}),getAddForm(function(data){callback(data)},list)},$uibModal:$uibModal})},recommend:function(obj){var newsId=obj.id;require(["./recommendForm"],function(recommendFormList){function getAddForm(callback){getData.news.recommendNewsInfo({id:obj.id,callback:function(_data){callback(_data)}})}editPop.init({obj:obj,$uibModal:$uibModal,list:recommendFormList,updateData:getAddForm,save:function(obj,_detail){var recommendColumnId=_detail.recommendColumnId;return $.each(obj.selects,function(){"recommendColumnId"==this.title&&(recommendColumnId=this.id)}),void 0==recommendColumnId?void alert("请选择推荐栏目"):void getData.news.recommend({id:newsId,recommendTitle:obj.recommendTitle,recommendDescription:obj.recommendDescription,recommendImages:obj.recommendImages,recommendColumnId:recommendColumnId,sort:obj.sort,callback:function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message)})}})},callback:function(list,callback){callback(list)}})})},info:function(obj){pop.alert({text:"去相关页面，因为还没有页面所以这样提示：<br>ID为："+obj.id,btn:["确定","取消"]})},del:function(obj){obj.callback=function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),0==_data.code&&$("table").find("tr[data-id="+obj.id+"]").hide()})},pop.alert({text:'您确定要删除"'+obj.title+'"吗',btn:["确定","取消"],fn:function(){getData.news.delNews(obj)}})},publish:function(obj){obj.callback=function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message)})},pop.alert({text:'您确定要发布"'+obj.title+'"吗',btn:["确定","取消"],fn:function(){getData.news.publish(obj)}})}}),search();var page=1;getDataList()},link:function($scope,element){}}})});