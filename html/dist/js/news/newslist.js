define(["require","app","jquery","search","./searchForm","./addForm","../common/editPop","../data/getData","../moduls/Tool","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(require,app,$,search,searchForm,list,editPop,getData,Tool){app.directive("newsList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function($scope,pop,$uibModal,$css,GenerateArrList,$state){function setList(_data){var th=[{name:"文章ID",key:"id",width:"50"},{name:"所属栏目",key:"channelAndColumnName",width:"70"},{name:"标题",key:"title"},{name:"作者",key:"author",width:"40",class:"center"},{name:"发布人",key:"buildUserName",width:"55",class:"center"},{name:"修改人",key:"lastModifyUserName",width:"55",class:"center"},{name:"媒体来源",key:"source",width:"80",class:"center"},{name:"发布时间",key:"buildTimeStr",width:"80",class:"center"},{name:"修改时间",key:"updateTimeStr",width:"80",class:"center"},{name:"状态",key:"publishStr",width:"50",class:"center"},{name:"操作",width:"40",class:"center"},{name:"预览",width:"50",class:"center"},{name:"权限",width:"40",class:"center"}];$.each(_data.data.list,function(i,obj){obj.channelAndColumnName=[obj.channelName,obj.columnName].join("-"),Tool.getByteLen(obj.author)>6&&(obj.author=Tool.getByteVal(obj.author,6))}),$scope.listdata={title:$scope.title+"（共"+_data.data.page.count+"条数据）",table:{select:!0,th:th,td:GenerateArrList.setArr(_data.data.list,th),edit:[{cls:"",name:"编辑",evt:$scope.edit},{cls:"",name:" 推荐",evt:$scope.recommend}],edit1:[{cls:"zoom_in",name:"预览",href:"/webapi/news/preview/"}],permission:[{cls:"del",name:" 撤销",evt:$scope.rescind},{cls:"del",name:"删除",evt:$scope.del}]}},$.each($scope.listdata.table.td,function(i,obj){obj.publish&&(obj.list[2].href=obj.url)}),GenerateArrList.extendType($scope.listdata.table.td,th,["width","name","key"]),GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,"edit"),GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit1,"edit1"),GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.permission,"permission"),$scope.$apply()}function search(){searchForm(function(data){$.each(data,function(i,obj){"select"==obj.type&&(obj.callback=function(_object){"categoryId"==_object.title?getData.channel.currentChannelList({categoryId:_object.obj.id,callback:function(_data){var arr=[obj.select[1][0]];obj.select[1]=arr,obj.select[1]=obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:"channelName",newName:"name"}])),$scope.$apply(),_object.callback()}}):"channelId"==_object.title&&getData.news.newscolumnlist({channelId:_object.obj.id,callback:function(_data){var arr=[obj.select[2][0]];obj.select[2]=arr,obj.select[2]=obj.select[2].concat(Tool.changeObjectName(_data.data,[{name:"columnName",newName:"name"}])),$scope.$apply(),_object.callback()}})})}),$scope.searchform={list:data,return:function(){$scope.searchform.search=null,page=1,searchPage=1,$scope.$$childHead.current=1,getDataList()},submit:function(obj,data){function getSearchList(){getData.search.searchNew({newsId:obj.newsId,buildUserName:obj.buildUserName,lastModifyUserName:obj.lastModifyUserName,condition:obj.condition,author:obj.author,source:obj.source,categoryId:categoryId,channelId:channelId,columnId:columnId,platform:obj.platform,startTime:obj.startTime,endTime:obj.endTime,publish:publish,delTag:1,page:page,pageSize:20,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){page!=obj.curr&&(page=obj.curr,getSearchList())},$scope.searchform.search={count:_data.data.page.count,name:obj.condition},setList(_data)}})}$scope.isSearch=!0;var channelId,columnId,categoryId,publish,page=1;$.each(obj.selects,function(){"channelId"==this.title&&(channelId=this.id),"columnId"==this.title&&(columnId=this.id),"categoryId"==this.title&&(categoryId=this.id),"publish"==this.title&&(publish=this.id)}),getSearchList(),$scope.getSearchList=getSearchList}},setTimeout(function(){var input=$('.layui-form input[name="condition"');$("<br>").insertBefore(input.parent().parent())},300)})}function getDataList(){$scope.isSearch=!1,getData.news.newslist({page:page,pageSize:20,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){page!=obj.curr&&(page=obj.curr,getDataList())},setList(_data)}})}$scope.title="新闻列表",$scope.$parent.menu.push({name:$scope.title}),angular.extend($scope,{isSearch:!1,getNewList:function(){$scope.isSearch?$scope.getSearchList():getDataList()},edit:function(obj){function getAddForm(callback,formList){getData.news.newsdetail({id:obj.id,callback:function(_data){function setSelect(obj){if("selectSize"==obj.type&&_data.data.columnIds&&_data.data.columnIds.length){obj.toSelect=Tool.changeObjectName(_data.data.columnIds,[{name:"val",newName:"id"},{name:"title",newName:"name"}]);var arrs=obj.toSelect.slice(0),b=!0,oldarr=[];arrs.length&&($.each(obj.fromSelect,function(i,_obj){b=!0;for(var j=0;j<arrs.length;j++)if(arrs[j].id==_obj.id){b=!1;break}1==b&&oldarr.push(_obj)}),obj.fromSelect=oldarr)}}if(_data.data.timer?_data.data.writeTime=new Date(_data.data.timer).format("yyyy-MM-dd h:m:s"):_data.data.writeTime="",_data.data.editPublishTime&&(_data.data.editPublishTime=new Date(_data.data.editPublishTime).format("yyyy-MM-dd h:m:s")),_data.data.timer&&(_data.data.timer=new Date(_data.data.timer).format("yyyy-MM-dd h:m:s")),formList){var maxNum,title,name,inputMaxNum,type,firstArr,lastArr,index=2;for($.each(formList,function(i,obj){"field1"==obj.title?(title=obj.title.replace(obj.title.match(/\d+$/)[0],""),name=obj.name.match(/\d+$/),name=name?obj.name.replace(name[0],""):obj.name,inputMaxNum=obj.inputMaxNum,type=obj.type,firstArr=formList.slice(0,i+1),lastArr=formList.slice(i+1),maxNum=obj.inputMaxNum+1):"select"==obj.type&&(getData.channel.currentChannelList({categoryId:_data.data.categoryId,callback:function(_data){var arr=[obj.select[1][0]];obj.select[1]=arr,obj.select[1]=obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:"channelName",newName:"name"}])),$scope.$apply()}}),getData.news.newscolumnlist({channelId:_data.data.channelId,callback:function(_data){var arr=[obj.select[2][0]];obj.select[2]=arr,obj.select[2]=obj.select[2].concat(Tool.changeObjectName(_data.data,[{name:"columnName",newName:"name"}])),$scope.$apply()}})),"array"==$.type(obj)?$.each(obj,function(j,_obj){setSelect(_obj)}):setSelect(obj)});index<maxNum;index++){var value=_data.data["field"+index];value&&firstArr.push({title:title+index,name:name+index,placeholder:"请输入扩展字段内容",num:index,inputMaxNum:inputMaxNum,type:type})}callback(firstArr.concat(lastArr))}else callback(_data)}})}obj.size="news",editPop.init({obj:obj,list:list,updateData:getAddForm,save:function(obj,_detail){var channelId=_detail.channelId,columnId=_detail.columnId,categoryId=_detail.categoryId;$.each(obj.selects,function(){"channelId"==this.title&&(channelId=this.id),"columnId"==this.title&&(columnId=this.id),"categoryId"==this.title&&(categoryId=this.id)});var now=(new Date).valueOf();return new Date(obj.timer).valueOf()<now?void alert("发布时间必须大于当前时间"):void getData.news.updateNews({id:_detail.id,title:obj.title,subTitle:obj.subTitle,keyword:obj.keyword,description:obj.description,source:obj.source,author:obj.author,channelId:channelId,columnId:columnId,categoryId:categoryId,content:obj.html,autoPublish:"yes"==obj.show?1:0,timer:obj.timer,editPublishTime:obj.editPublishTime,field1:obj.field1,field2:obj.field2,field3:obj.field3,field4:obj.field4,field5:obj.field5,callback:function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),$scope.getNewList()})}})},callback:function(list,callback){$.each(list,function(i,obj){"content"==obj.title&&(obj.width="1000px"),"select"==obj.type&&(obj.callback=function(_object){_object.obj.name.indexOf("请选择")>-1||("categoryId"==_object.title?getData.channel.currentChannelList({categoryId:_object.obj.id,callback:function(_data){var arr=[obj.select[1][0]];obj.select[1]=arr,obj.select[1]=obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:"channelName",newName:"name"}])),obj.select[2]=[obj.select[2][0]],$scope.$apply(),_object.callback()}}):"channelId"==_object.title&&getData.news.newscolumnlist({channelId:_object.obj.id,callback:function(_data){var arr=[obj.select[2][0]];obj.select[2]=arr,obj.select[2]=obj.select[2].concat(Tool.changeObjectName(_data.data,[{name:"columnName",newName:"name"}])),$scope.$apply(),_object.callback()}}))})}),getAddForm(function(data){callback(data)},list)},$uibModal:$uibModal})},rescind:function(obj){obj.callback=function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),0==_data.code&&($("table").find("tr[data-id="+obj.id+"]").hide(),$scope.getNewList())})},pop.alert({text:'您确定要撤销"'+obj.title+'"吗',btn:["确定","取消"],fn:function(){getData.news.rescind(obj)}})},recover:function(obj){obj.callback=function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),0==_data.code&&$("table").find("tr[data-id="+obj.id+"]").hide()})},pop.alert({text:'您确定要恢复"'+obj.title+'"吗',btn:["确定","取消"],fn:function(){getData.news.recover(obj)}})},preview:function(obj){getData.news.preview(obj)},recommend:function(obj){var newsId=obj.id;require(["./recommendForm"],function(recommendFormList){function getAddForm(callback){getData.news.recommendNewsInfo({id:obj.id,callback:function(_data){callback(_data)}})}editPop.init({obj:obj,$uibModal:$uibModal,list:recommendFormList,updateData:getAddForm,save:function(obj,_detail){var recommendColumnId=_detail.recommendColumnId;return $.each(obj.selects,function(){"recommendColumnId"==this.title&&(recommendColumnId=this.id)}),void 0==recommendColumnId?void alert("请选择推荐栏目"):void getData.news.recommend({id:newsId,recommendTitle:obj.recommendTitle,recommendDescription:obj.recommendDescription,recommendImages:obj.recommendImages,recommendColumnId:recommendColumnId,sort:obj.sort,callback:function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message)})}})},callback:function(list,callback){callback(list)}})})},info:function(obj){pop.alert({text:"去相关页面，因为还没有页面所以这样提示：<br>ID为："+obj.id,btn:["确定","取消"]})},del:function(obj){obj.callback=function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),0==_data.code&&$("table").find("tr[data-id="+obj.id+"]").hide()})},pop.alert({text:'您确定要删除"'+obj.title+'"吗',btn:["确定","取消"],fn:function(){getData.news.delNews(obj)}})},publish:function(obj){obj.callback=function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message)})},pop.alert({text:'您确定要发布"'+obj.title+'"吗',btn:["确定","取消"],fn:function(){getData.news.publish(obj)}})}}),search();var page=1;getDataList()},link:function($scope,element){}}})});