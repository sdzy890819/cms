define(["app","./addForm","form","position","fixedNav"],function(app,list){app.directive("userchannelAddUser",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function($scope){$scope.title="创建用户权限",$scope.$parent.menu.push({name:$scope.title}),$scope.save=function(obj){alert(obj)},$scope.cancel=function(obj){alert(obj)},$scope.formdata={title:$scope.title,list:list,submit:[{name:"保存",evt:"save",icon_cls:"save"},{name:"清空",evt:"cancel",icon_cls:"cancel",cls:"cancel"}]}}}})});