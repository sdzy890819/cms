define(['./URL','jquery','./getInitInfo'],function(URL,$,userInfo){
	var user = {
		login : function(){						
			$.ajax({
				type: 'POST',				
				url : URL.user.login , 
				data : {userName: 'admin3', pwd: '1234qwer'},

				success : function(_data){
					
					console.log(_data);
					var _data = {
					    "code":0,
					    "message":"成功",
					    "data":{}
					}
				},
				error : function(_data){					
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
		}
	}

	return user;
});