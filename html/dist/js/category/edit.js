// define(["app", '../data/getData','./addForm','form','position','fixedNav'], function ( app , getData, list ) {
// 	app.directive('categoryEdit',function(){
// 		return {
// 	    	restrict : 'E',
// 	    	replace : true,
// 	    	transclude : true,
// 	        templateUrl : '../template/common/addAndEdit.html',
// 	        controller : function($scope){
// 	        	$scope.title = '部门分类编辑';
// 	        	$scope.$parent.menu.push({name:$scope.title});
// 						$scope.save = function( obj ){ //保存							
// 							 getData.category.updateCategory({
// 							 	id: obj.id,
// 							 	categoryName: obj.categoryName,
// 							 	categoryDesc: obj.categoryDesc,
// 							 	callback : function(_data){
// 									layui.use(['layer'], function(){
// 										var layer = layui.layer;
// 										layer.msg(_data.message);
// 									});							 		
// 							 	}
// 							 })
// 						}
// 						$scope.cancel = function( obj ){ //取消
// 							alert(obj)
// 						}
// 						$scope.formdata = { //确认按钮
// 							title : $scope.title,
// 							list : list,
// 							submit : [
// 								{
// 									name : '保存',
// 									evt : 'save',
// 									icon_cls : 'save'
// 								},
// 								{
// 									name:'清空',
// 									evt : 'cancel',
// 									icon_cls : 'cancel',
// 									cls : 'cancel'
// 								}
// 							]
// 						}
// 						$scope.$apply();
// 	        }
// 	    };
// 	});
// });
define(["app","jquery","../data/getData","./addForm","form","position","fixedNav"],function(a,e,t,i){return{init:function(a){var e=(a.$uibModal,a.list),i=a.id;a.$uibModal.open({animation:!0,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",
//windowTemplateUrl : '../../template/common/window.html',
//template : 'asdfsadf',
templateUrl:"../template/common/addAndEdit.html",size:"lg",controller:function(n,o,l,c){a.updateData(function(a){n.data=a.data}),angular.extend(n,{titelement:{close:!0},save:function(a){//保存							
t.category.updateCategory({id:i,categoryName:a.categoryName,categoryDesc:a.categoryDesc,callback:function(a){layui.use(["layer"],function(){var e=layui.layer;e.msg(a.message),c.reload(),o.dismiss("cancel")})}})},close:function(){o.dismiss("cancel")}}),e(function(e){a.callback(e,function(a){n.formdata={//确认按钮
title:"部门分类编辑",cls:"popedit",list:a,submit:[{name:"更新",evt:"save",icon_cls:"save"}]},n.$apply()})})}})}}});