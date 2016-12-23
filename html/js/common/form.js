define(["app",'jquery','./moduls/directive'], function ( app , $ ) {
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
				var ele = $(element[0]);
				$scope.formRepeat = function(){
					layui.use(['form', 'layedit', 'laydate'], function(){
						var form = layui.form()
					 		,layer = layui.layer
					  		,layedit = layui.layedit
					  		,laydate = layui.laydate;

					  	form.render(); //更新全部
					  	//自定义验证规则
						form.verify({
							title: function(value){
							  if(value.length < 5){
							    return '标题至少得5个字符啊';
							  }
							}
							,select : function( value , ele){
								if(value.indexOf('请选择')>-1 && ele.parentNode.selectedIndex == 0){
									return value;
								}
							}
							//required（必填项）phone（手机号）email（邮箱）url（网址）number（数字）date（日期）identity（身份证）
						});
						form.on('submit(demo1)', function(data){
							if(data.elem.nodeName=='A'){
								
							}else{
								var event = $(data.elem).attr('data-event');
								$scope.$parent[event](JSON.stringify(data.field));
							}

						    /*layer.alert(JSON.stringify(data.field), {
						      title: '最终的提交信息'
						    })*/
						    return false;
					  	});
					});	
				}
			}
		}
	});
});