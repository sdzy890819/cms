define(["require","app","jquery","../data/getData","./form",,"formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(require,app,$,data,list){app.directive("permissionList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function($scope,pop,$uibModal,$css,GenerateArrList,$state){function getDataList(){data.permission.listPermission({callback:function(_data){var th=[{name:"ID",key:"id",width:"200"},{name:"权限名",key:"name"},{name:"父类ID",key:"parentId"},{name:"权限代码",key:"permission"},{name:"应用设备",key:"platformStr"},{name:"类型",key:"typeStr"},{name:"操作",width:"200",class:"center"}],newData=[];$.each(_data.data,function(index,value){value.permission.parentId="",value.permission.typeStr="MENU",newData.push(value.permission),$.each(value.permissions,function(i,j){j.typeStr="BUTTON",newData.push(j)})}),$scope.listdata={title:$scope.title,table:{select:!0,th:th,td:GenerateArrList.setArr(newData,th),edit:[{cls:"edit",name:"编辑",evt:$scope.edit},{cls:"del",name:"删除",evt:$scope.del}]}},GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,"edit"),$.each($scope.listdata.table.td,function(i,item){var arr=[];"MENU"==item.typeStr&&(arr.push({cls:"add",name:"新增子权限",evt:$scope.addChildPermission}),item.cls="special"),arr.push({cls:"edit",name:"编辑",evt:$scope.edit},{cls:"del",name:"删除",evt:$scope.del}),item.list.edit=arr}),$scope.$apply()}})}$scope.title="权限列表",$scope.$parent.menu.push({name:$scope.title}),angular.extend($scope,{add:function(id){pop.alert({text:"你的ID为："+id,btn:["确定","取消"],fn:function(index){layer.close(index)}})},edit:function(obj,_detail){require(["../common/editPop"],function(pop){function getAddForm(callback){var _data={data:obj};callback(_data)}pop.init({obj:obj,list:list,$uibModal:$uibModal,updateData:getAddForm,save:function(obj,_detail){var type,showFlag,platform;type="BUTTON"==obj.type?2:1,showFlag="YES"==obj.showFlag?1:0,"CMS"==obj.platform?platform=1:"APP"==obj.platform&&(platform=2),data.permission.updatePermission({id:_detail.id,name:obj.name,description:obj.description,type:type,url:obj.url,sort:obj.sort,parentId:obj.parentId,showFlag:showFlag,platform:platform,permission:obj.permission,callback:function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),0==_data.code&&$state.reload()})}})},close:function(){$uibModal.dismiss("cancel")},callback:function(list,callback){callback(list)}})})},addChildPermission:function(obj,_detail){require(["../common/editPop"],function(pop){function getAddForm(callback){var _data={data:{parentId:obj.id}};callback(_data)}pop.init({obj:obj,list:list,$uibModal:$uibModal,updateData:getAddForm,save:function(obj,_detail){var type,showFlag,platform;type="BUTTON"==obj.type?2:1,showFlag="YES"==obj.showFlag?1:0,"CMS"==obj.platform?platform=1:"APP"==obj.platform&&(platform=2),data.permission.createPermission({name:obj.name,description:obj.description,type:type,url:obj.url,sort:obj.sort,parentId:obj.parentId,showFlag:showFlag,platform:platform,permission:obj.permission,callback:function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),console.log(_data),0==_data.code&&$state.reload()})}})},close:function(){$uibModal.dismiss("cancel")},callback:function(list,callback){callback(list)}})})},del:function(obj){pop.alert({text:"您确定要删除"+obj.name+"吗",btn:["确定","取消"],fn:function(){data.permission.delPermission(obj)}}),obj.callback=function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),$state.reload()})}},filter:[]}),getDataList()},link:function($scope,element){}}})});