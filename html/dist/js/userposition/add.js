define(["app","./form","../data/getData","../moduls/Tool","form","position","fixedNav"],function(app,list,getData,Tool){app.directive("userpositionAdd",function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"../template/common/addAndEdit.html",controller:function($scope,$state){$scope.$parent.menu.push({name:"新增用户组"}),$scope.save=function(obj){getData.position.createPosition({positionName:obj.positionName,callback:function(_data){layui.use(["layer"],function(){var layer=layui.layer;layer.msg(_data.message),0==_data.code&&$state.go("userposition.list")})}})},$scope.rlease=function(obj){},$scope.view=function(obj){},$scope.cancel=function(obj){},$scope.formdata={title:"新增分类",list:list,submit:[{name:"保存",evt:"save",icon_cls:"ok"}]}}}})});