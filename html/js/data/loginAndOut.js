define(['./URL','jquery','./getInitInfo'],function(URL,$,userInfo){
	var user = {
		login : function( obj ){
			$.ajax({
				type: 'POST',				
				url : URL.user.login , 
				data : {userName: obj.userName, pwd: obj.pwd},
				success : function(_data){										
					obj.callback(_data);
				},
				error : function(_data){

					getUserInfo();
					alert('登录请求异常');				
				}
			})
		},
		loginOut : function(){ //栏目列表
			$.ajax({
				url : URL.user.loginOut , 
				data : {},
				success : function(){
					
					window.initInfo = null;
				},
				error : function(){}
			})
		},
		getUserInfo : function( callback ){			
			user.login({
				userName: 'admin', 
				pwd: '1234qwer',
				callback : callback
			})
		}
	}	
	return user;
});