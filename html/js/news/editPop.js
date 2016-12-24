define(["app",'jquery'],function (app,$) {
	app.directive('editPop',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        template : '../template/common/form.html',
	        //templateUrl : '../template/common/form.html',
			scope : {
	            
	        },
	        controller : function($scope , $state , $element , $rootScope){

			},
			link : function(){

			}
		}
	});
    return {
    	init : function( obj ){
    		layui.use(['layer'], function(){
				var layer = layui.layer , 
					edit = $('<edit-pop>3498sdf</edit-pop>');
	    		layer.open({
					title : '标题'
					,content: '<edit-pop>3498sdf</edit-pop>'
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
			});
			
    	}
    }
});