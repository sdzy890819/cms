define(function (require, exports, module) {
	exports.init = function( obj ){
		var $ = jQuery,
			create = require('./createElement'),
			config = {
				app : obj.app , 
				name : 'formHorizontal' , 
				templateUrl : '../template/common/form.html',
				scope : {
		            formdata : '=formdata',
		            edit : '=edit'
		        },
				controller : function($scope , $state , $element , $rootScope){
					var icon = {
						add:'plus',//添加
						save:'save',//保存
						view:'eye-open',//预览
						del:'trash',//删除
						upload:'upload-alt',//上传
						magnet:'magnet',//关联
						ok:'ok',//全选 确定
						cancel : 'minus-sign' //取消
					};
					$.each($scope.formdata.submit,function(){
						this.icon_cls = icon[this.icon_cls]
					});
					$scope.isArray = function( value ){
						return angular.isArray(value);
					};
				},
				link : function($scope , element , arrt , controller){
					var ele = $(element[0]) ;
					$scope.submit = function( callback ){
						var item = ele.find('.item') , 
							arr = [];
						item.each(function(){
							var type = $(this).attr('data-type');
							if(type == 'text'){
								arr.push($(this).find('input').val())
							}else if(type == 'textarea'){
								arr.push($(this).find('textarea').val())
							}else if(type=='select'){
								var select = $(this).find('select') , arr1 = [];
								if(select.length>1){
									select.each(function(i , ele){
										arr1.push( {key:ele.selectedIndex,val:ele.value} )
									})
									arr.push(arr1)
								}else{
									arr1.push( {key:select[0].selectedIndex,val:select[0].value} )
									arr = arr.concat(arr1)
								}
							}
						})
						callback(arr);
					}			 
				}
			}
		$.extend(config,obj);
		create.init( config );
	}
});