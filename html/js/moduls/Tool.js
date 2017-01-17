define(function(){
	var T = {
		changeObjectName : function( extend , array ){ // 把 extend 中的 typeName == array[0] 的名字换成 array[1] 
			$.each(array,function( i , obj ){
				$.each(extend,function( j , _obj ){
					$.each(_obj,function( key , value ){
						if(key == obj.name){
							_obj[obj.newName] = value;
						}
					});
				})
			});
			return extend;
		},
      	getQueryString : function ( name ){
            var reg = new RegExp("(^|&|/?)" + name + "=([^&]+)(&|$)", "i");
            var r = decodeURIComponent(window.location.search||window.location.href||window.location.hash).substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }

	};
	return T;
})