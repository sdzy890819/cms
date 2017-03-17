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
		      if(value.length < 1){
		        return '请输入用户名';
		      }
		    }		    
		  });

		  //监听提交
		  form.on('submit(demo2)', function(data){
		  	dataInfo.login({
		  		data : data.field , 
		  		callback : function(_data){
		  			if (_data.code == 0){
		  				$state.go('home.welcome');	
		  			}else{
		  				layer.msg("登录失败，请检查用户名密码");
		  			}
		  			
		  		}
		  	});
		    return false;
		  });
		  
		  
		});
	}];
});