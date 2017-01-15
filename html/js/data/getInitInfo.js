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
					getData.user.currentUser({
						callback : function(_data){
							quanjing.user = _data;
							obj.callback(_data);
						}
					})
				}
			});
		},
		getUserInfo : function( obj ){
			if(!quanjing.user){
				window.location.href = '/#/login';
			}else{
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
