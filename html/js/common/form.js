define(["app",'jquery'], function ( app , $ ) {
	layui.link('js/plug/layui/css/layui.css');
	app.directive('formHorizontal',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
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
				$.each($scope.formdata.list,function(){
					if(this.type=='date'){
						layui.use('laydate', function(){});
					}
				});
				$scope.selectDate = function( $event ){
					layui.laydate({
						elem: $event.target, 
						istime: true, 
						format: 'YYYY-MM-DD hh:mm:ss',
						festival: true
					});
				}
			},
			link : function($scope , element , arrt , controller){

				var ele = $(element[0]) ;
				$scope.submit = function( callback ){
					var item = ele.find('.item') , 
						arr = [];
					item.each(function(){
						var obj = $.parseJSON($(this).attr('data-obj')),
							type = obj.type , 
							check = obj.check , 
							val = '';
						if(type == 'text'){
							val = $(this).find('input').val();
							if(val && val.length>=obj.minLength && val.length<=obj.maxLength){
								arr.push(val)
							}else{
								alert(1)
							}
						}else if(type == 'textarea'){
							val = $(this).find('textarea').val()
							arr.push(val)
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

				layui.use(['form', 'layedit', 'laydate'], function(){
					/*var form = layui.form()
				  ,layer = layui.layer
				  ,layedit = layui.layedit
				  ,laydate = layui.laydate;
						form.on('submit(demo1)', function(data){
					    layer.alert(JSON.stringify(data.field), {
					      title: '最终的提交信息'
					    })
					    return false;
					  });*/
				});		 
			}
		}
	});
});