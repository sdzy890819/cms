define(["app"], function ( app ) {
	app.directive('positionNav',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/positionNav.html',
			scope : {
	            edit : '=edit',
	            submit : '=submit'
	        },
			controller : function($scope , $state){
				var icon = {
					add:'plus',//添加
					save:'save',//保存
					edit:'edit',//编辑
					del:'trash',//删除
					upload:'upload-alt',//上传
					magnet:'magnet',//关联
					ok:'ok'//全选 确定
				};
				if($scope.edit){
					if($scope.edit.nav){
						$.each($scope.edit.nav,function(){
							this.icon_cls = icon[this.icon_cls]
						});
					}
					$.each($scope.edit.list,function(){
						this.icon_cls = icon[this.icon_cls]
					});
				}
			},
			link : function($scope , element ){
				function listFinish(){
					var ele = $('.position-fixed')
						,list = ele.find('.list')
						,timer = 0;
					ele.find('.edit').mouseenter(function(){
						list.show();
						setTimeout(function(){
							list.addClass('cur')
						},20);
						clearTimeout(timer);
					})
					.mouseleave(function(){
						list.removeClass('cur');
						timer = setTimeout(function(){
							list.hide();
						},520);
					})
				}
				$scope.$on('listFinish', listFinish)
			}
		}
	})
});