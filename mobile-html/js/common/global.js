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
	pop : function( val , cls  , time ){
		cls = cls||'';
		time = time || 3;
		if(!T.popHtml){
			T.popHtml = $("<div class='pop-tip'></div>").appendTo($('body'))
		}
		T.popHtml.removeClass('error');
		T.popHtml.addClass(cls);
		setTimeout(function(){
			var height = parseInt($(window).height()/2);
			T.popHtml.html(val);
			T.popHtml.css({opacity:1});
			T.popHtml.css({'transform':'translateY('+height+'px)'})
			T.popHtml.css({'-webkit-transform':'translateY('+height+'px)'})
			setTimeout(function(){
				T.popHtml.css({opacity:0});
				T.popHtml.css({'transform':'translateY(0)'})
				T.popHtml.css({'-webkit-transform':'translateY(0)'})
			},time*1000)
		},50)
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
						router.push('/login')
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