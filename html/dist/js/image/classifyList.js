define(["require","app","jquery","search","../data/getData","./classfyForm",,"formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(require,app,$,search,getData,list){app.directive("imageClassifyList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function($scope,pop,$uibModal,$css,GenerateArrList){function setList(_data){$scope.page=_data.data.page,$scope.page.jump=function(obj){page!=obj.curr&&(page=obj.curr,getDataList())};var th=[{name:"分类ID",key:"id",width:50},{name:"图片分类名称",key:"classifyName",width:180},{name:"创建人名",key:"createUserName",width:60},{name:"创建时间",key:"createTimeStr",width:"50"},{name:"修改人",key:"lastModifyUserName",width:60},{name:"修改时间",key:"updateTimeStr",width:60},{name:"操作",width:"100",class:"center"}];$scope.listdata={title:$scope.title,table:{select:!0,th:th,td:GenerateArrList.setArr(_data.data.list,th),edit:[{cls:"edit",name:"修改",evt:$scope.edit},{cls:"del",name:"删除",evt:$scope.del}]}},GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,"edit"),$scope.$$phase||$scope.$apply()}function getDataList(){getData.image.imagesclassifylist({page:page,pageSize:20,callback:setList})}$scope.title="图片分类列表",$scope.$parent.menu.push({name:$scope.title}),angular.extend($scope,{add:function(id){pop.alert({text:"你的ID为："+id,btn:["确定","取消"],fn:function(index){layer.close(index)}})},edit:function(obj){require(["../common/editPop"],function(pop){function getAddForm(callback){getData.image.imagesclassify({id:obj.id,callback:function(_data){callback(_data)}})}pop.init({obj:obj,list:list,$uibModal:$uibModal,updateData:getAddForm,callback:function(list,callback){callback(list)},save:function(obj,_data){getData.image.updateImagesClassify({classifyName:obj.classifyName,id:_data.id,callback:function(_data){layui.use(["layer"],function(){layui.layer.msg(_data.message),getDataList()})}})}})})},del:function(obj){layui.use(["layer"],function(){var layer=layui.layer;layer.alert("你确定删除："+obj.classifyName,{skin:"layui-layer-molv newBtn",title:"删除",anim:1,btn:["确定","取消"],shadeClose:!0,yes:function(index){getData.image.delImagesClassify(obj),layer.close(index)}})}),obj.callback=function(_data){layui.use(["layer"],function(){layui.layer.msg(_data.message),0==_data.code&&$("table").find("tr[data-id="+obj.id+"]").hide()})}},filter:["id","uploadUserId"]});var page=1;getDataList()},link:function($scope,element){}}})});