define(["app","./columnForm","../data/getData","form","position","fixedNav"],function(app,getList,getData){app.directive("newscolumnAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function($scope,$state){$scope.$parent.menu.push({name:"新闻栏目编辑"}),$scope.save=function(obj){var channelId,listTemplate2Id,detailTemplate2Id;$.each(obj.selects,function(){"channelId"==this.title&&(channelId=this.id),"listTemplate2Id"==this.title&&(listTemplate2Id=this.id),"detailTemplate2Id"==this.title&&(detailTemplate2Id=this.id)}),getData.news.createNewsColumn({channelId:channelId,columnName:obj.columnName,listId:obj.listId,detailId:obj.detailId,listTemplate2Id:listTemplate2Id,detailTemplate2Id:detailTemplate2Id,keywords:obj.keywords,description:obj.description,callback:function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),0==_data.code&&$state.go("newscolumn.list")})}})},getList(function(list){$scope.formdata={title:"新增栏目",list:list,submit:[{name:"确认新增",evt:"save",icon_cls:"save"}]},$scope.$apply()})}}})});