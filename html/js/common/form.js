define(["app",'jquery','./common/textEdit','./moduls/directive'], function ( app , $ , textEdit ) {
	layui.link('js/plug/layui/css/layui.css');
	app.directive('formHorizontal',function(){
		return {
	    	restrict : 'E',
	    	replace : true,
	    	transclude : true,
	        templateUrl : '../template/common/form.html',
			scope : {
	            formdata : '=formdata',
	            edit : '=edit',
	            titelement : '=titelement',
	            data : '=data'
	        },
	        controller : function($scope , $state , $element , $rootScope,$uibModal,$css){
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

				$scope.$css = $css;
				$scope.$uibModal = $uibModal;

				angular.extend($scope,{
					isArray : function( value ){
						return angular.isArray(value);
					},
					selectDate : function( $event ){
						layui.laydate({
							elem: $event.target, 
							istime: true, 
							format: 'YYYY-MM-DD hh:mm:ss',
							festival: true
						});
					},
					close : function(){
						$scope.$parent.close();
					},
					submit : function( evt , obj ,$event ){
						evt(obj,$event.target);
					}
				});

				$scope.$watch(function(){
					return $scope.formdata;
				},function(){ 
					if($scope.formdata){
						$.each($scope.formdata.submit,function(){
							this.icon_cls = icon[this.icon_cls]
						});
						$.each($scope.formdata.list,function(){
							var self = this;
							if(this.type=='edit'){
								$scope.editorContent = '';
					        	$css.add('../../wangEditor/dist/css/wangEditor.min.css');
					        	textEdit.init($scope);
							}
						});
						return;
					};
				},true);
				
				

			},
			link : function($scope , element , arrt , controller){
				var ele = $(element[0]);
				$scope.formRepeat = function(){
					layui.use(['form', 'layedit', 'laydate'], function(){
						var form = layui.form()
					 		,layer = layui.layer
					  		,layedit = layui.layedit
					  		,laydate = layui.laydate;

					  	

					  	$.each($scope.formdata.list,function(){
							var self = this;
							if(this.type=='date'){ //日期
								layui.use('laydate', function(){});
							}else if(this.type=='file'){
								$scope.$css.add('../../style/stylesheets/pop.css');
								require(['../js/plug/upload/upload'], function(upload) {
			        				upload.init({
			        					elem : '.layui-upload-button',
			        					$uibModal :$scope.$uibModal ,
			        					$css : $scope.$css , 
			        					typeName : self.typeName
			        				});
			  					});
							}else if(this.type=='upload'){
								layui.use('upload', function(){
									layui.upload({
										elem : '.'+self.cls,
										url : '/upload/uploadFile',
										title: self.name||'',
										type : self.fileType||'',
										ext : self.ext||'',
										method : self.method||'POST',
										before : function(){},
										success : function(){

										}
									});
								});
							}
							if(this.type =='select'){
								form.on('select',function( _obj ){
									self.callback(_obj);
							  	});
							}
						});

					  	form.render(); //更新全部
					  	//自定义验证规则
						form.verify({
							title: function(value){
							  if(value.length < 5){
							    return '内容至少得5个字符啊';
							  }
							}
							,http : function( value ){
								var reg = /^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
								if(value.search(reg)<0){
									return '请输入正确的域名（例：http://www.xy.com）';
								};
							}
							,path : function( value ){
								var reg = /^([A-Za-z]{1}\/[\w\/]*)?\w+\/{1}[a-zA-Z]+$/;
								if(value.search(reg)<0){
									return '请输入正确的路经（例：xy/xy）';
								};
							}
							,select : function( value , ele){
								if(value.indexOf('请选择')>-1 && ele.parentNode.selectedIndex == 0){
									return value;
								}
							}
							//required（必填项）phone（手机号）email（邮箱）url（网址）number（数字）date（日期）identity（身份证）
						});
						form.on('submit(demo1)', function(data){
							var event = $(data.elem).attr('data-event');

							if($scope.editor){
							 	// 获取编辑器区域完整html代码
						        var html = $scope.editor.$txt.html();
						        // 获取编辑器纯文本内容
						        var text = $scope.editor.$txt.text();
						        // 获取格式化后的纯文本
						        var formatText = $scope.editor.$txt.formatText();
							}

							if(data.nodeName!='A'){
								$scope.$parent[event](JSON.stringify(data.field));
							}else{
								
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