define(['app','jquery'],function(app,$){
	app.factory({
		GenerateArrList : function(){
			return {
				/*arr : function( oldarr , filter){ //对列表数据进行过滤生成新的列表
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
				},*/
				arr : function( oldarr , filter){ //对列表数据进行过滤生成新的列表
					var arr = [];
					$.each(oldarr,function( i , obj ){
						var li = {} , k = 0 , _arr = [];
						$.each(obj,function( key , val ){
							var b = false;
							for(var j=0,len=filter.length;j<len;j++){
								if(key==filter[j]){
									b = true;
									break;
								}
							}
							if(!b){
								_arr.push({
									name : val
								});
								li[key] = val;
								k++;
							}else{
								li[key] = val;
							}
						});
						li.list = _arr;
						arr.push(li);
					});
					return arr;
				},
				extendType : function( extend  , arr , exclude ){ //更新属性 把 arr中exclude中的属性以外的属性 传给 extend[i].list 
					exclude = exclude || [];
					var _obj ={}
						,len = exclude.length;
					function newExtend( k , key , value){
						$.each(extend,function(){
							try{
								this.list[k][key] = value;
							}catch(e){
								console.log('编辑不在td范围内');
							}
						})
					}
					$.each(arr,function( k , obj ){
						$.each(obj,function( key , value ){
							if(len){
								var bool = false , i = 0;
								for(;i<len;i++){
									if(key==exclude[i]){
										bool = true;
										break;
									}
								}
								if(!bool){
									newExtend(k,key,value);
									_obj[key]=value;
								}      
							}else{
								_obj[key]=value;
								newExtend(k,key,value);
							}
						});
					});
				},
				extendChild : function( extend , arr , type ){ // //更新属性 把 arr传给 extend[i][type]
					$.each(extend,function(){
						this.list[type] = arr;
					})
				}
			}
		}
	});
});