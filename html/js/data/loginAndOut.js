define(['./URL','jquery','./getInitInfo' , '../moduls/Tool'],function(URL,$,userInfo,Tool){
	var user = {
		login : function( obj ){
			$.ajax({
				type: 'POST',				
				url : URL.user.login , 
				data : {userName: obj.data.username, pwd: obj.data.password},
				success : function(_data){	
                    var url = Tool.getQueryString('returnUrl');
					if(obj.callback){
						obj.callback(_data);
					}else{
	                    if(void 0!= url && url.length>5){
	                        window.location.href = decodeURIComponent(url);
	                    }else{
	                    	window.history.back();
	                    }
					}								
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