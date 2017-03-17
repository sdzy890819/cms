define(["require","app","jquery","../data/getData","./addForm","search","./searchForm","formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(require,app,$,getData,list,search,searchForm){app.directive("videoList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function($scope,pop,$uibModal,$css,GenerateArrList){function setList(_data){var th=[{name:"ID",key:"id",width:"50"},{name:"视频标题",key:"videoTitle",width:"200"},{name:"视频链接URL",key:"videoUrl"},{name:"操作",width:"120",class:"center"}];$scope.listdata={title:$scope.title,table:{select:!0,th:th,td:GenerateArrList.setArr(_data.data.list,th),edit:[{cls:"edit",name:"编辑",evt:$scope.edit},{cls:"del",name:"删除",evt:$scope.del}]}},GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,"edit"),$scope.$apply()}function getDataList(){getData.video.videolist({page:page,pageSize:20,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){page!=obj.curr&&(page=obj.curr,getDataList())},setList(_data)}})}function search(){var searchPage=1;searchForm(function(data){$scope.searchform={list:data,return:function(){getDataList(),$scope.searchform.search=null,page=1,searchPage=1,$scope.$$childHead.current=1},submit:function(obj,data){function getSearchList(){getData.search.searchVideo({condition:obj.condition,page:searchPage,pageSize:20,callback:function(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){searchPage!=obj.curr&&(searchPage=obj.curr,getSearchList())},$scope.searchform.search={count:_data.data.page.count,name:obj.condition},setList(_data)}})}getSearchList()}},$scope.$$phase||$scope.$apply()})}$scope.title="视频管理",$scope.$parent.menu.push({name:$scope.title}),angular.extend($scope,{add:function(id){pop.alert({text:"你的ID为："+id,btn:["确定","取消"],fn:function(index){layer.close(index)}})},edit:function(obj){require(["./editVideoPop"],function(pop){function getAddForm(callback){var _data={data:obj};callback(_data)}pop.init({obj:obj,list:list,$uibModal:$uibModal,updateData:getAddForm,callback:function(list,callback){callback(list)}})})},del:function(obj){layui.use(["layer"],function(){var layer=layui.layer;layer.alert("你确定删除："+obj.imageTitle,{skin:"layui-layer-molv",title:"删除",anim:1,btn:["普通删除","物理删除","取消"],shadeClose:!0,yes:function(index){getData.video.delVideo(obj),layer.close(index)},btn2:function(index){getData.video.delVideo({id:obj.id,force:1,callback:obj.callback}),layer.close(index)}})}),obj.callback=function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),0==_data.code&&$("table").find("tr[data-id="+obj.id+"]").hide()})}},filter:["id","uploadUserId"]});var page=1;getDataList(),search()},link:function($scope,element){}}})});