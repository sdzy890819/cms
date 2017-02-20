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
	        controller : function($scope , $state , $element , $rootScope,$uibModal,$css,$timeout){
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
					},
					inputNum : 1,
					addInput : function( obj , index ){ //新增输入匡
						var firstArr, lastArr, num = $scope.inputNum+1;
							name = obj.name.match(/\d+$/) , 
							title = obj.title.replace(obj.title.match(/\d+$/)[0],'');
						
						$.each($scope.formdata.list,function( i , _obj ){
							if(_obj.num==$scope.inputNum){
								firstArr = $scope.formdata.list.slice(0,i+1) 
								lastArr = $scope.formdata.list.slice(i+1) 
							}
						})
						if($scope.inputNum<obj.inputMaxNum){
							if(name){
								name = obj.name.replace(name[0],'');
							}else{
								name = obj.name;
							}
							obj.name = name+obj.num;
							firstArr.push({
								title : title+num,
								name : name+num,
								placeholder : '请输入扩展字段内容',
								num : num, //当前为第1条
								inputMaxNum : obj.inputMaxNum,
								type : obj.type
							})

							$scope.formdata.list = firstArr.concat(lastArr);
							if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
								$scope.$apply();
		  					}
		  					return;
						}
						layui.use('layer', function(){
						  layui.layer.msg('扩展字段只能添加'+(num-1)+'条',{icon: 2,anim:6});
						}); 
					},
					delInput : function( obj , index ){ //删除输入匡
						var firstArr = $scope.formdata.list.slice(0,index+1) , 
							lastArr = $scope.formdata.list.slice(index+1) , 
							name = obj.name.match(/\d+$/) , 
							title = obj.title.replace(obj.title.match(/\d+$/)[0],''),
							num =  obj.num;

						if(name){
							name = obj.name.replace(name[0],'');
						}else{
							name = obj.name;
						}
						firstArr.pop();
						$.each(lastArr,function( i , _obj ){
							if(this.inputMaxNum){
								this.num--;
								this.title = title+this.num;
								this.name = name+this.num;
							}
						})

						$scope.formdata.list = firstArr.concat(lastArr);

						if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
							$scope.$apply();
	  					}
					}
				});
				$scope.$watch(function(){
					return $scope.formdata;
				},function(){ 
					if($scope.formdata){
						$.each($scope.formdata.submit,function(){
							this.icon_cls = icon[this.icon_cls]
						});
						var inputNum = 0;
						$.each($scope.formdata.list,function(){
							var self = this;
							if(this.type=='edit'){
								$scope.editorContent = '';
					        	$css.add('../../wangEditor/dist/css/wangEditor.css');
					        	textEdit.init($scope,{
					        		callback : function(editor){
					        		}
					        	});
							}else if(this.inputMaxNum){
								inputNum++;
							}
						});
						$scope.inputNum = inputNum;
						return;
					};
				},true);
			},
			link : function($scope , element , arrt , controller){
				var ele = $(element[0]);
			      $scope.selects = [];
				layui.use(['form', 'layedit', 'laydate'], function(){
					var form = layui.form()
				 		,layer = layui.layer
				  		,layedit = layui.layedit
				  		,laydate = layui.laydate;
				  	angular.extend($scope,{
						formRepeat : function(){ //全局更新
						  	function setType(){
						  		var self = this;
						  		if(this.type=='date'){ //日期
									layui.use('laydate', function(){});
								}else if(this.type=='file'){ //上传文件
									/*$scope.$css.add('../../style/stylesheets/pop.css');
									require(['../js/plug/upload/upload'], function(upload) {
				        				upload.init({
				        					elem : '.layui-upload-button',
				        					$uibModal :$scope.$uibModal ,
				        					$css : $scope.$css , 
				        					typeName : self.typeName
				        				});
				  					});*/
								}else if(this.type=='upload'){
									layui.use('upload', function(){
										self.callback && self.callback(layui);
										/*layui.upload({
											elem : '.'+self.cls,
											url : '/upload/uploadFile',
											title: self.name||'',
											type : self.fileType||'',
											ext : self.ext||'',
											method : self.method||'POST',
											before : function(){},
											success : function(){

											}
										});*/
									});
								}else if(this.type=='edit'){ //富文本
									var html = $('.wangEditor').attr('data-html');
									(function setHtml(){
										if(window.Editor){
											window.Editor.$txt.html(html);
										}else{
											setTimeout(setHtml,100);
										}
									})();
								}
						  	}

						  	$.each($scope.formdata.list,function( i , obj ){
								if($.type(obj) == 'array'){									
									$.each(obj,function(){										
										setType.call(this);
									})
								}else{
									setType.call(this);
								}
							});

						  	form.render(); //更新全部
						  	//自定义验证规则
							form.verify({
								title: function(value){
								  if(value.length < 1){
								    return '内容至少得1个字符啊';
								  }
								},
								userName: function(value) {
								  if(value.length < 5){
								    return '用户名至少为5个字符串';
								  }									
								},
								password: function(value) {
								  if(value.length < 6){
								    return '密码至少为6个字符串';
								  }											
								},
								image : function(value) {
								  if(value.length < 1){
								    return '请上传图片';
								  }											
								}
								,http : function( value ){
									var reg = /^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
									if(value.search(reg)<0){
										return '请输入正确的域名（例：http://www.xy.com）';
									};
								}
								,path : function( value ){
									//var reg = /^\/+([A-Za-z]{1}\/[\w\/]*)?\w+\/{1}[a-zA-Z]+$/;
									// var reg = /^[\/|\w|\d]+\/{1}[\w|\d]{1}[\/|\w|\d]+$/;
									// if(value.search(reg)<0){
									// 	return '请输入正确的路经（例：xy/xy）';
									// };
								}
								,select : function( value , ele){
									if(value.indexOf('请选择')>-1 && ele.parentNode.selectedIndex == 0){
										return value;
									}
								}
								,html : function( value ){
									var reg = /^\w+\.html/;
									if(value.search(reg)<0){
										return '请输入正确文件名（例：index.html）';
									};
								}
								//required（必填项）phone（手机号）email（邮箱）url（网址）number（数字）date（日期）identity（身份证）
							});
							form.on('submit(demo1)', function(data){
								var event = $(data.elem).attr('data-event');

								if(window.Editor){
								 	// 获取编辑器区域完整html代码
							        var html = Editor.$txt.html();
							        // 获取编辑器纯文本内容
							        var text = Editor.$txt.text();
							        // 获取格式化后的纯文本
							        var formatText = Editor.$txt.formatText();
							        data.field.html = html;
							        data.field.text = text;
							        data.field.formatText = formatText;
								}
								data.field.selects = $scope.selects;
								//if(data.nodeName!='A'){
									$scope.$parent[event](data.field);
								//}else{
									
								//}
							    return false;
						  	});

							function getSelect(_obj){ //获取选择匡的option
								var self = this;
								$.each(self.select,function(j,arr){									
									if(arr[0].title==_obj.elem.name){//请选择部门
										var obj = arr[_obj.elem.selectedIndex];
										//obj.elem = _obj;
										obj.title = _obj.elem.name;
										if($scope.selects.length){
											var b = false;
											$.each($scope.selects,function( k , select ){
												var name = _obj.elem.name;
												if(select.title == _obj.elem.name){
													b = true;
													$scope.selects[k] = obj;
												}else{
													//$scope.selects.push(obj);
												}
											});
											if(!b){
												$scope.selects.push(obj);
											}
										}else{
											$scope.selects.push(obj);
										}
										if(obj.name.indexOf('请选择')>-1) return;
										self.callback && self.callback({
											obj : obj,
											index : _obj.elem.selectedIndex,
											title : _obj.elem.name,
											name : _obj.name,
											callback : function(){
												form.render();
											}
										});
									} 
								});
							}
						  	form.on('select',function( _obj ){ //select点击时，需单独处理，可能会存在多个select
						  		$.each($scope.formdata.list,function( i , obj ){
					  				if($.type(obj) == 'array'){
					  					$.each(obj,function(){
					  						if(this.type =='select'){
												getSelect.call(this,_obj);
											}
										})
					  				}else{
							  			if(this.type =='select'){
											getSelect.call(this,_obj);
										}
				  					}
								})
						  	});

						},
						selectRpeatDone : function(){ //更新 select
							setTimeout(function(){
								form.render('select');
							},100)
						},
						checkboxRpeatDone : function(){ //更新 checkbox
							setTimeout(function(){
								form.render('checkbox');
							},100)
						},
						radioRpeatDone : function(){ //更新 radio
							setTimeout(function(){
								form.render('radio');
							},100)
						}
				  	})
				});
			}
		}
	});
});