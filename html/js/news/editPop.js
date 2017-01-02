define(["app",'jquery','./addForm','form'],function (app,$,list) {
    return {
    	init : function( obj ){
    		var $uibModal = obj.$uibModal;
    		/*layui.use(['layer'], function(){
				var layer = layui.layer , 
					edit = $('<edit-pop>3498sdf</edit-pop>');
	    		layer.open({
					title : '标题'
					,content: '<news-add></news-add>'
					,area : '90%'
					,btn: ['按钮一', '按钮二', '按钮三']
					,shadeClose : true
					,maxmin : false
					,yes: function(index, layero){
					//按钮【按钮一】的回调
					},btn2: function(index, layero){
					//按钮【按钮二】的回调
					},btn3: function(index, layero){
					//按钮【按钮三】的回调
					}
					,cancel: function(){ 
					//右上角关闭回调
					}
				});
			});*/
			//console.log(obj.obj);
			obj.$uibModal.open({
		      animation: true,
		      ariaLabelledBy: 'modal-title',
		      ariaDescribedBy: 'modal-body',
		      //windowTemplateUrl : '../../template/common/window.html',
		      //template : 'asdfsadf',
		      templateUrl: '../template/news/add.html',
		      size: 'lg',
		      controller: function($scope,$uibModalInstance) {

		      	$scope.titelement = {
		      		close :true
		      	};
		      	$scope.close = function () {
				   	$uibModalInstance.dismiss('cancel');
			  	};

			  	$.each(list,function( i , item ){
			  		
			  	});

				$scope.formdata = { //确认按钮
					title : '编辑',
					cls : 'popedit',
					list : list,
					submit : [
						{
							name : '确定',
							evt : 'save',
							icon_cls : 'save'
						},
						{
							name:'取消',
							evt : 'cancel',
							icon_cls : 'cancel',
							cls : 'cancel'
						}
					]
				}
		      }
		    });
    	}
    }
});