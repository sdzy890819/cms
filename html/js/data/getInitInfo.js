define(['./URL','./loginAndOut','jquery','./getData'],function(URL , user ,$ , getData){
	if(!window.quanjing){
		var quanjing = {
			user : null //登录信息
		}
		window.quanjing = quanjing;
	}
	var info = {
		init : function(){
			info.getAllInfo();
		},
		login : function( obj ){
			user.login({
				data : obj.data,
				callback : function(_data){
					$.ajax({ //当前登录用户信息接口
						url : URL.user.currentUser , 
						type : 'get',
						dataType : 'json',
						success : function(_data){												
							quanjing.user = _data;
							obj.callback(_data);
						}
					})
				}
			});
		},
		loginOut : function(){
			user.loginOut();
		},
		getUserInfo : function( obj ){
			return obj.callback && obj.callback();
			if(!quanjing.user){
				window.location.href = '/#/login';
			}else{
				obj.callback && obj.callback();
				return quanjing.user;
			}
		},
		getPublicData : function(callback){
			$.ajax({
				url : URL.data.all , 
				type : 'get',
				success : function( _data ){
					quanjing.all = _data;
					callback && callback(_data);
				},
				error : function(){}
			})
		},
		getAllInfo : function(callback){ //获取所有信息
			info.getUserInfo(function(){
				info.getPublicData(callback);
			});
		}
	}
	return info;
});
