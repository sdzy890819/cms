define(["app","./addForm","form","position","fixedNav"],function(app,getList){app.directive("userchannelAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function($scope){$scope.title="新增专题",$scope.$parent.menu.push({name:$scope.title}),getList(function(list){$scope.formdata={title:"新增新闻",list:list,submit:[{name:"确认发布",evt:"rlease",icon_cls:"ok"},{name:"取消",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]},$scope.$apply()})}}})});