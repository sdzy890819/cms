define(['./URL','jquery','./getData'],function(URL,$ , data){
	if(!window.initInfo){
		var info = {
			currentButtonPermission  : null //取用户Menu下的Button权限

		};
		var arr = [];
		data.permission.currentButtonPermission(function(_data){
			info.currentButtonPermission = _data.data;
		});
		window.initInfo = info;
	}
});
