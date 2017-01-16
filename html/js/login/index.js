define(["app",'require','../data/getInitInfo'], function ( app , require , dataInfo ) {
	return ['$state',function($state){
		layui.use(['form', 'layedit', 'laydate'], function(){
		  var form = layui.form()
		  ,layer = layui.layer
		  ,layedit = layui.layedit
		  ,laydate = layui.laydate;
		  
		  //自定义验证规则
		  form.verify({
		    title: function(value){
		      if(value.length < 5){
		        return '用户名至少得5个字符啊';
		      }
		    }
		    ,pass: [/(.+){6,12}$/, '密码必须6到12位']
		  });

		  //监听提交
		  form.on('submit(demo2)', function(data){
		  	dataInfo.login({
		  		data : data.field , 
		  		callback : function(_data){
		  			$state.go('home');
		  		}
		  	});
		    return false;
		  });
		  
		  
		});
	}];
});