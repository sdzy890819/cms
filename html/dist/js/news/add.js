define(["app","./addForm","../data/getData","../moduls/Tool","form","position","fixedNav"],function(app,getList,getData,Tool){app.directive("newsAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function($scope,$state){function addNews(obj){$.each(obj.selects,function(){"channelId"==this.title&&(channelId=this.id),"columnId"==this.title&&(columnId=this.id),"categoryId"==this.title&&(categoryId=this.id)});var now=(new Date).valueOf();if(new Date(obj.writeTime).valueOf()<now)return void alert("发布时间必须大于当前时间");getData.news.createNews({title:obj.title,subTitle:obj.subTitle,keyword:obj.keyword,description:obj.description,source:obj.source,author:obj.author,channelId:channelId,columnId:columnId,categoryId:categoryId,content:obj.html,autoPublish:"yes"==obj.show?1:0,editPublishTime:obj.editPublishTime,timer:obj.writeTime,field1:obj.field1,field2:obj.field2,field3:obj.field3,field4:obj.field4,field5:obj.field5,publish:obj.publish,callback:function(_data){layui.use(["layer"],function(){layui.layer.msg(_data.message),0==_data.code&&$state.reload()})}})}$scope.$parent.menu.push({name:"新增新闻"});var categoryId,channelId,columnId;angular.extend($scope,{rlease:function(obj){if(obj.html.length<10)return void layui.use("layer",function(){layui.layer.msg("内容不能小于10位数!",{icon:2,anim:6})});obj.publish=0,addNews(obj)},draft:function(obj){obj.publish=2,addNews(obj)}}),getList(function(list){$.each(list,function(i,obj){"content"==obj.title&&(obj.width="800px"),"select"==obj.type&&(getData.news.previousColumn({callback:function(data){categoryId=data.data.categoryId,channelId=data.data.channelId,columnId=data.data.columnId,getData.channel.currentChannelList({categoryId:categoryId,callback:function(_data){var arr=[obj.select[1][0]];obj.select[1]=arr,obj.select[1]=obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:"channelName",newName:"name"}])),$scope.$apply()}}),getData.news.newscolumnlist({channelId:channelId,callback:function(_data){var arr=[obj.select[2][0]];obj.select[2]=arr,obj.select[2]=obj.select[2].concat(Tool.changeObjectName(_data.data,[{name:"columnName",newName:"name"}])),$scope.$apply()}}),$scope.data={categoryId:categoryId,channelId:channelId,columnId:columnId,source:data.data.source||""},$scope.$apply()}}),obj.callback=function(_object){"categoryId"==_object.title?getData.channel.currentChannelList({categoryId:_object.obj.id,callback:function(_data){var arr=[obj.select[1][0]];obj.select[1]=arr,obj.select[1]=obj.select[1].concat(Tool.changeObjectName(_data.data,[{name:"channelName",newName:"name"}])),obj.select[2]=[obj.select[2][0]],$scope.$apply(),_object.callback()}}):"channelId"==_object.title&&getData.news.newscolumnlist({channelId:_object.obj.id,callback:function(_data){var arr=[obj.select[2][0]];obj.select[2]=arr,obj.select[2]=obj.select[2].concat(Tool.changeObjectName(_data.data,[{name:"columnName",newName:"name"}])),$scope.$apply(),_object.callback()}})})}),$scope.formdata={title:"新增新闻",list:list,submit:[{name:"提交",evt:"rlease",icon_cls:"ok"},{name:"保存草稿",evt:"draft",icon_cls:"view"},{name:"取消",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]},$scope.$apply()})}}})});