define(["require","app","jquery","../data/getData","./classForm",,"formlist","fixedNav","position","../moduls/service","../moduls/factory"],function(require,app,$,data,list){app.directive("fragmentClassList",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/list.html",controller:function($scope,pop,$uibModal,$css,GenerateArrList,$state){$scope.title="碎片分类列表",$scope.$parent.menu.push({name:$scope.title}),angular.extend($scope,{edit:function(obj){require(["../common/editPop"],function(pop){function getAddForm(callback){callback({data:obj})}pop.init({obj:obj,list:list,$uibModal:$uibModal,updateData:getAddForm,save:function(obj,_detail){data.fragment.updateClassify({id:_detail.id,classifyName:obj.classifyName,callback:function(_data){layui.use(["layer"],function(){layui.layer.msg(_data.message),$state.reload()})}})},callback:function(list,callback){callback(list)}})})},del:function(obj){pop.alert({text:"你确定删除"+obj.classifyName+"吗?",btn:["确定","取消"],fn:function(index){data.fragment.delClassify(obj)}}),obj.callback=function(_data){layui.use(["layer"],function(){layui.layer.msg(_data.message),0==_data.code&&$("table").find("tr[data-id="+obj.id+"]").hide()})}},filter:["id"]}),data.fragment.listClassify({callback:function(_data){var th=[{name:"名称",key:"classifyName"},{name:"操作",width:"120",class:"center"}];$scope.listdata={title:$scope.title,table:{select:!0,th:th,td:GenerateArrList.setArr(_data.data,th),edit:[{cls:"edit",name:"编辑",evt:$scope.edit},{cls:"del",name:"删除",evt:$scope.del}]}},GenerateArrList.extendChild($scope.listdata.table.td,$scope.listdata.table.edit,"edit"),$scope.$apply()}})},link:function($scope,element){}}})});