define(['./URL','jquery','./getInitInfo'],function(URL,$,userInfo){
	var user = {
		login : function(){ //栏目列表
			$.ajax({
				url : URL.user.login , 
				data : {},
				success : function(_data){
					var _data = {
					    "code":0,
					    "message":"成功",
					    "data":{}
					}
				},
				error : function(){}
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
		}
	}

	return user;
});