define(["app",'jquery','../data/getData','../moduls/factory','../moduls/directive'],function (app,$,getData) {
    return {
    	init : function( obj ){
			var $uibModal = obj.$uibModal , 
				getList = obj.list , 
				moduleId = obj.obj.id;
			
			obj.$uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: '../template/template/relationPop.html',
				windowClass : 'relationPopsuper',
				controller: function($scope,$uibModalInstance,$css) {
					$scope.initData = null;
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
					  	},
					  	setTab : function( obj , tabIndex , event ){
					  		var tag = event.currentTarget , 
					  			dome = $('.relation-pop') , 
				  				title = dome.find('.title li') , 
				  				cnt = dome.find('.content .option');

					  		title.removeClass('current').eq(tabIndex).addClass('current')
		  					cnt.hide().eq(tabIndex).show();
					  	},
					  	selectBox : function( event , obj , tabIndex ){
					  		var tag = event.currentTarget , 
					  			checked = tag.checked;
					  		if(checked==true){
					  			getData.template.createRelation({
					  				"templateId":moduleId, //模板ID
									"relationId":obj.id,  //当前选择的 栏目下的小栏目 的ID
									"relationType":tabIndex, //当前栏目ID
									callback : function(){}
					  			})
					  		}else{
					  			getData.template.delRelation({
					  				"templateId":moduleId,
									"relationId":obj.id,
									"relationType":tabIndex,
									callback : function(){}
					  			})
					  		}
					  	},
					  	recommendColumnlistDone : function(){ //加载完
					  		setTimeout(function(){
					  			var dome = $('.relation-pop') , 
					  				title = dome.find('.title li') , 
					  				cnt = dome.find('.content .option');
					  			cnt.hide().eq(0).show();
					  		},200)
					  	}
					});
					getData.data.all({
						callback : function( _data ){
							$scope.tabs = _data.data.relationType;
							var id = null;
							$.each($scope.tabs,function(){
								id = this.type;
								if(id == 1){
									getData.news.relationColumnList({//新闻栏目
										callback : function(_data){
											$scope.relationColumnListData = _data.data;
											$scope.$apply();
										}
									})
								}else if(id==2){
									getData.fragment.list({ //所有碎片列表
										callback : function(_data2){
											$scope.fragmentListData = _data2.data;
											$scope.$apply();
										}
									})
								}else if(id==3){
									getData.topic.topicClassifyList({//专题分类列表 接口
										callback : function(_data1){
											$scope.topicClassifyListData = _data1.data;
											$scope.$apply();
										}
									})
								}else if(id==4){
									getData.news.recommendColumnlist({//新闻推荐栏目列表 接口
										alert : false,
										callback : function(_data3){
											$scope.recommendColumnlistData = _data3.data;
											$scope.$apply();
										}
									});
								}
							})
						}
					})
					getData.template.relation({
						"templateId":moduleId,
						"relationType":0, //默认0 
						callback : function(_data){
							$scope.initData = _data.data;
						}
					})
				}
			});
    	},
    	updateData : function(){

    	}
    }
});