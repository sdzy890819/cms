define(['./URL','jquery', '../moduls/Tool'],function(URL,$,Tool){
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
					layer.confirm('登录失败，请联系技术人员', {icon: 2, title:'提示'}, function(index){
					  	layer.close(index);
					  	location.reload();
					});			
				}
			})
		},
		loginOut : function(){ //栏目列表
			$.ajax({
				url : URL.user.loginOut , 
				type : 'POST',
				success : function(){
					window.location.href = '/#/login';
				}
			})
		},
		getUserInfo : function( callback ){	
		}
	}	
	return user;
});