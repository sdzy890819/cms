var T = {
	loadding : function( b ){
		if(!T.load){
			T.load = $('<div class="load-mask"><div class="loadding"></div></div>')
		}
		if(b){
			T.load.appendTo($('body'));
		}else{
			T.load.remove();
		}
		
	},
	ajax : function( obj ){
		obj.type = obj.type || 'get';
		obj.dataType = obj.dataType || 'json';
		T.loadding(true);
		$.ajax({
			url : obj.url , 
			type : obj.type,
			dataType : obj.dataType,
			data : obj.data,
			success : function( _data ){
				T.loadding();
				if(_data.code == 0 ){
					obj.success(_data);
				}else{
					if(obj.alert==false){
						obj.success(_data);
						return;
					};
					if(_data.code == -110 || _data.code == -1 ){//未登录
						router.push('login')
						return;
					}else if(_data.code == -111 ){ //无权限								
					}
				}
			},
			error : function(){}
		})
	}
}
module.exports = T;