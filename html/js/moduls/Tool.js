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
		,getByteLen : function(val) { //返回val的字节长度 
			var len = 0; 
			val = val.split('');
			for (var i = 0; i < val.length; i++) { 
				if (val[i].match(/[^\x00-\xff]/ig) != null) //全角 
					len += 2; 
				else 
					len += 1; 
			} 
			return len; 
		}
		,getByteVal : function(val, max) { //返回val在规定字节长度max内的值 
			var returnValue='',byteValLen = 0; 
			val = val.split('')
			for (var i = 0; i < val.length; i++) { 
				if (val[i].match(/[^\x00-\xff]/ig) != null) 
					byteValLen += 2; 
				else 
					byteValLen += 1; 
				if (byteValLen > max) 
				break; 
				returnValue += val[i]; 
			} 
			return returnValue; 
		}
	};
	return T;
})