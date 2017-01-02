define(['app','jquery'],function(app,$){
	app.factory({
		GenerateArrList : function(){
			return {
				arr : function( oldarr , filter){ //对列表数据进行过滤生成新的列表
					var arr = [];
					$.each(oldarr,function( i , obj ){
						var li = {} , k = 0;
						$.each(obj,function( key , val ){
							var b = false;
							for(var j=0,len=filter.length;j<len;j++){
								if(key==filter[j]){
									b = true;
									break;
								}
							}
							if(!b){
								li['name'+k] = val;
								k++;
							}else{
								li[key] = val;
							}
						});
						arr.push(li);
					});
					return arr;
				}
			}
		}
	});
});