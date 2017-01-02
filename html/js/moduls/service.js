define(['app'],function(app){
	app.service('pop', function() {
	    this.alert = function (obj) {
	        layui.use(['layer'], function(){
				var layer = layui.layer;
				layer.alert(obj.text,
					{
					  skin: obj.cls||'layui-layer-molv' //样式类名
					  ,title : obj.title
					  ,anim: obj.anim||1 //动画类型
					  ,btn : obj.btn
					  ,shadeClose : true
					}, obj.fn , obj.fn1,obj.fn2
				);
			});
	    }
	});
});