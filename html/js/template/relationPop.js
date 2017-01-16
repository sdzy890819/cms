define(["app",'jquery','../data/getData'],function (app,$,getData) {
    return {
    	init : function( obj ){
			var $uibModal = obj.$uibModal , 
				getList = obj.list;
			obj.$uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: '../template/template/relationPop.html',
				windowClass : 'relationPopsuper',
				controller: function($scope,$uibModalInstance,$css) {
					angular.extend($scope,{
						titelement : {
					  		close : true
					  	},
						save : function( arr ){ //保存
							obj.save(arr,$scope.data)
						},
						cancel : function( arr ){ //取消
							obj.cancel(arr,$scope.data)
						},
					  	close : function () {
						   	$uibModalInstance.dismiss('cancel');
					  	}
					});
					getData.news.relationColumnList({//新闻栏目
						callback : function(_data){
							$scope.relationColumnListData = _data.data;
							$scope.$apply();
						}
					})
					getData.topic.topicClassifyList({//专题分类列表 接口
						callback : function(_data1){
							$scope.topicClassifyListData = _data1.data;
							$scope.$apply();
						}
					})
					getData.fragment.list({ //所有碎片列表
						callback : function(_data2){
							$scope.fragmentListData = _data2.data;
							$scope.$apply();
						}
					})
					getData.news.recommendColumnlist({//新闻推荐栏目列表 接口
						alert : false,
						callback : function(_data3){
							$scope.recommendColumnlistData = _data3.data;
							$scope.$apply();
						}
					})
				}
			});
    	}
    }
});