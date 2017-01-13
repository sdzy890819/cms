define(['./URL','./loginAndOut','jquery','./getData'],function(URL , user ,$ , data){
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
		getUserInfo : function( callback ){
			user.getUserInfo(function(_data){
				quanjing.user = _data;
				callback && callback(_data);
			});
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
